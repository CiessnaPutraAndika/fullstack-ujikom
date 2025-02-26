import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const verifyToken = async (req, res, next) => {
    // jika ada beberapa fungsi yang harus di amankan menggunakan verify token maka kita harus memberikan fungsi tersebut ke route path yang mau kita amankan
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        res.status(403).json({msg:'No token provided.'})
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN,async (err, decode) => {
            if (decode) {
                req.adminId = decode.adminId;
                req.UserId = decode.UserId;
                next()
            }
            else {
                res.status(404).json({msg:'Token is not found or invalid.'})
            }
        }
        )
    }

}
