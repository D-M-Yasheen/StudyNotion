const Section = require("../models/Section");
const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");
const SubSection = require("../models/SubSection");

exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

        // courseId = new mongoose.Types.ObjectId(courseId); 

        if (!sectionName || !courseId) {
            return res.status(401).json({
                success: false,
                message: "Fields are incomplete."
            })
        }

        const createNewSection = await Section.create({ sectionName })

        const courseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: createNewSection._id,
                }
            },
            { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
            .exec();

        return res.status(200).json({
            success: true,
            data: courseDetails,
            message: "New section is created successfully."
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.updateSection = async (req, res) => {
    try {
        const { sectionId, sectionName, courseId } = req.body;

        if (!sectionId || !sectionName || !courseId) {
            return res.status(401).json({
                success: false,
                message: "All fields required."
            })
        }

        const sectionDetails = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { sectionName },
            { new: true }
        ).populate("subSection").exec()

        const courseDetails = await Course.findByIdAndUpdate(
            courseId,
            { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
            .exec();

        return res.status(200).json({
            success: true,
            data: courseDetails,
            message: "Section updation successful."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured while updating course."
        })
    }
}


exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;

        if (!sectionId) {
            return res.status(401).json({
                success: false,
                message: "Section Id is not found."
            })
        }

        const deleteFromCourse = await Course.findByIdAndUpdate(
            { _id: courseId },
            {
                $pull: {
                    courseContent: sectionId,
                }
            },
            { new: true }
        );

        const sectionDetails = await Section.findById({ _id: sectionId })

        // console.log(sectionDetails.subSection[0])
        // console.log(sectionDetails.subSection[1])

        sectionDetails.subSection.forEach(async (id) => {
            // console.log(id)
            const deleteAllSubSection = await SubSection.findByIdAndDelete({ _id: id })
        })


        const deleteFromSection = await Section.findByIdAndDelete({ _id: sectionId });

        const courseDetails = await Course.findById(
            courseId,
            { new: true }
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
            .exec();

        return res.status(200).json({
            success: true,
            data: courseDetails,
            message: "Section deletion successful."
        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
        process.exit(1);

    }
}