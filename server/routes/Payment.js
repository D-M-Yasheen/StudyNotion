const express = require("express");
const router = express.Router();

const {
    capturePayment,
    verifySignature,
    sendPaymentSuccessfulEmail
} = require("../controllers/Payment");

const {
    auth,
    isStudent
} = require("../middlewares/auth");

router.post("/capturePayment", auth, isStudent, capturePayment);

router.post("/verfiySignature", auth, isStudent, verifySignature);

router.post("/sendPaymentSuccessfulEmail", auth, isStudent, sendPaymentSuccessfulEmail);

module.exports = router;

