const authLimiter = rateLimit({
    // 10 requests per 5 minutes
    windowMs: 5 * 60 * 1000,
    max: 10, 
    standardHeaders: true,
    legacyHeaders: false, 
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: "Too many login/signup attempts. Please try again in 5 minutes."
        });
    }
});

const otpLimiter = rateLimit({
    // 10 requests per 1 minute
    windowMs: 1 * 60 * 1000,
    max: 10, 
    standardHeaders: true,
    legacyHeaders: false, 
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: "Too many OTP Requests. Please try again in 1 minute"
        });
    }
});

const loginLimiter = rateLimit({
    // 10 requests per 5 minutes
    windowMs: 5 * 60 * 1000,
    max: 10, 
    standardHeaders: true,
    legacyHeaders: false, 
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: "Too many login Requests. Please try again in 5 minutes"
        });
    }
});

const registerLimiter = rateLimit({
    // 1 request per 5 minutes
    windowMs: 5 * 60 * 1000,
    max: 1, 
    standardHeaders: true,
    legacyHeaders: false, 
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: "Too many register Requests. Please try again in 5 minutes"
        });
    }
});

const renewLimiter = rateLimit({
    // 5 requests per 10 minutes
    windowMs: 10 * 60 * 1000,
    max: 5, 
    standardHeaders: true,
    legacyHeaders: false, 
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: "Too many renew Requests. Please try again in 10 minutes"
        });
    }
});

const verifyLimiter = rateLimit({
    // 10 requests per 1 minute
    windowMs: 1 * 60 * 1000,
    max: 10, 
    standardHeaders: true,
    legacyHeaders: false, 
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: "Too many verify Requests. Please try again in 1 minute"
        });
    }
});

const userLimiter = rateLimit({
    // 20 requests per 1 minute
    windowMs: 1 * 60 * 1000,
    max: 20, 
    standardHeaders: true,
    legacyHeaders: false, 
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: "Too many user Requests. Please try again in 1 minute"
        });
    }
});

export {
    authLimiter,
    otpLimiter,
    loginLimiter,
    registerLimiter,
    renewLimiter,
    verifyLimiter,
    userLimiter
};