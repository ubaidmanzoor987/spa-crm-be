import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    UseGuards,
    Param,
    Patch,
    Req,
} from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { ServiceServices } from './services.service';
import { ServiceDto } from './dto/service.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth, ApiBasicAuth} from '@nestjs/swagger';
import { ServiceCreatedAndUpdatedResponseDto } from './dto/service-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateServiceDto } from './dto/update-service.dto';
import { CheckPermission } from '../utils/checkPermission';

@Controller('services')
@ApiTags('services')
export class ServiceController {
    constructor(private readonly serviceServices: ServiceServices) {}

    @Post('create-service')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('create_service'))
    @ApiOkResponse({ type: ServiceCreatedAndUpdatedResponseDto })
    register(
        @Body() createServiceDto: CreateServiceDto,
    ): Promise<ServiceCreatedAndUpdatedResponseDto> {
        return this.serviceServices.create(createServiceDto);
    }

    @Get('get-all-services')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_service'))
    @ApiOkResponse({ type: [ServiceDto] })
    findAll(@Req() request): Promise<ServiceDto[]> {
        const request_branch_id = request.user.branch_id;
        const role = request.user.role;
        return this.serviceServices.findAll(request_branch_id, role);
    }

    @Patch('update-service')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_service'))
    @ApiOkResponse({ type: ServiceDto })
    update(
        @Body() updateServiceDto: UpdateServiceDto,
    ): Promise<ServiceCreatedAndUpdatedResponseDto> {
        return this.serviceServices.update(updateServiceDto.id, updateServiceDto);
    }

    @Delete('delete-service/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_service'))
    @ApiOkResponse({ type: ServiceDto })
    delete(@Param('id') id: number): Promise<ServiceCreatedAndUpdatedResponseDto> {
        return this.serviceServices.delete(id);
    }
}
