import Admin from "../models/AdminModels.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log("Refresh Token dari Cookies:", refreshToken);
        if (!refreshToken) {
            return res.status(403).json({ message: "Refresh Token tidak ditemukan" });
        }

        const admin = await Admin.findOne({
            where: { token_refresh: refreshToken },
        });

        if (!admin) {
            return res.status(403).json({ message: "Refresh Token tidak valid1" });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Refresh Token tidak valid2" });
            }

            const adminId = admin.id;
            const email = admin.email;
            const username = admin.username;
            
            const accessToken = jwt.sign(
                { adminId, email, username }, 
                process.env.ACCESS_TOKEN, 
                { expiresIn: "10m" }
            );

            res.status(200).json({ accessToken });
        });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal refresh token" });
    }
};
