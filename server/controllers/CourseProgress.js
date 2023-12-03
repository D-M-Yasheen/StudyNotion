const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");

exports.updateCourseProgress = async (req, res) => {
    try {

        const { courseId, subSectionId } = req.body;
        const userId = req.payload.id

        const subSection = await SubSection.findById(subSectionId)

        if (!subSection) {
            return res.status(404).json({
                status: false,
                message: "Sub-Section not found"
            })
        }

        const courseProgress = await CourseProgress.findOne({ courseId, userId })

        if (!courseProgress) {
            return res.status(404).json({
                status: false,
                message: "Course Progress not found"
            })
        }

        const completedLecture = courseProgress?.completedVideos?.includes(subSectionId)

        if (completedLecture) {
            return res.status(402).json({
                status: false,
                message: "You already completed this lecture"
            })
        } else {
            courseProgress?.completedVideos?.push(subSection)

            await courseProgress.save();
        }

        return res.status(200).json({
            status: true,
            data: courseProgress,
            message: "Mark as completed"
        })


    } catch (error) {
        return res.status(500).json({
            status: false,
            message: error.message
        })
    }
}