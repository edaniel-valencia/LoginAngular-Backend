import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class LoginUserDto {
    @IsEmail() Uemail!: string
    @IsString() @IsNotEmpty() Upassword!: string
}
