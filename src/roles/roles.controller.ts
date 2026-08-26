import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common'
import { RolesService } from './roles.service'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@Controller('api/role')
export class RolesController {

    constructor(private readonly rolesService: RolesService) {}

    @Get('read')
    readRole() {
        return this.rolesService.readRole()
    }

    @Get('read/:Rid')
    readRoleId(@Param('Rid') Rid: string) {
        return this.rolesService.readRoleId(Rid)
    }

    @Post('create')
    @HttpCode(HttpStatus.OK)
    createRole(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }

    @Patch('update/:Rid')
    updateRole(@Param('Rid') Rid: string, @Body() dto: UpdateRoleDto) {
        return this.rolesService.updateRole(Rid, dto)
    }

    @Delete('delete/:Rid')
    deleteRole(@Param('Rid') Rid: string) {
        return this.rolesService.deleteRole(Rid)
    }
}
