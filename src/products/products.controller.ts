import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, UseGuards } from '@nestjs/common'
import { ProductsService } from './products.service'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

@Controller('api/product')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {}

    @Get('read')
    @UseGuards(JwtAuthGuard)
    readProduct() {
        return this.productsService.readProduct()
    }

    @Get('read/:Pid')
    readIdProductId(@Param('Pid') Pid: string) {
        return this.productsService.readIdProductId(Pid)
    }

    @Post('create')
    @HttpCode(HttpStatus.OK)
    createProduct(@Body() dto: CreateProductDto) {
        return this.productsService.createProduct(dto)
    }

    @Patch('update/:Pid')
    updateProduct(@Param('Pid') Pid: string, @Body() dto: UpdateProductDto) {
        return this.productsService.updateProduct(Pid, dto)
    }

    @Delete('delete/:Pid')
    deleteProduct(@Param('Pid') Pid: string) {
        return this.productsService.deleteProduct(Pid)
    }
}
