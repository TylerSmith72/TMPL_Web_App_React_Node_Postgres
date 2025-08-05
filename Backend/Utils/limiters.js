const authLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes (cant spam 10 requests in 5 minutes)
    max: 10, 
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, 
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            error: "Too many login/signup attempts. Please try again in 5 minutes."
        });
    }
});

export {
    authLimiter
};