import express from "express"
import { createOrder, deleteOrder, getAllOrder, getOrderById, updateOrder, } from "../controllers/orderController.js";
import { createAdmin, deleteAdmin, getAdminById, getAllAdmin, loginAdmin, logOutAdmin, registerAdmin, updateAdmin } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { createTransaksi, deleteTransaksi, getAllPayment, getTransaksiById, updateTransaksi } from "../controllers/paymentController.js";
import { createUser, deleteUser, getAllUsers, getUserById, loginUser, logOutUsers, registerUser, updateUser } from "../controllers/usersController.js";
import { createProduct, deleteProduct, getAllProduct, getProductById, updateProduct } from "../controllers/productController.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { UsersToken } from "../controllers/UsersToken.js";

const router = express.Router();

router.get("/order", getAllOrder)
router.get("/order/find/:id", getOrderById)
router.post("/order/create", createOrder)
router.put('/order/update/:id', updateOrder);
router.delete("/order/delete/:id", deleteOrder)

router.get("/products", getAllProduct)
router.get("/products/find/:id", getProductById)
router.post("/products/create", createProduct)
router.put('/products/update/:id', updateProduct);
router.delete("/products/delete/:id", deleteProduct)

router.get("/transaksi", getAllPayment)
router.get("/transaksi/find/:id", getTransaksiById)
router.post("/transaksi/create", createTransaksi)
router.delete("/transaksi/delete/:id", deleteTransaksi)
router.put("/transaksi/update/:id", updateTransaksi)

router.get("/admin", verifyToken, getAllAdmin)
router.get("/admin/find/:id", getAdminById)
router.post("/admin/create", createAdmin)
router.delete("/admin/delete/:id", deleteAdmin)
router.put("/admin/update/:id", verifyToken, updateAdmin)

router.get("/users", verifyToken, getAllUsers)
router.get("/users/find/:id", getUserById)
router.post("/users/create", createUser)
router.delete("/users/delete/:id", deleteUser)
router.put("/users/update/:id", verifyToken, updateUser)

router.post("/register/create", registerAdmin)
router.post("/login/create", loginAdmin)
router.post("/userregist/create", registerUser)
router.post("/userlogin/create", loginUser)

router.get("/token", refreshToken)
router.delete("/logout", logOutAdmin)

router.get("/tokenuser", UsersToken)
router.delete("/logoutuser", logOutUsers)

export default router;