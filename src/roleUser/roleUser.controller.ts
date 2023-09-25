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
import { CreateRoleUserDto } from './dto/create-roleUser.dto';
import { RoleUserCreatedAndUpdatedResponseDto } from './dto/roleUser-response.dto';
import { UpdateRoleUserDto } from './dto/update-roleUser.dto';
import { RoleUserDto } from './dto/roleUser.dto';
import { RoleUserServices } from './roleUser.service';

@Controller('roleUser')
@ApiTags('roleUser')
export class RoleUserController {
    constructor(private readonly roleUserServices: RoleUserServices) {}

    @Post('create-roleuser')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: RoleUserCreatedAndUpdatedResponseDto })
    register(
        @Body() createRoleUserDto: CreateRoleUserDto,
    ): Promise<RoleUserCreatedAndUpdatedResponseDto> {
        return this.roleUserServices.create(createRoleUserDto);
    }

    @Get('get-roleusers-permissions/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: RoleUserCreatedAndUpdatedResponseDto })
    findRolePermission(@Param('id') id: number): Promise<any> {
        return this.roleUserServices.findRolePermission(id);
    }

    @Get('get-all-roleusers')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type:RoleUserDto })
    // findAll(): Promise<RoleUserDto[]> {
    findAll(): Promise<any[]> {
        return this.roleUserServices.findAll();
    }

    @Patch('update-roleuser')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: RoleUserDto })
    update(
        @Body() updateRoleUserDto: UpdateRoleUserDto,
    ): Promise<RoleUserCreatedAndUpdatedResponseDto> {
        return this.roleUserServices.update(
            updateRoleUserDto.id,
            updateRoleUserDto,
        );
    }

    @Delete('delete-roleuser/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: RoleUserDto })
    delete(@Param('id') id: number): Promise<number> {
        return this.roleUserServices.delete(id);
    }

}
