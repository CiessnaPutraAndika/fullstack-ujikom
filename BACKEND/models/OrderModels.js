import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

// Definisikan model Order
const Order = db.define(
    "Order", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        order_status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Pending",
        },
        total_price: {
            type: DataTypes.STRING,
            allowNull: false,            
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,            
        },
    }, 
    {
        tableName: "order",
        timestamps: true,
    }
);



export default Order;
