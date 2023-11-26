const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate")

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: Number,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
        expires : 60,
    }
})

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email",
            emailTemplate(otp)
        )
    } catch (error) {
        console.error("Error occured while sending email : ", error);
        throw error;
    }
}

otpSchema.pre("save", async function (next) {
    if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
    next();
}
)

const OTP = mongoose.model("OTP", otpSchema);

module.exports = OTP;