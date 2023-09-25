import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    UseGuards,
    Param,
    Patch,
} from '@nestjs/common';

import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateRolePermissionDto } from './dto/create-rolePermissions.dto';
import { RolePermissionCreatedAndUpdatedResponseDto } from './dto/rolePermissions-response.dto';
import { UpdateRolePermissionDto } from './dto/update-rolePermissions.dto';
import { RolePermissionDto } from './dto/rolePermissions.dto';
import { RolePermissionServices } from './rolePermissions.service';

@Controller('rolePermissions')
@ApiTags('rolePermissions')
export class RolePermissionController {
    constructor(private readonly rolePermissionsServices: RolePermissionServices) {}

    @Post('create-rolepermission')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: RolePermissionCreatedAndUpdatedResponseDto })
    register(
        @Body() createRolePermissionDto: CreateRolePermissionDto,
    ): Promise<RolePermissionCreatedAndUpdatedResponseDto> {
        return this.rolePermissionsServices.create(createRolePermissionDto);
    }

    // @Get('get-rolepermissions/:id')
    // @ApiBearerAuth()
    // @UseGuards(AuthGuard('jwt'))
    // @ApiOkResponse({ type: RolePermissionDto })
    // findRolePermission(@Param('id') id: number): Promise<RolePermissionCreatedAndUpdatedResponseDto> {
    //     return this.rolePermissionsServices.findRolePermission(id);
    // }

    @Get('get-all-rolepermissions')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type:RolePermissionDto })
    // findAll(): Promise<RolePermissionDto[]> {
    findAll(): Promise<any[]> {
        return this.rolePermissionsServices.findAll();
    }

    @Patch('update-rolepermission')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: RolePermissionDto })
    update(
        @Body() updateRolePermissionDto: UpdateRolePermissionDto,
    ): Promise<RolePermissionCreatedAndUpdatedResponseDto> {
        return this.rolePermissionsServices.update(
            updateRolePermissionDto.id,
            updateRolePermissionDto,
        );
    }

    @Delete('delete-rolepermission/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: RolePermissionDto })
    delete(@Param('id') id: number): Promise<number> {
        return this.rolePermissionsServices.delete(id);
    }

}
