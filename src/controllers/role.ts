import type { Request, Response } from 'express'
import prisma from '../database/connection'

export const ReadRole = async (req: Request, res: Response) => {
    try {
        const listRole = await prisma.role.findMany();
        res.json(listRole);
    } catch (error) {
        res.status(500).json({
            msg: `Error al listar los roles`
        });
    }
}


export const ReadRoleId = async (req: Request, res: Response) => {
    const { Rid } = req.params;
    try {
        const role = await prisma.role.findUnique({ where: { Rid: Number(Rid) } });

        if (!role) {
            return res.status(404).json({
                msg: `Rol con ID ${Rid} no encontrada`
            });
        }
        return res.json({
            msg: `Rol con ID ${Rid} encontrada exitosamente`,
            data: role
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al buscar la Rol con ID ${Rid}`
        });
    }
}

export const CreateRole = async (req: Request, res: Response) => {

    const { Rname } = req.body

    const role = await prisma.role.findFirst({ where: { Rname: Rname } })

    if (role) {
        return res.status(400).json({
            msg: `Rol ${Rname}, ya existe`
        })
    }
    try {
        await prisma.role.create({
            data: {
                Rname: Rname,
                Rstatus: 1
            }
        })
        return res.json({
            msg: `Rol ${Rname}, creada exitosamente`
        })
    } catch (error) {
        return res.json({
            msg: `Error al crear la Rol ${Rname}`
        })
    }

}

export const UpdateRole = async (req: Request, res: Response) => {

    const { Rid } = req.params;
    const { Rname, Rstatus } = req.body;

    try {
        const role = await prisma.role.findUnique({ where: { Rid: Number(Rid) } });

        if (!role) {
            return res.status(404).json({
                msg: `Rol ${Rname} no encontrada`
            });
        }

        await prisma.role.update({
            where: { Rid: Number(Rid) },
            data: {
                Rname: Rname,
                Rstatus: Rstatus
            }
        });

        return res.json({
            msg: `Rol ${Rname} actualizada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al actualizar la Rol ${Rname}`
        });
    }
};

export const DeleteRole = async (req: Request, res: Response) => {

    const { Rid } = req.params;
    try {
        const role = await prisma.role.findUnique({ where: { Rid: Number(Rid) } });

        if (!role) {
            return res.status(404).json({
                msg: `Rol con ID ${Rid} no encontrada`
            });
        }

        await prisma.role.delete({ where: { Rid: Number(Rid) } });

        return res.json({
            msg: `Rol con ID ${Rid} eliminada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al eliminar la Rol con ID ${Rid}`
        });
    }
};
