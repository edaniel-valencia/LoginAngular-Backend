import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {

    constructor(private readonly prisma: PrismaService) {}

    async readCategory() {
        try {
            const listCategory = await this.prisma.category.findMany()
            return listCategory
        } catch (error) {
            throw new HttpException({ msg: `Error al listar las categorías` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async readCategoryId(Cid: string) {
        try {
            const category = await this.prisma.category.findUnique({ where: { Cid: Number(Cid) } })

            if (!category) {
                throw new HttpException({ msg: `Categoría con ID ${Cid} no encontrada` }, HttpStatus.NOT_FOUND)
            }
            return {
                msg: `Categoría con ID ${Cid} encontrada exitosamente`,
                data: category
            }

        } catch (error) {
            if (error instanceof HttpException) throw error
            throw new HttpException({ msg: `Error al buscar la categoría con ID ${Cid}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createCategory(dto: CreateCategoryDto) {
        const { Cname, Cdescription } = dto

        const category = await this.prisma.category.findFirst({ where: { Cname: Cname } })

        if (category) {
            throw new HttpException({ msg: `Categoria ${Cname}, ya existe` }, HttpStatus.BAD_REQUEST)
        }
        try {
            await this.prisma.category.create({
                data: {
                    Cname: Cname,
                    Cdescription: Cdescription,
                    Cstatus: 1
                }
            })
            return {
                msg: `Categoria ${Cname}, creada exitosamente`
            }
        } catch (error) {
            return {
                msg: `Error al crear la categoria ${Cname}`
            }
        }
    }

    async updateCategory(Cid: string, dto: UpdateCategoryDto) {
        const { Cname, Cdescription, Cstatus } = dto

        try {
            const category = await this.prisma.category.findUnique({ where: { Cid: Number(Cid) } })

            if (!category) {
                throw new HttpException({ msg: `Categoría ${Cname} no encontrada` }, HttpStatus.NOT_FOUND)
            }

            await this.prisma.category.update({
                where: { Cid: Number(Cid) },
                data: {
                    Cname: Cname,
                    Cdescription: Cdescription,
                    Cstatus: Cstatus
                }
            })

            return {
                msg: `Categoría ${Cname} actualizada exitosamente`
            }

        } catch (error) {
            if (error instanceof HttpException) throw error
            throw new HttpException({ msg: `Error al actualizar la categoría ${Cname}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteCategory(Cid: string) {
        try {
            const category = await this.prisma.category.findUnique({ where: { Cid: Number(Cid) } })

            if (!category) {
                throw new HttpException({ msg: `Categoría con ID ${Cid} no encontrada` }, HttpStatus.NOT_FOUND)
            }

            await this.prisma.category.delete({ where: { Cid: Number(Cid) } })

            return {
                msg: `Categoría con ID ${Cid} eliminada exitosamente`
            }

        } catch (error) {
            if (error instanceof HttpException) throw error
            throw new HttpException({ msg: `Error al eliminar la categoría con ID ${Cid}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
