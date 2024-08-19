import { Request, Response } from 'express'
import { Role } from '../models/role'

export const ReadRole = async (req: Request, res: Response) => {
    const listRol = await Role.findAll();
    res.json(listRol);
}
