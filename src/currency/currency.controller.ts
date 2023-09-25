import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    UseGuards,
    Put,
    Param,
    Inject,
} from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CurrencyService } from './currency.service';
import { CurrencyDto } from './dto/currency.dto';
import { ApiTags, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { GetCurrencyResponseDto } from './dto/get-currency-response.dto';
import { CheckPermission } from '../utils/checkPermission';

@Controller('currency')
@ApiTags('currency')
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) {}

    @Post('create-currency')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('create_currency'))
    @ApiOkResponse({ type: CreateCurrencyDto })
    register(
        @Body() createCurrencyDto: CreateCurrencyDto,
    ): Promise<CreateCurrencyDto> {
        return this.currencyService.create(createCurrencyDto);
    }

    @Get('get-all-currency')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_currency'))
    @ApiOkResponse({ type: [CurrencyDto] })
    findAll(): Promise<GetCurrencyResponseDto[]> {
        return this.currencyService.findAll();
    }

    @Get('currency-findById/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_currency'))
    @ApiOkResponse({ type: CurrencyDto })
    async getUser(@Param('id') id: string): Promise<GetCurrencyResponseDto> {
        return this.currencyService.getCurrency(id);
    }

    @Put('update-currency')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_currency'))
    @ApiOkResponse({ type: CurrencyDto })
    update(
        @Body() updateCurrencyDto: UpdateCurrencyDto,
    ): Promise<CurrencyDto> {
        return this.currencyService.update(updateCurrencyDto);
    }

    @Delete('delete-currency/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_currency'))
    @ApiOkResponse({ type: CurrencyDto })
    delete(@Param('id') id: string): Promise<CurrencyDto> {
        return this.currencyService.delete(id);
    }
}
