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
import { LeadServices } from './leads.service';
import { LeadDto } from './dto/leads.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LeadsCreatedAndUpdatedResponseDto } from './dto/leads-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateLeadsDto } from './dto/update-leads.dto';

@Controller('leads')
@ApiTags('leads')
export class LeadsController {
    constructor(private readonly leadServices: LeadServices) { }

    @Post('create-lead')
    @ApiOkResponse({ type: LeadsCreatedAndUpdatedResponseDto })
    register(
        @Body() createLeadsDto: any,
        @Body('token') token: string,
    ): Promise<LeadsCreatedAndUpdatedResponseDto> {
        const decodedToken = JSON.parse(atob(token));
        const userId = decodedToken.userId;
        const expirationTime = new Date(decodedToken.expirationTime);
        const currentDate = new Date().getTime()
        const expiredDate = new Date(expirationTime).getTime()
        if (currentDate < expiredDate) {
            return this.leadServices.create(createLeadsDto.createLeadsDto);

        } else {
            throw new Error('Token has expired');
        }
    }

    @Get('get-all-leads')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [LeadDto] })
    findAll(): Promise<LeadDto[]> {
        return this.leadServices.findAll();
    }

    @Patch('update-lead')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: LeadDto })
    update(
        @Body() updateLeadDto: UpdateLeadsDto,
    ): Promise<LeadsCreatedAndUpdatedResponseDto> {
        return this.leadServices.update(
            updateLeadDto.id,
            updateLeadDto,
        );
    }

    @Delete('delete-lead/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: LeadDto })
    delete(@Param('id') id: number): Promise<number> {
        return this.leadServices.delete(id);
    }
}
