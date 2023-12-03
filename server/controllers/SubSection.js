const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();


exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, timeDuration, description } = req.body;

        const video = req.files.videoFile;

        // console.log(video)

        if (!sectionId ||
            !title ||
            // !timeDuration || 
            !description ||
            !video) {
            return res.status(401).json({
                success: false,
                message: "All fields are require."
            })
        }

        const uploadVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const createNewSubSection = await SubSection.create({
            title,
            // time: timeDuration, 
            description,
            videoUrl: uploadVideo.secure_url,
        });

        const updateSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subSection: createNewSubSection._id
                }
            },
            { new: true }
        ).populate("subSection").exec();

        return res.status(200).json({
            success: true,
            data: updateSection,
            message: "sub section is create successfully."
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occured while creating sub section."
        })
    }
}


exports.updateSubSection = async (req, res) => {
    try {

        const { sectionId, subSectionId } = req.body
        const updates = req.body;
        const video = req?.files?.videoFile;



        if (!sectionId || !subSectionId) {
            return res.status(401).json({
                success: false,
                data: video,
                message: "All fields are require."
            })
        }

        const subSection = await SubSection.findById(subSectionId)

        let uploadVideo = null;

        if (video) {
            uploadVideo = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

            subSection.videoUrl = uploadVideo?.secure_url;

        }

        //    { const updateSubSection = await SubSection.findByIdAndUpdate(
        //         { _id: subSectionId },
        //         {
        //             title,
        //             // time: timeDuration,
        //             description,
        //             videoUrl: uploadVideo.secure_url
        //         },
        //         { new: true }
        //     )}


        // Update only the fields that are present in the request body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                subSection[key] = updates[key]
            }
        }

        const newSubSection = await subSection.save();

        const updateSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { new: true }
        ).populate("subSection").exec();

        return res.status(200).json({
            success: true,
            data: updateSection,
            message: "sub section updation successful."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


exports.deleteSubSection = async (req, res) => {
    try {

        const { sectionId, subSectionId } = req.body;

        if (!sectionId || !subSectionId) {
            return res.status(401).json({
                success: false,
                message: "Data is incomplete for deleting a sub section."
            })
        }

        let updateSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                }
            },
            { new: true }
        )

        const deleteSubSection = await SubSection.findByIdAndDelete({ _id: subSectionId });

        const updateSectionDetails = await Section.findByIdAndUpdate(
            { _id: sectionId },
            { new: true }
        ).populate("subSection").exec();


        return res.status(200).json({
            success: true,
            data: updateSectionDetails,
            message: "sub section deletion successful."
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}