import db from "../utils/connection.js";
import { DataTypes } from "sequelize";
import Order from "./OrderModels.js";

const Product = db.define(
    "Product",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        gambar: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    },
    {
        tableName: "product",
        timestamps: true,
    }
)

Product.hasMany(Order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Order.belongsTo(Product, {
    foreignKey: 'ProductId',
    as: 'Product',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

export default Product;

