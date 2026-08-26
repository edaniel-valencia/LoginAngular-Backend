import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { Type } from 'class-transformer'

// Pstatus no se declara: el service original lo ignora siempre y fuerza 1.
export class UpdateProductDto {
    @IsString() @IsNotEmpty() Pname!: string
    @IsString() @IsNotEmpty() Pdescription!: string
    @Type(() => Number) @IsInt() CategoryId!: number
}
