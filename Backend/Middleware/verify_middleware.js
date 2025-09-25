import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
}

async function verifyInfo(req, res, next) {
    const { username, firstname, surname, email, password, confirmPassword } = req.body;

    if (req.path === "/register") {
        if (![username, firstname, surname, email, password, confirmPassword].every(Boolean)) {
            return res.status(401).json({message: "Missing Credentials"});
        } 
        else if (!validEmail(email)) {
            return res.status(401).json({message: "Invalid Email"});
        } 
        else if (password != confirmPassword) {
            return res.status(401).json({message: "Password doesn't match"});
        }
    }
    else if (req.path === "/login") {
        if (![username, password].every(Boolean)) {
            return res.status(401).json({message: "Missing Credentials"});
        }
    }
    next();
}

async function verifyRegularToken(req, res) {
    const authHeader = req.header('Authorization');
    const { deviceId } = req.body;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            error: 'No auth header provided'
        });
    }

    if (!deviceId) {
        return res.status(401).json({
            success: false,
            error: 'No device identifier provided'
        });
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'No token provided'
        });
    }

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

        // Reject temp tokens for regular token verification
        if (decoded_token.is_temp) {
            return res.status(401).json({
                success: false,
                error: "Temporary token not allowed. Please use a regular token."
            });
        }

        // Check device identifier mismatch
        if (decoded_token.device !== deviceId) {
            return res.status(401).json({
                success: false,
                error: "Device identifier mismatch. Possible token cloning detected."
            });
        }

        // Token is valid - respond with success
        return res.json({
            success: true,
            tokenType: 'regular',
            userId: decoded_token.user
        });
    } catch (error) {
        console.error('Regular token verification failed:', error.message);
        return res.status(401).json({
            success: false,
            error: 'Invalid or expired token'
        });
    }
}

async function verifyTemporaryToken(req, res) {
    const authHeader = req.header('Authorization');
    const { deviceId } = req.body;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            error: 'No auth header provided'
        });
    }

    if (!deviceId) {
        return res.status(401).json({
            success: false,
            error: 'No device identifier provided'
        });
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'No token provided'
        });
    }

    try {
        const decoded_token = jwt.verify(token, process.env.JWT_SECRET);

        // Reject regular tokens for temp token verification
        if (!decoded_token.is_temp) {
            return res.status(401).json({
                success: false,
                error: "Regular token not allowed. Please use a temporary token."
            });
        }

        // Check device identifier mismatch
        if (decoded_token.device !== deviceId) {
            return res.status(401).json({
                success: false,
                error: "Device identifier mismatch. Possible token cloning detected."
            });
        }

        // Token is valid - respond with success
        return res.json({
            success: true,
            tokenType: 'temporary',
            userId: decoded_token.user
        });
    } catch (error) {
        console.error('Temporary token verification failed:', error.message);
        return res.status(401).json({
            success: false,
            error: 'Invalid or expired temporary token'
        });
    }
}

export {
    validEmail,
    verifyInfo,
    verifyRegularToken,
    verifyTemporaryToken
};