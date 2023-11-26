const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createRating = async (req, res) => {
    try {
        const { rating, review = "", courseId } = req.body;

        const userId = req.payload.id;

        if (!rating || !review || !courseId) {
            return res.status(400).json({
                success: false,
                message: error.message,
            })
        }

        const courseDetails = await Course.findById(courseId);


        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: error.message,
            })
        }
        
        if (!courseDetails?.studentsEnrolled.includes(userId)) {
            return res.status(200).json({
                success: false,
                message: "User is not enrolled in this course."
            })
        }

        


        // if(courseDetails.ratingAndReview.includes(userId)) {

        // }

        const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId });

        if (alreadyReviewed) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed to this course."
            })
        }

        const createNewRating = await RatingAndReview.create(
            {
                user: userId,
                rating,
                review,
                course: courseId,
                createAt: Date.now()
            }
        )


        const courseUpdate = await Course.findByIdAndUpdate(
            { _id: courseId },
            { $push: { ratingAndReviews: createNewRating._id } },
            { new: true },
        ).populate("ratingAndReviews").exec();

        return res.status(200).json({
            success: true,
            data: createNewRating,
            message: "Your review add to this course"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.getAverageRating = async (req, res) => {
    try {


        const { courseId } = req.body;

        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group: {
                    _id: null,
                    averageRating: {
                        $avg: "$rating",
                    }
                }
            }
        ]);

        if (result.length === 0) {
            return res.status(200).json({
                success: true,
                data: 0,
                message: "No rating in found."
            })
        }

        return res.status(200).json({
            success: true,
            data: result[0].averageRating,
            message: "Average rating fetched successfully."
        })

    } catch (error) {
        return res.status.json({
            success: false,
            message: "Error occured while fetching average rating."
        })
    }
}


exports.getAllRating = async (req, res) => {
    try {

        const allRating = await RatingAndReview.find({})
            .sort({ ratingAndReview: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            }).populate({
                path: "course",
                select: "courseName"
            }).exec();



        return res.status(200).json({
            success: true,
            data: allRating,
            message: "All rating fetched successfully."
        })

    } catch (error) {
        return res.status.json({
            success: false,
            message: "Error occured while fetching all rating."
        })
    }
}


exports.getAllRatingForCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        const courseRating = await RatingAndReview.findById({ courseId })
            .sort({ ratingAndReview: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image",
            })
            .populate({
                path: "course",
                select: "courseName"
            }).exec();


        return res.status(200).json({
            success: true,
            data: courseRating,
            message: "All rating for course are fetched successfully."
        })

    } catch (error) {
        return res.status.json({
            success: false,
            message: "Error occured while fetching all course rating."
        })
    }
}