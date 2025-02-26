import { Sequelize, DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Order from "./OrderModels.js";
import Users from "./UsersModels.js";
import Product from "./ProductModels.js";
import Admin from "./AdminModels.js";
import Transaksi from "./TransaksiModels.js";

await db.sync();
await Admin.sync()
await Users.sync()
await Order.sync()
await Product.sync()
await Transaksi.sync()