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


// exports.getProgressPercentage = async (req, res) => {
//   const { courseId } = req.body
//   const userId = req.payload.id

//   if (!courseId) {
//     return res.status(400).json({ error: "Course ID not provided." })
//   }

//   try {
//     // Find the course progress document for the user and course
//     let courseProgress = await CourseProgress.findOne({
//       courseID: courseId,
//       userId: userId,
//     })
//       .populate({
//         path: "courseID",
//         populate: {
//           path: "courseContent",
//         },
//       })
//       .exec()

//     if (!courseProgress) {
//       return res
//         .status(400)
//         .json({ error: "Can not find Course Progress with these IDs." })
//     }
//     console.log(courseProgress, userId)
//     let lectures = 0
//     courseProgress.courseId.courseContent?.forEach((sec) => {
//       lectures += sec.subSection.length || 0
//     })

//     let progressPercentage =
//       (courseProgress.completedVideos.length / lectures) * 100

//     // To make it up to 2 decimal point
//     const multiplier = Math.pow(10, 2)
//     progressPercentage =
//       Math.round(progressPercentage * multiplier) / multiplier

//     return res.status(200).json({
//       data: progressPercentage,
//       message: "Succesfully fetched Course progress",
//     })
//   } catch (error) {
//     console.error(error)
//     return res.status(500).json({ error: "Internal server error" })
//   }
// }