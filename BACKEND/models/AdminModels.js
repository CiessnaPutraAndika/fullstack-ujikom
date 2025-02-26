import { DataTypes } from 'sequelize'
import db from '../utils/connection.js'
// import Product from './ProductModels.js';
// import Order from './OrderModels.js';
// import Transaksi from './TransaksiModels.js';

const Admin = db.define(
    "Admin", 
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,        
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,            
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,            
        },
        token_refresh: {
            type: DataTypes.STRING,
            allowNull: true,            
        }
    }, 
    {
        tableName: "admin"
    }
)

export default Admin;