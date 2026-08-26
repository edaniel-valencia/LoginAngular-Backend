import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

    constructor(configService: ConfigService) {
        const adapter = new PrismaMariaDb(configService.get<string>('DATABASE_URL') as string)
        super({ adapter })
    }

    async onModuleInit() {
        try {
            await this.$connect()
            console.log("Conexion de DB exitoso")
        } catch (error) {
            console.log("Conexion de DB errorena => " + error)
        }
    }

    async onModuleDestroy() {
        await this.$disconnect()
    }
}
