import { DataTypes } from 'sequelize'
import db from '../utils/connection.js'
import Order from './OrderModels.js'

const Users = db.define(
    "Users", 
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
        tableName: "users"
    }
)

Users.hasOne(Order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

Order.belongsTo(Users, {
    foreignKey: 'UserId',
    as: 'Users',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
})

export default Users;