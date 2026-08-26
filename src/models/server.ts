import express from 'express'
import type { Application } from 'express'
import routesCategoty from '../routes/category'
import routesProduct from '../routes/product'
import routesRole from '../routes/role'
import routesUser from '../routes/user'
import cors from 'cors'
import prisma from '../database/connection'

class Server {

    private app: Application
    private port: string


    constructor(){
        this.app = express()
        this.port = process.env.PORT || '3001'
        this.midlewares();
        this.router();
        this.DBconnetc();
        this.listen();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("La aplicación se esta corriendo exitosamente en el puerto => "+ this.port)
        })
    }

    router(){
        this.app.use(routesCategoty);
        this.app.use(routesProduct);
        this.app.use(routesRole);
        this.app.use(routesUser);
    }

    midlewares(){
        //Parseo BOdy
        this.app.use(express.json())

        //
        this.app.use(cors())
    }

    async DBconnetc(){
        try {
            await prisma.$connect();
            console.log("Conexion de DB exitoso");

        } catch (error) {
            console.log("Conexion de DB errorena => "+error);

        }
    }
}


export default Server
