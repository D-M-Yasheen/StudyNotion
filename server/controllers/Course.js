const Course = require("../models/Course");
const Category = require("../models/Category");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSectionToDuration } = require("../utils/secToDuration");
require("dotenv").config();

exports.createCourse = async (req, res) => {
    try {

        const userId = req.payload.id;

        let {
            courseName,
            courseDescription,
            whatYouWillLearn,
            price,
            tag,
            category,
            status,
            instructions,
        } = req.body;

        let thumbnail;

        try {
            thumbnail = req.files.thumbnailImage;
        } catch (error) {
            return res.status(400).json({
                success: false,
                imageIs: req.files.thumbnailImage,
                message: "Error will fetching thumbnail."
            })
        }

        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !tag.length ||
            !thumbnail ||
            !category ||
            !instructions.length
        ) {
            return res.status(400).json({
                success: false,
                data: req.body,
                message: "All fields are required for creating a course."
            })
        }

        if (!status || status === undefined) {
            status = "Draft";
        }

        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor"
        });

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instructor details not found, course can not be created."
            })
        }

        const categoryDetails = await Category.findById(category);

        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Category Details Not Found"
            })
        }

        const thumbnailUpload = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailUpload.secure_url,
            status: status,
            instructions: instructions,
            createAt: Date.now()
        })

        await User.findByIdAndUpdate(
            {
                _id: instructorDetails._id
            },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true },
        )

        await Category.findByIdAndUpdate(
            { _id: category },
            {
                $push: {
                    courses: newCourse._id,
                },
            },
            { new: true },
        )

        const courseDetails = await Course.findById(newCourse._id).populate('category').exec()

        res.status(200).json({
            success: true,
            data: courseDetails,
            message: "Course Created Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// create by babber
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        let newCategoryId
        if (req.body.category) {
            newCategoryId = req.body.category
        }

        const course = await Course.findById(courseId)

        if (!course) {
            return res.status(404).json({ error: "Course not found" })
        }

        if (req.files) {
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        let oldCategoryId;

        if (newCategoryId) {
            oldCategoryId = course?.category;

            await Category.findByIdAndUpdate(
                { _id: oldCategoryId },
                {
                    $pull: {
                        courses: courseId,
                    },
                },
                { new: true },
            )

            await Category.findByIdAndUpdate(
                { _id: newCategoryId },
                {
                    $push: {
                        courses: courseId,
                    },
                },
                { new: true },
            )
        }

        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                course[key] = updates[key]
            }
        }

        await course.save();

        const updatedCourse = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec()

        res.json({
            success: true,
            message: "Course updated successfully",
            oldCategoryId: oldCategoryId,
            data: updatedCourse,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
}


exports.showAllCourses = async (req, res) => {
    try {
        const getCourses = await Course.find({})

        return res.status(200).json({
            success: true,
            data: getCourses,
            message: "All courses fetch successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured while fetching all courses."
        })
    }
}


exports.getCourseDetails = async (req, res) => {
    try {

        const { courseId } = req.body;

        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })
            .populate("ratingAndReviews")
            .populate("category")
            .exec();

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: "failed to fetch course details."
            })
        }

        return res.status(200).json({
            success: true,
            data: courseDetails,
            message: "course details are fetched successfully."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.getFullCourseDetails = async (req, res) => {
    try {
        const { courseId } = req.body;
        const userId = req.payload.id;

        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
                path: 'instructor',
                populate: {
                    path: 'additionalDetails'
                }
            })
            .populate('category')
            .populate('ratingAndReviews')
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection'
                }
            })
            .exec()

        let courseProgressCount = await CourseProgress.findOne({
            courseId: courseId,
            userId: userId
        })

        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`
            })
        }

        let totalDurationInSections = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSections += timeDurationInSeconds
            })
        })

        const totalDuration = convertSectionToDuration(totalDurationInSections)

        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ?
                    courseProgressCount?.completedVideos : []
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


exports.getInstructorCourses = async (req, res) => {
    try {
        const instructionId = req.payload.id

        const getInstructorCourses = await Course.find({
            instructor: instructionId,
        }).sort({ createAt: -1 }).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec()

        res.status(200).json({
            success: true,
            data: getInstructorCourses
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }
}


exports.deleteCourse = async (req, res) => {
    try {

        const { courseId } = req.body;

        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: error.message
            })
        }

        const coureseDetails = await Course.findById({ _id: courseId });

        coureseDetails.courseContent.forEach(async (sectionId) => {

            const sectionDetails = await Section.findById({ _id: sectionId })

            sectionDetails.subSection.forEach(async (id) => {
                await SubSection.findByIdAndDelete({ _id: id })
            })

            await Section.findByIdAndDelete({ _id: sectionId });
        })

        const categoryId = coureseDetails?.category;

        await Category.findByIdAndUpdate(
            { _id: categoryId },
            {
                $pull: {
                    courses: courseId,
                },
            },
            { new: true },
        )

        const deleteFromCourse = await Course.findByIdAndDelete({ _id: courseId });

        res.status(200).json({
            success: true,
            data: deleteFromCourse,
            message: "Course is deleted"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })

        process.exit(1);
    }
}