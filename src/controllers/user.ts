import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response) => {

    const { name, lastname, password, email, credential } = req.body
    // console.log(username)
    // console.log(password);

    // VALIDAR SI EL USUARIO EXISTE EN LA BASE DE DATOS
    // const userEmail = await User.findOne({ where: { [Op.or]: { email: email, credential: credential } } })
    const userEmail = await User.findOne({ where: {  email: email  }})
    const userCredential = await User.findOne({ where: {  credential: credential  }})

    if (userEmail) {
        return res.status(400).json({
            msg: `Usuario ya existe con el email ${email}`
        })
    }

    if (userCredential) {
        return res.status(400).json({
            msg: `Usuario ya existe con la credencial ${credential}`
        })
    }

    // console.log("Estoy por aquí...");


    // ENCRIPTAR LA CLAVE 

    const passwordHash = await bcrypt.hash(password, 10)
    // console.log(passwordHash);
    try {

        // GUARDAR DATOS EN LA BASE DE DATOS
        User.create({
            name: name,
            lastname: lastname,
            email: email,
            password: passwordHash,
            credential: credential,
            status: 1
        })

        res.json({
            msg: `User ${name} ${lastname} create success.`
        })

    } catch (error) {
        res.status(400).json({
            msg: `Existe un error al crear el usuario => `, error
        })
    }
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    // console.log(req.body);

    // res.json({
    //     msg: "LOGIN USER",
    //     body: req.body
    // })

    // VALIDAMOS SI EL USUARIO EXISTE EN LA BASE DE DATOS 

    const user: any = await User.findOne({ where: { email: email } })
    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existe con el email ${email}`
        })
    }

    // VALIDAMOS PASSWORD

    const passwordValid = await bcrypt.compare(password, user.password)
    // console.log(passwordValid);

    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecto => ${password}`
        })

    }
    const token = jwt.sign({
        email: email
    }, process.env.SECRET_KEY || 'TSE-Edaniel-Valencia',
        { expiresIn: '10000' });
    //  res.status(tok e).json({msg: `Password Incorrecto => ${password}` })
    res.json({ token })

}