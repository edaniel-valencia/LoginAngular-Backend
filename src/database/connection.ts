import { Sequelize } from "sequelize"


const sequelize = new Sequelize('loginangular', 'root', '1004-TSE',{
    host: 'localhost',
    dialect: 'mysql'
})
// const sequelize = new Sequelize('pos', 'root', '1004',{
//     host: 'localhost',
//     dialect: 'mysql'
// })

export default sequelize