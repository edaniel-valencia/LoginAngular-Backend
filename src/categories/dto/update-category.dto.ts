import { IsInt, IsNotEmpty, IsString } from 'class-validator'

export class UpdateCategoryDto {
    @IsString() @IsNotEmpty() Cname!: string
    @IsString() @IsNotEmpty() Cdescription!: string
    @IsInt() Cstatus!: number
}
