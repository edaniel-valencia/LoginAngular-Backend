import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@Injectable()
export class RolesService {

    constructor(private readonly prisma: PrismaService) {}

    async readRole() {
        try {
            const listRole = await this.prisma.role.findMany()
            return listRole
        } catch (error) {
            throw new HttpException({ msg: `Error al listar los roles` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async readRoleId(Rid: string) {
        try {
            const role = await this.prisma.role.findUnique({ where: { Rid: Number(Rid) } })

            if (!role) {
                throw new HttpException({ msg: `Rol con ID ${Rid} no encontrada` }, HttpStatus.NOT_FOUND)
            }
            return {
                msg: `Rol con ID ${Rid} encontrada exitosamente`,
                data: role
            }

        } catch (error) {
            if (error instanceof HttpException) throw error
            throw new HttpException({ msg: `Error al buscar la Rol con ID ${Rid}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createRole(dto: CreateRoleDto) {
        const { Rname } = dto

        const role = await this.prisma.role.findFirst({ where: { Rname: Rname } })

        if (role) {
            throw new HttpException({ msg: `Rol ${Rname}, ya existe` }, HttpStatus.BAD_REQUEST)
        }
        try {
            await this.prisma.role.create({
                data: {
                    Rname: Rname,
                    Rstatus: 1
                }
            })
            return {
                msg: `Rol ${Rname}, creada exitosamente`
            }
        } catch (error) {
            return {
                msg: `Error al crear la Rol ${Rname}`
            }
        }
    }

    async updateRole(Rid: string, dto: UpdateRoleDto) {
        const { Rname, Rstatus } = dto

        try {
            const role = await this.prisma.role.findUnique({ where: { Rid: Number(Rid) } })

            if (!role) {
                throw new HttpException({ msg: `Rol ${Rname} no encontrada` }, HttpStatus.NOT_FOUND)
            }

            await this.prisma.role.update({
                where: { Rid: Number(Rid) },
                data: {
                    Rname: Rname,
                    Rstatus: Rstatus
                }
            })

            return {
                msg: `Rol ${Rname} actualizada exitosamente`
            }

        } catch (error) {
            if (error instanceof HttpException) throw error
            throw new HttpException({ msg: `Error al actualizar la Rol ${Rname}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async deleteRole(Rid: string) {
        try {
            const role = await this.prisma.role.findUnique({ where: { Rid: Number(Rid) } })

            if (!role) {
                throw new HttpException({ msg: `Rol con ID ${Rid} no encontrada` }, HttpStatus.NOT_FOUND)
            }

            await this.prisma.role.delete({ where: { Rid: Number(Rid) } })

            return {
                msg: `Rol con ID ${Rid} eliminada exitosamente`
            }

        } catch (error) {
            if (error instanceof HttpException) throw error
            throw new HttpException({ msg: `Error al eliminar la Rol con ID ${Rid}` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
