import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {

    constructor(private readonly prisma: PrismaService) {}

    async readProduct() {
        try {
            const listProduct = await this.prisma.product.findMany()
            return listProduct
        } catch (error) {
            throw new HttpException({ msg: `Error al listar los productos` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async readIdProductId(Pid: string) {
        try {
            const product = await this.prisma.product.findUnique({ where: { Pid: Number(Pid) } })

            if (!product) {
                throw new HttpException({ msg: `Product con ID ${Pid} no encontrada` }, HttpStatus.NOT_FOUND)
            }
            return {
                msg: `Product con ID ${Pid} encontrada exitosamente`,
                data: product
            }

        } catch (error) {
            if (error instanceof HttpException) throw error
            throw new HttpException({ msg: `Error al buscar la Product con ID ${Pid}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createProduct(dto: CreateProductDto) {
        const { Pname, Pdescription, CategoryId } = dto

        try {
            const existingProduct = await this.prisma.product.findFirst({ where: { Pname: Pname } })

            if (existingProduct) {
                throw new HttpException({ msg: `Producto ${Pname}, ya existe` }, HttpStatus.BAD_REQUEST)
            }

            await this.prisma.product.create({
                data: {
                    Pname: Pname,
                    Pdescription: Pdescription,
                    Pstatus: 1,
                    CategoryId: Number(CategoryId)
                }
            })

            return {
                msg: `Producto ${Pname}, creada exitosamente`
            }

        } catch (error) {
            if (error instanceof HttpException) throw error
            return {
                msg: `Error al crear la product ${Pname}`
            }
        }
    }

    async updateProduct(Pid: string, dto: UpdateProductDto) {
        const { Pname, Pdescription, CategoryId } = dto

        try {
            const product = await this.prisma.product.findUnique({ where: { Pid: Number(Pid) } })

            if (!product) {
                throw new HttpException({ msg: `Producto ${Pname} no encontrada` }, HttpStatus.NOT_FOUND)
            }

            await this.prisma.product.update({
                where: { Pid: Number(Pid) },
                data: {
                    Pname: Pname,
                    Pdescription: Pdescription,
                    Pstatus: 1,
                    CategoryId: Number(CategoryId)
                }
            })

            return {
                msg: `Producto ${Pname} actualizada exitosamente`
            }

        } catch (error) {
            if (error instanceof HttpException) throw error
            throw new HttpException({ msg: `Error al actualizar la Producto ${Pname}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteProduct(Pid: string) {
        try {
            const product = await this.prisma.product.findUnique({ where: { Pid: Number(Pid) } })

            if (!product) {
                throw new HttpException({ msg: `Producto con ID ${Pid} no encontrada` }, HttpStatus.NOT_FOUND)
            }

            await this.prisma.product.delete({ where: { Pid: Number(Pid) } })

            return {
                msg: `Producto con ID ${Pid} eliminada exitosamente`
            }

        } catch (error) {
            if (error instanceof HttpException) throw error
            throw new HttpException({ msg: `Error al eliminar la Producto con ID ${Pid}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
