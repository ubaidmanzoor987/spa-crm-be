import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Currency } from './currency.entity';
import { CurrencyDto } from './dto/currency.dto';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { UpdateCurrencyDto } from './dto/update-currency.dto';
import { GetCurrencyResponseDto } from './dto/get-currency-response.dto';

@Injectable()
export class CurrencyService {
    constructor(
        @Inject('CurrencyRepository')
        private readonly CurrencyRepository: typeof Currency,
    ) {}

    async findAll(): Promise<GetCurrencyResponseDto[]> {
        const currencies = await this.CurrencyRepository.findAll<Currency>();
        return currencies.map(currency => new GetCurrencyResponseDto(currency));
    }

    async getCurrency(id: string): Promise<GetCurrencyResponseDto> {
        const curr = await this.CurrencyRepository.findByPk<Currency>(id);
        if (!curr) {
            throw new HttpException(
                'Currency not found',
                HttpStatus.NOT_FOUND,
            );
        }
        return new GetCurrencyResponseDto(curr);
    }
    
    async create(
        createCurrencyDto: CreateCurrencyDto,
    ): Promise<CreateCurrencyDto> {
        try {
            const currency = new Currency();
            currency.currencyType = createCurrencyDto.currencyType;
            currency.exchangeRate = createCurrencyDto.exchangeRate;
            const currencyData = await currency.save();
            return new CurrencyDto(currencyData);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(
        updateCurrencyDto: UpdateCurrencyDto,
    ): Promise<CreateCurrencyDto> {
        const currency = await this.CurrencyRepository.findByPk<Currency>(updateCurrencyDto.id);
        if (!currency) {
            throw new HttpException(
                'Currency not found.',
                HttpStatus.NOT_FOUND,
            );
        }

        currency.currencyType =
            updateCurrencyDto.currencyType || currency.currencyType;
        currency.exchangeRate =
            updateCurrencyDto.exchangeRate || currency.exchangeRate;

        try {
            const data = await currency.save();
            return new CurrencyDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string): Promise<CreateCurrencyDto> {
        const currency = await this.CurrencyRepository.findByPk<Currency>(id);
        if (!currency) {
            throw new HttpException(
                'Currency not found',
                HttpStatus.NOT_FOUND,
            );
        }
        await currency.destroy();
        return new CurrencyDto(currency);
    }
}
