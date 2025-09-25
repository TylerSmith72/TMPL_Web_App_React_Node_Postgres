import express from "express";

import {
    login,
    register,
    renew
} from "../Controllers/auth_controller.js";

import {
    loginLimiter,
    registerLimiter,
    renewLimiter,
    otpLimiter,
    verifyLimiter
}   from "../Utils/limiters.js"

import {
    verifyInfo,
    verifyRegularToken,
    verifyTemporaryToken
} from "../Middleware/verify_middleware.js";


const router = express.Router();


router.post("/login", loginLimiter, verifyInfo, (req, res) => {
    login(req, res);
});

router.post("/register", registerLimiter, verifyInfo, (req, res) => {
    register(req, res);
});

router.post("/renew", renewLimiter, verifyInfo, (req, res) => {
    renew(req, res);
});


router.post("/verify", verifyLimiter, verifyRegularToken);
router.post("/verify-temp", verifyLimiter, verifyTemporaryToken);

export default router;