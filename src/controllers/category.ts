import type { Request, Response } from 'express'
import prisma from '../database/connection'

export const ReadCategory = async (req: Request, res: Response) => {
    try {
        const listCategory = await prisma.category.findMany();
        res.json(listCategory);
    } catch (error) {
        res.status(500).json({
            msg: `Error al listar las categorías`
        });
    }
}

export const ReadCategoryId = async (req: Request, res: Response) => {
    const { Cid } = req.params;
    try {
        const category = await prisma.category.findUnique({ where: { Cid: Number(Cid) } });

        if (!category) {
            return res.status(404).json({
                msg: `Categoría con ID ${Cid} no encontrada`
            });
        }
        return res.json({
            msg: `Categoría con ID ${Cid} encontrada exitosamente`,
            data: category
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al buscar la categoría con ID ${Cid}`
        });
    }
}

export const CreateCategory = async (req: Request, res: Response) => {

    const { Cname, Cdescription } = req.body

    const category = await prisma.category.findFirst({ where: { Cname: Cname } })

    if (category) {
        return res.status(400).json({
            msg: `Categoria ${Cname}, ya existe`
        })
    }
    try {
        await prisma.category.create({
            data: {
                Cname: Cname,
                Cdescription: Cdescription,
                Cstatus: 1
            }
        })
        return res.json({
            msg: `Categoria ${Cname}, creada exitosamente`
        })
    } catch (error) {
        return res.json({
            msg: `Error al crear la categoria ${Cname}`
        })
    }

}


export const UpdateCategory = async (req: Request, res: Response) => {

    const { Cid } = req.params;
    const { Cname, Cdescription, Cstatus } = req.body;

    try {
        const category = await prisma.category.findUnique({ where: { Cid: Number(Cid) } });

        if (!category) {
            return res.status(404).json({
                msg: `Categoría ${Cname} no encontrada`
            });
        }

        await prisma.category.update({
            where: { Cid: Number(Cid) },
            data: {
                Cname: Cname,
                Cdescription: Cdescription,
                Cstatus: Cstatus
            }
        });

        return res.json({
            msg: `Categoría ${Cname} actualizada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al actualizar la categoría ${Cname}`
        });
    }
};

export const DeleteCategory = async (req: Request, res: Response) => {

    const { Cid } = req.params;
    try {
        const category = await prisma.category.findUnique({ where: { Cid: Number(Cid) } });

        if (!category) {
            return res.status(404).json({
                msg: `Categoría con ID ${Cid} no encontrada`
            });
        }

        await prisma.category.delete({ where: { Cid: Number(Cid) } });

        return res.json({
            msg: `Categoría con ID ${Cid} eliminada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al eliminar la categoría con ID ${Cid}`
        });
    }
};
