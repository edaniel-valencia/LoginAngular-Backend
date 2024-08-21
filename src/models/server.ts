import express, {Application} from 'express'
import routesCategoty from '../routes/category'
import routesProduct from '../routes/product'
import routesRole from '../routes/role'
import routesUser from '../routes/user'
import { Category } from './category'
import { Product } from './product'
import { Role } from './role'
import { User } from './user'
import cors from 'cors'

class Server {

    private app: Application
    private port: string
    

    constructor(){
        this.app = express()
        this.port = process.env.PORT || '3001'
        this.listen();
        this.midlewares();
        this.router();
        this.DBconnetc();
        
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

            // await Product.sync({force: true}); // Clean date of table
            await Category.sync(); 
            await Product.sync(); 
            // await User.sync({alter: true}); // Update atribute of table
            await Role.sync({force: true}); 
            await User.sync(); 
            console.log("Conexion de DB exitoso");
            
        } catch (error) {
            console.log("Conexion de DB errorena => "+error);
            
        }
    }
}


export default Server