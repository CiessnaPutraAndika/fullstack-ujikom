import User from "../models/UsersModels.js";
import bcrypt from 'bcryptjs/dist/bcrypt.js'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const getAllUsers = async (req, res) => {
    try{
        const users = await User.findAll({
            attributes: ['id', 'username', 'email']
        });
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({error: error.message, message: "Terjadi kesalahan saat getAllUsers"})
    }
}

export const getUserById = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil id", error: error.message });
    }
};

export const createUser = async (req, res) => {
    try{
        const { username, email, password } = req.body;
        const user = await User.create({username, email, password});
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error: error.message, message: "Gagal membuat User"})
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        if (req.userId !== parseInt(id)) {
            return res.status(403).json({ message: "Anda tidak memiliki izin untuk mengupdate users ini" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [updated] = await User.update({ username, email, password: hashedPassword }, { where: { id } });

        if (updated === 0) {
            return res.status(404).json({ message: "Users tidak ditemukan atau tidak ada perubahan" });
        }

        const updatedUsers = await User.findByPk(id);
        return res.status(200).json(updatedUsers);
    } catch (error) {
        return res.status(500).json({ message: "Gagal mengupdate users", error: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try{
        const { id } = req.params;
        const deleted = await User.destroy({where: {id}});
        res.status(200).json(deleted + ` User ke ${id} berhasil dihapus`)
    }catch(error){
        res.status(500).json({error: error.message, message: "Gagal menghapus user"})
    }
}

// LOGIN
export const loginUser = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        if (user !== null) {
            const matching = await bcrypt.compare(req.body.password, user.password);
            // console.log(matching)
            if (!matching) {
                // console.log('password')
                res.status(401).json("Password salah")
            }else {
                const UserId = user.id            
                const email = user.email
                const username = user.username
                // const password = user.password
                
                const accessToken = jwt.sign(
                    {
                        UserId, email, username
                    },
                        process.env.ACCESS_TOKEN, 
                    {
                        expiresIn: '10m'
                    }
                )

                const refreshToken = jwt.sign(
                    {
                        UserId, email, username
                    }, 
                        process.env.REFRESH_TOKEN, 
                    {
                        expiresIn: '20h'
                    }
                )

                await User.update({ token_refresh: refreshToken }, {
                    where: {
                        id: UserId
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
                    msg: "Login successfully",
                    accessToken,
                })
            }
        } else {
            res.status(500).json("Email belum terdaftar")
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Terjadi kesalahan saat login", error: err.message });
    }
}

// REGISTER

export const registerUser = async (req, res) => {
    try{
        const {username, email, password, token_refresh} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create ({
            username,
            email,
            password: hashedPassword,
            token_refresh,
        });

        return res.status(201).json({
            msg: "User registered successfully",
            user: newUser,
        })
    }catch (error){
        return res.status(500).json({
            msg: "Registration Failed",
            error: error.message,
        })
    }
}

export const logOutUsers = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;    
    if (!refreshToken) {
        return res.status(204).json({ message: "Refresh Token tidak ditemukan" });
    }
    const users = await User.findOne({
        where: { token_refresh: refreshToken },
    });
    if (!users) {
        return res.status(204).json({ message: "Refresh Token tidak valid" });
    }
    const UserId = users.id;
    await User.update({token_refresh: null}, {
        where: {
            id: UserId
        }
    })
    res.clearCookie('refreshToken');
    return res.sendStatus(200)
}