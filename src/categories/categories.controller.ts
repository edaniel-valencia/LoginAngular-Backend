import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Controller('api/category')
export class CategoriesController {

    constructor(private readonly categoriesService: CategoriesService) {}

    @Get('read')
    readCategory() {
        return this.categoriesService.readCategory()
    }

    @Get('read/:Cid')
    readCategoryId(@Param('Cid') Cid: string) {
        return this.categoriesService.readCategoryId(Cid)
    }

    @Post('create')
    @HttpCode(HttpStatus.OK)
    createCategory(@Body() dto: CreateCategoryDto) {
        return this.categoriesService.createCategory(dto)
    }

    @Patch('update/:Cid')
    updateCategory(@Param('Cid') Cid: string, @Body() dto: UpdateCategoryDto) {
        return this.categoriesService.updateCategory(Cid, dto)
    }

    @Delete('delete/:Cid')
    deleteCategory(@Param('Cid') Cid: string) {
        return this.categoriesService.deleteCategory(Cid)
    }
}
