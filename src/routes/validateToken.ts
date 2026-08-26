import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization']
    if(headerToken != undefined && headerToken.startsWith('Bearer ')){
       try {
        const token = headerToken.slice(7);
        jwt.verify(token, process.env.SECRET_KEY as string)
        next()
       } catch (error) {
        res.status(401).json({
            msg: `CIERRE DE SESIÓN AUTOMATICO`
        })
       }
    }else{
        res.status(401).json({
            msg: `Acceso Denegado`
        })
    }
}

export default validateToken;
