import { DataTypes } from "sequelize";
import db from "../utils/connection.js"
import Users from "./UsersModels.js";
import Order from "./OrderModels.js";

const Transaksi = db.define(
    "Transaksi", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        total_price: {
            type: DataTypes.FLOAT,
            allowNull: false,        
        },
        transaction_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW, 
        },
        payment_status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Success",
        },
    }, 
    {
        tableName: "transaksi",
        timestamps: true,
    }
);

Users.hasOne(Transaksi, {
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
})

Transaksi.belongsTo(Users, {
    foreignKey : 'UserId',
    as: 'Users',
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
})

Order.hasOne(Transaksi, {
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
})

Transaksi.belongsTo(Order, {
    foreignKey : 'OrderId',
    as: 'Order',
    onDelete : 'CASCADE',
    onUpdate : 'CASCADE',
})

export default Transaksi;