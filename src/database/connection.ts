import { Sequelize } from "sequelize"


const sequelize = new Sequelize('pos', 'root', '1004',{
    host: 'localhost',
    dialect: 'mysql'
})

export default sequelize