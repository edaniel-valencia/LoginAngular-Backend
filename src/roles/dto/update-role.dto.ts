import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class UpdateRoleDto {
    @IsString() @IsNotEmpty() Rname!: string
    @IsInt() Rstatus!: number
}
