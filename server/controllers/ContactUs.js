const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")

exports.contactUsController = async (req, res) => {
    try {
        const { email, firstname, lastname, message, phoneNo, countrycode } = req.body;

        const emailRes = await mailSender(
            email,
            "Your Data send Successfully",
            contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
        )

        return res.status(200).json({
            success: true,
            message: "Email send successfully"
        })

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Something went wrong...",
        })
    }
}