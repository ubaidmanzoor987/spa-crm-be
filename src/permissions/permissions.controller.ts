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
import { CreatePermissionDto } from './dto/create-permissions.dto';
import { PermissionServices } from './permissions.service';
import { PermissionDto } from './dto/permissions.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { PermissionCreatedAndUpdatedResponseDto } from './dto/permissions-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdatePermissionDto } from './dto/update-permissions.dto';

@Controller('permissions')
@ApiTags('permissions')
export class PermissionsController {
    constructor(private readonly permissionServices: PermissionServices) {}

    @Post('create-permission')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: PermissionCreatedAndUpdatedResponseDto })
    register(
        @Body() createPermissionDto: CreatePermissionDto,
    ): Promise<PermissionCreatedAndUpdatedResponseDto> {
        // ): Promise<any> {
        return this.permissionServices.create(createPermissionDto);
    }

    @Get('get-all-permissions')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [PermissionDto] })
    findAll(): Promise<PermissionDto[]> {
        return this.permissionServices.findAll();
    }

    @Patch('update-permission')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: PermissionDto })
    update(
        @Body() updatePermissionDto: UpdatePermissionDto,
    ): Promise<PermissionCreatedAndUpdatedResponseDto> {
        return this.permissionServices.update(
            updatePermissionDto.id,
            updatePermissionDto,
        );
    }

    @Delete('delete-permission/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: PermissionDto })
    delete(@Param('id') id: number): Promise<number> {
        return this.permissionServices.delete(id);
    }
}
