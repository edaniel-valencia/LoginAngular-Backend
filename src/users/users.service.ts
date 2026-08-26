import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class UsersService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    async readUser() {
        try {
            const listUser = await this.prisma.user.findMany()
            return {
                msg: `Lista de usuarios encontrada exitosamente`,
                data: listUser
            }
        } catch (error) {
            throw new HttpException({ msg: `Error al listar los usuarios` }, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async createUser(dto: CreateUserDto) {
        const { Uname, Ulastname, Upassword, Uemail, Ucredential } = dto

        const [userEmail, userCredential] = await Promise.all([
            this.prisma.user.findUnique({ where: { Uemail: Uemail } }),
            this.prisma.user.findUnique({ where: { Ucredential: Ucredential } })
        ])

        if (userEmail) {
            throw new HttpException({ msg: `Usuario ya existe con el email ${Uemail}` }, HttpStatus.BAD_REQUEST)
        }

        if (userCredential) {
            throw new HttpException({ msg: `Usuario ya existe con la credencial ${Ucredential}` }, HttpStatus.BAD_REQUEST)
        }

        const UpasswordHash = await bcrypt.hash(Upassword, 10)
        try {
            await this.prisma.user.create({
                data: {
                    Uname: Uname,
                    Ulastname: Ulastname,
                    Uemail: Uemail,
                    Upassword: UpasswordHash,
                    Ucredential: Ucredential,
                    Ustatus: 1
                }
            })

            return {
                msg: `User ${Uname} ${Ulastname} create success.`
            }

        } catch (error) {
            return {
                msg: `Existe un error al crear el usuario => `, error
            }
        }
    }

    async loginUser(dto: LoginUserDto) {
        const { Uemail, Upassword } = dto

        const user = await this.prisma.user.findUnique({ where: { Uemail: Uemail } })
        if (!user) {
            throw new HttpException({ msg: `Usuario no existe con el email ${Uemail}` }, HttpStatus.BAD_REQUEST)
        }

        const passwordValid = await bcrypt.compare(Upassword, user.Upassword)

        if (!passwordValid) {
            throw new HttpException({ msg: `Password Incorrecto` }, HttpStatus.BAD_REQUEST)
        }

        const token = this.jwtService.sign({ Uemail: Uemail })
        return { token }
    }
}
