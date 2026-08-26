import type { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../database/connection'

export const ReadUser = async (req: Request, res: Response) => {
    try {
        const listUser = await prisma.user.findMany();
        res.json({
            msg: `Lista de usuarios encontrada exitosamente`,
            data: listUser
        });
    } catch (error) {
        res.status(500).json({
            msg: `Error al listar los usuarios`
        });
    }
}



export const CreateUser = async (req: Request, res: Response) => {

    const { Uname, Ulastname, Upassword, Uemail, Ucredential } = req.body
    const [userEmail, userCredential] = await Promise.all([
        prisma.user.findUnique({ where: { Uemail: Uemail } }),
        prisma.user.findUnique({ where: { Ucredential: Ucredential } })
    ])

    if (userEmail) {
        return res.status(400).json({
            msg: `Usuario ya existe con el email ${Uemail}`
        })
    }

    if (userCredential) {
        return res.status(400).json({
            msg: `Usuario ya existe con la credencial ${Ucredential}`
        })
    }

    const UpasswordHash = await bcrypt.hash(Upassword, 10)
    try {
        await prisma.user.create({
            data: {
                Uname: Uname,
                Ulastname: Ulastname,
                Uemail: Uemail,
                Upassword: UpasswordHash,
                Ucredential: Ucredential,
                Ustatus: 1
            }
        })

        res.json({
            msg: `User ${Uname} ${Ulastname} create success.`
        })

    } catch (error) {
        res.status(400).json({
            msg: `Existe un error al crear el usuario => `, error
        })
    }
}

export const LoginUser = async (req: Request, res: Response) => {
    const { Uemail, Upassword } = req.body;

    const user = await prisma.user.findUnique({ where: { Uemail: Uemail } })
    if (!user) {
        return res.status(400).json({
            msg: `Usuario no existe con el email ${Uemail}`
        })
    }


    const passwordValid = await bcrypt.compare(Upassword, user.Upassword)

    if (!passwordValid) {
        return res.status(400).json({
            msg: `Password Incorrecto`
        })
    }

    const token = jwt.sign({
        Uemail: Uemail
    }, process.env.SECRET_KEY as string,
    );
    res.json({ token })
}
