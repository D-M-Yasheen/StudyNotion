const { instance } = require("../config/razorpay");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const { courseEnrollmentEmail } = require("../mail/templates/courseEnrollmentEmail");
const { default: mongoose, mongo } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");


exports.capturePayment = async (req, res) => {

    const { courses } = req.body
    const userId = req.payload.id;

    if (courses.length === 0) {
        return res.status(404).json({
            success: false,
            message: "Please provide Course Id"
        })
    }

    let totalAmount = 0;

    for (const courseId of courses) {
        let course;
        try {
            course = await Course.findById(courseId);

            if (!course) {
                return res.statuse(404).json({
                    success: false,
                    message: "Course not found."
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);

            if (course.studentsEnrolled.includes(uid)) {
                return res.status(401).json({
                    success: false,
                    message: "Student is already enrolled."
                })
            }

            totalAmount += course.price;

        } catch (error) {
            return res.status(404).json({
                success: false,
                message: "Error occured while fetching course details."
            })
        }

    }

    const currency = "INR";
    const options = {
        amount: totalAmount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        res.json({
            success: true,
            message: paymentResponse,
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, mesage: "Could not Initiate Order" });
    }
}


exports.verifySignature = async (req, res) => {

    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.payload.id;


    if (!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
        return res.status(200).json({ success: false, message: "Payment Failed" });
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        await enrollStudents(courses, userId, res);
        return res.status(200).json({
            success: true,
            message: 'Payment Verfied'
        })
    }

    return res.status(500).json({
        success: false,
        message: 'Payment Failed'
    })
}


const enrollStudents = async (courses, userId, res) => {
    if (!courses || !userId) {
        return res.status(401).json({
            success: 'false',
            message: 'Courses or UserId is missing'
        })
    }

    for (const courseId of courses) {
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            )

            if (!enrolledCourse) {
                return res.status(404).json({
                    success: false,
                    message: 'Course not Found'
                })
            }

            const courseProgress = await CourseProgress.create({
                courseId,
                userId,
                completedVideos: []
            })

            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgress: courseProgress._id
                    }
                },
                { new: true }
            )

            // SOME IS WRONG IN THIS courseEnrollmentEmail is not a function
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}`)
            )

        } catch (error) {
            console.log(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}


exports.sendPaymentSuccessfulEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;

    const userId = req.payload.id;

    if (!orderId || !paymentId || !amount || !userId) {
        return res.status(404).json({
            success: false,
            message: 'orderId or paymentId is missing'
        })
    }

    try {

        const enrolledStudent = await User.findById(userId);

        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
                amount / 100, orderId, paymentId)
        )


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}