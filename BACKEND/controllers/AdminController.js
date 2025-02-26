import Admin from "../models/AdminModels.js";
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import { verifyToken } from "../middleware/verifyToken.js";

export const getAllAdmin = async (req, res) => {
    try{
        const admin = await Admin.findAll({
            attributes: ['id', 'username', 'email']
        });
        return res.status(200).json(admin)
    }catch(error){
        return res.status(500).json({error: error.massage, message: "terjadi kesalahan saat getAllAdmin"})
    }
}

export const getAdminById = async (req, res) => {
    try {
        const {id} = req.params;
        const admin = await Admin.findByPk(id);
        if (!admin) {
            return res.status(404).json({ message: "Admin tidak ditemukan" });
        }
        return res.status(200).json(admin);
    } catch (error) {
        return res.status(500).json({ message: "Terjadi kesalahan saat mengambil id", error: error.message });
    }
};

export const createAdmin = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const admin = await Admin.create({username, email, password});
        res.status(200).json(admin);
    }catch(error){
        res.status(500).json({error: error.message, message: "gagal membuat Admin"})
    }
}

export const updateAdmin = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;
        if (req.adminId !== parseInt(id)) {
            return res.status(403).json({ message: "Anda tidak memiliki izin untuk mengupdate admin ini" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const [updated] = await Admin.update({ username, email, password: hashedPassword }, { where: { id } });

        if (updated === 0) {
            return res.status(404).json({ message: "Admin tidak ditemukan atau tidak ada perubahan" });
        }

        const updatedAdmin = await Admin.findByPk(id);
        return res.status(200).json(updatedAdmin);
    } catch (error) {
        return res.status(500).json({ message: "Gagal mengupdate admin", error: error.message });
    }
};

export const deleteAdmin = async (req, res) => {
    try{
        const { id } = req.params;
        const deleted = await Admin.destroy({where: {id}});
        return res.status(200).json(deleted + ` Admin ke ${id} berhasil dikeluarkan`)
    }catch(error){
        return res.status(500).json({error: error.message, message: "gagal mengeluarkan admin"})
    }
}

// LOGIN
export const loginAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: {
                email: req.body.email
            }
        })
        if (admin !== null) {
            const matching = await bcrypt.compare(req.body.password, admin.password);
            // console.log(matching)
            if (!matching) {
                // console.log('password')
                res.status(401).json("password salah")
            }else {
                const adminId = admin.id            
                const email = admin.email
                const username = admin.username
                // const password = admin.password
                
                const accessToken = jwt.sign(
                    {
                        adminId, email, username
                    },
                        process.env.ACCESS_TOKEN, 
                    {
                        expiresIn: '10m'
                    }
                )

                const refreshToken = jwt.sign(
                    {
                        adminId, email, username
                    }, 
                        process.env.REFRESH_TOKEN, 
                    {
                        expiresIn: '10h'
                    }
                )

                // simpan refresh token dalam database
                await Admin.update({ token_refresh: refreshToken }, {
                    where: {
                        id: adminId
                    }
                })
                
                res.cookie(                    
                    'refreshToken',
                    refreshToken,
                    {
                        httpOnly: true,
                        maxAge: 24 * 60 * 60 * 1000,
                    }
                )
                
                return res.status(200).json({
                    msg: "login successfully",
                    accessToken,
                })
            }
        } else {
            return res.status(500).json("email belum terdaftar")
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Terjadi kesalahan saat login", error: err.message });
    }
}

// REGISTER

export const registerAdmin = async (req, res) => {
    try{
        const {username, email, password, token_refresh} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Admin.create ({
            username,
            email,
            password: hashedPassword,
            token_refresh,
        });

        return res.status(201).json({
            msg: "admin registered successfully",
            user: newUser,
        })
    }catch (error){
        return res.status(500).json({
            msg: "Registration Failed",
            error: error.message,
        })
    }
}

export const logOutAdmin = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;    
    if (!refreshToken) {
        return res.status(204).json({ message: "Refresh Token tidak ditemukan" });
    }
    const admin = await Admin.findOne({
        where: { token_refresh: refreshToken },
    });
    if (!admin) {
        return res.status(204).json({ message: "Refresh Token tidak valid" });
    }
    const adminId = admin.id;
    await Admin.update({token_refresh: null}, {
        where: {
            id: adminId
        }
    })
    res.clearCookie('refreshToken');
    return res.sendStatus(200)
}