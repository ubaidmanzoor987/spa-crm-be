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
import { CreateSecretsDto } from './dto/create-secrets.dto';
import { SecretsServices } from './secrets.service';
import { SecretsDto } from './dto/secrets.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { secretsCreatedAndUpdatedResponseDto } from './dto/secrets-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateSecretsDto } from './dto/update-secrets.dto';

@Controller('secrets')
@ApiTags('secrets')
export class SecretsController {
    constructor(private readonly secretsServices: SecretsServices) { }

    @Post('create-secret')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: secretsCreatedAndUpdatedResponseDto })
    register(
        @Body() createSecretsDto: CreateSecretsDto,
    ): Promise<secretsCreatedAndUpdatedResponseDto> {
        return this.secretsServices.create(createSecretsDto);
    }

    @Get('get-all-secrets')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: [SecretsDto] })
    findAll(): Promise<SecretsDto[]> {
        return this.secretsServices.findAll();
    }

    @Patch('update-secret')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: SecretsDto })
    update(
        @Body() updateSecretsDto: UpdateSecretsDto,
    ): Promise<secretsCreatedAndUpdatedResponseDto> {
        return this.secretsServices.update(
            updateSecretsDto.id,
            updateSecretsDto,
        );
    }

    @Delete('delete-secret/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: SecretsDto })
    delete(@Param('id') id: number): Promise<number> {
        return this.secretsServices.delete(id);
    }
}
