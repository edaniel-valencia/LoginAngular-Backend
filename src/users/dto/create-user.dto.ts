import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
    @IsString() @IsNotEmpty() Uname!: string
    @IsString() @IsNotEmpty() Ulastname!: string
    @IsEmail() Uemail!: string
    @IsString() @IsNotEmpty() Upassword!: string
    @IsString() @IsNotEmpty() Ucredential!: string
}
