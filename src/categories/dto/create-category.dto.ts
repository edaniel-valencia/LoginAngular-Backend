import { IsNotEmpty, IsString } from 'class-validator'

export class CreateCategoryDto {
    @IsString() @IsNotEmpty() Cname!: string
    @IsString() @IsNotEmpty() Cdescription!: string
}
