import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateProductDto {
    @IsString() @IsNotEmpty() Pname!: string
    @IsString() @IsNotEmpty() Pdescription!: string
    @Type(() => Number) @IsInt() CategoryId!: number
}
