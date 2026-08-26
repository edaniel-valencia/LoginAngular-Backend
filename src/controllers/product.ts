import type { Request, Response } from 'express'
import prisma from '../database/connection'

export const ReadProduct = async (req: Request, res: Response) => {
    try {
        const listProduct = await prisma.product.findMany();
        res.json(listProduct);
    } catch (error) {
        res.status(500).json({
            msg: `Error al listar los productos`
        });
    }
}

export const ReadIdProductId = async (req: Request, res: Response) => {
    const { Pid } = req.params;
    try {
        const product = await prisma.product.findUnique({ where: { Pid: Number(Pid) } });

        if (!product) {
            return res.status(404).json({
                msg: `Product con ID ${Pid} no encontrada`
            });
        }
        return res.json({
            msg: `Product con ID ${Pid} encontrada exitosamente`,
            data: product
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al buscar la Product con ID ${Pid}`
        });
    }
}

export const CreateProduct = async (req: Request, res: Response) => {

    const { Pname, Pdescription, CategoryId } = req.body

    try {

        const existingProduct = await prisma.product.findFirst({ where: { Pname: Pname } });

        if (existingProduct) {
            return res.status(400).json({
                msg: `Producto ${Pname}, ya existe`
            })
        }

        await prisma.product.create({
            data: {
                Pname: Pname,
                Pdescription: Pdescription,
                Pstatus: 1,
                CategoryId: Number(CategoryId)
            }
        })

        return res.json({
            msg: `Producto ${Pname}, creada exitosamente`
        })

    } catch (error) {
        return res.json({
            msg: `Error al crear la product ${Pname}`
        })
    }

}

export const UpdateProduct = async (req: Request, res: Response) => {

    const { Pid } = req.params;
    const { Pname, Pdescription, CategoryId } = req.body;

    try {
        const product = await prisma.product.findUnique({ where: { Pid: Number(Pid) } });

        if (!product) {
            return res.status(404).json({
                msg: `Producto ${Pname} no encontrada`
            });
        }

        await prisma.product.update({
            where: { Pid: Number(Pid) },
            data: {
                Pname: Pname,
                Pdescription: Pdescription,
                Pstatus: 1,
                CategoryId: Number(CategoryId)
            }
        });

        return res.json({
            msg: `Producto ${Pname} actualizada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al actualizar la Producto ${Pname}`
        });
    }
};

export const DeleteProduct = async (req: Request, res: Response) => {

    const { Pid } = req.params;
    try {
        const product = await prisma.product.findUnique({ where: { Pid: Number(Pid) } });

        if (!product) {
            return res.status(404).json({
                msg: `Producto con ID ${Pid} no encontrada`
            });
        }

        await prisma.product.delete({ where: { Pid: Number(Pid) } });

        return res.json({
            msg: `Producto con ID ${Pid} eliminada exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            msg: `Error al eliminar la Producto con ID ${Pid}`
        });
    }
};
