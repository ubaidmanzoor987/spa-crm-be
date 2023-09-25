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
import { CreateAmenitieDto } from './dto/create-amenities.dto';
import { AmenitieServices } from './amenities.service';
import { AmenitieDto } from './dto/amenities.dto';
import {
    ApiTags,
    ApiOkResponse,
    ApiBearerAuth,
    ApiBasicAuth,
} from '@nestjs/swagger';
import { AmenitieCreatedAndUpdatedResponseDto } from './dto/amenities-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateAmenitieDto } from './dto/update-amenities.dto';
import { CheckPermission } from '../utils/checkPermission';

@Controller('amenities')
@ApiTags('amenities')
export class AmenitieController {
    constructor(private readonly amenitiesServices: AmenitieServices) { }

    @Post('create-amenitie')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('create_amenitie'))
    @ApiOkResponse({ type: AmenitieCreatedAndUpdatedResponseDto })
    register(
        @Body() createAmenitieDto: CreateAmenitieDto,
    ): Promise<AmenitieCreatedAndUpdatedResponseDto> {
        return this.amenitiesServices.create(createAmenitieDto);
    }

    @Get('get-all-amenities')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_amenitie'))
    @ApiOkResponse({ type: [AmenitieDto] })
    findAll(@Req() request): Promise<AmenitieDto[]> {
        const request_branch_id = request.user.branch_id;
        const role = request.user.role;
        return this.amenitiesServices.findAll(request_branch_id, role);
    }

    @Patch('update-amenitie')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_amenitie'))
    @ApiOkResponse({ type: AmenitieDto })
    update(@Body() updateAmenitieDto: UpdateAmenitieDto): Promise<AmenitieCreatedAndUpdatedResponseDto> {
        return this.amenitiesServices.update(
            updateAmenitieDto.id,
            updateAmenitieDto,
        );
    }

    @Delete('delete-amenitie/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_amenitie'))
    @ApiOkResponse({ type: AmenitieDto })
    delete(@Param('id') id: number): Promise<AmenitieCreatedAndUpdatedResponseDto> {
        return this.amenitiesServices.delete(id);
    }
}
