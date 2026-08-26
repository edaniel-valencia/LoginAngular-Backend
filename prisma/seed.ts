import 'dotenv/config'
import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { PrismaMariaDb } from '@prisma/adapter-mariadb'

const adapter = new PrismaMariaDb(process.env.DATABASE_URL as string)
const prisma = new PrismaClient({ adapter })

async function main() {
    const Upassword = await bcrypt.hash('Admin123!', 10)

    const user = await prisma.user.upsert({
        where: { Uemail: 'admin@example.com' },
        update: {},
        create: {
            Uname: 'Admin',
            Ulastname: 'Valencia',
            Uemail: 'admin@example.com',
            Upassword,
            Ucredential: 'admin',
            Ustatus: 1
        }
    })

    console.log(`Usuario de prueba listo: ${user.Uemail} / Admin123!`)
}

main()
    .catch((error) => {
        console.error(error)
        process.exitCode = 1
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
