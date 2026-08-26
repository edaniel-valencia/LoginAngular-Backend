import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'

@Controller('api/user')
export class UsersController {

    constructor(private readonly usersService: UsersService) {}

    @Get('read')
    readUser() {
        return this.usersService.readUser()
    }

    @Post(['create', 'register'])
    @HttpCode(HttpStatus.OK)
    createUser(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto)
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() dto: LoginUserDto) {
        return this.usersService.loginUser(dto)
    }
}
