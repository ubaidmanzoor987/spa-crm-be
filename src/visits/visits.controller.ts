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
import { VisitServices } from './visits.service';
import { VisitDto } from './dto/visits.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { VisitsCreatedAndUpdatedResponseDto } from './dto/visits-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateVisitsDto } from './dto/update-visits.dto';
import { CreateVisitsDto } from './dto/create-visits.dto';

@Controller('visits')
@ApiTags('visits')
export class VisitsController {
    constructor(private readonly visitServices: VisitServices) { }

    @Post('create')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: VisitsCreatedAndUpdatedResponseDto })
    create(
        @Body() createVisitsDto: CreateVisitsDto,
    ): Promise<VisitsCreatedAndUpdatedResponseDto> {
        return this.visitServices.create(createVisitsDto);
    }

    @Post('create-visit')
    @ApiOkResponse({ type: VisitsCreatedAndUpdatedResponseDto })
    register(
        @Body() createVisitsDto: any,
        @Body('token') token: string,
    ): Promise<VisitsCreatedAndUpdatedResponseDto> {
        const decodedToken = JSON.parse(atob(token));
        // const userId = decodedToken.userId;
        const expirationTime = new Date(decodedToken.expirationTime);
        const currentDate = new Date().getTime()
        const expiredDate = new Date(expirationTime).getTime()
        if (currentDate < expiredDate) {
            return this.visitServices.create(createVisitsDto.createVisitsDto);

        } else {
            throw new Error('Token expired');
        }
    }

    @Get('get-all-visits')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [VisitDto] })
    findAll(): Promise<VisitDto[]> {
        return this.visitServices.findAll();
    }

    @Patch('update')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: VisitDto })
    update(
        @Body() updateVisitDto: UpdateVisitsDto,
    ): Promise<VisitsCreatedAndUpdatedResponseDto> {
        return this.visitServices.update(
            updateVisitDto.id,
            updateVisitDto,
        );
    }

    @Patch('update-visit')
    @ApiOkResponse({ type: VisitDto })
    patch(
        @Body() updateVisitDto: any,
        @Body('token') token: string,
    ): Promise<VisitsCreatedAndUpdatedResponseDto> {
        const decodedToken = JSON.parse(atob(token));
        // const userId = decodedToken.userId;
        const expirationTime = new Date(decodedToken.expirationTime);
        const currentDate = new Date().getTime()
        const expiredDate = new Date(expirationTime).getTime()
        if (currentDate < expiredDate) {
            return this.visitServices.update(
                updateVisitDto.updateVisitDto.id,
                updateVisitDto.updateVisitDto,
            );

        } else {
            throw new Error('Token expired');
        }
    }

    @Delete('delete-visit/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: VisitDto })
    delete(@Param('id') id: number): Promise<number> {
        return this.visitServices.delete(id);
    }
}
