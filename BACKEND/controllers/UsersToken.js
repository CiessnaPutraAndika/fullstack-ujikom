import Users from "../models/UsersModels.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const UsersToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        console.log("Refresh Token dari Cookies:", refreshToken);
        
        if (!refreshToken) {
            return res.status(403).json({ message: "Refresh Token tidak ditemukan" });
        }

        const users = await Users.findOne({
            where: { token_refresh: refreshToken },
        });

        if (!users) {
            return res.status(403).json({ message: "Refresh Token tidak valid1" });
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Refresh Token tidak valid2" });
            }

            const UserId = users.UserId || users.id; 
            const email = users.email;
            const username = users.username;
            
            const accessToken = jwt.sign(
                { UserId, email, username }, 
                process.env.ACCESS_TOKEN, 
                { expiresIn: "10m" }
            );

            res.status(200).json({ UserId, accessToken }); // Mengembalikan UserId juga
        });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal refresh token" });
    }
};
