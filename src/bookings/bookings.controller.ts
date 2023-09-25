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
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingServices } from './bookings.service';
import { BookingDto } from './dto/booking.dto';
import {
    ApiTags,
    ApiOkResponse,
    ApiBearerAuth,
    ApiBasicAuth,
} from '@nestjs/swagger';
import { BookingCreatedAndUpdatedResponseDto } from './dto/booking-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { CheckPermission } from '../utils/checkPermission';

@Controller('bookings')
@ApiTags('bookings')
export class BookingsController {
    constructor(private readonly bookingServices: BookingServices) {}

    @Post('create-booking')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('create_booking'))
    @ApiOkResponse({ type: BookingCreatedAndUpdatedResponseDto })
    register(
        @Body() createBookingDto: CreateBookingDto,
    ): Promise<any> {
        return this.bookingServices.create(createBookingDto);
    }

    
    @Get('get-customer/:phone')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: BookingDto })
    findCustomer(@Param('phone') phone: number): Promise<any> {
        return this.bookingServices.findCustomer(phone);
    }

    @Get('get-booking/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_booking'))
    @ApiOkResponse({ type: BookingDto })
    findOne(@Param('id') id: number): Promise<BookingCreatedAndUpdatedResponseDto> {
        return this.bookingServices.findOne(id);
    }

    @Get('get-print-booking/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: BookingDto })
    findPrintData(@Param('id') id: number): Promise<BookingCreatedAndUpdatedResponseDto> {
        return this.bookingServices.findPrintData(id);
    }


    @Get('get-all-bookings')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_booking'))
    @ApiOkResponse({ type: [BookingDto] })
    findAll(@Req() request): Promise<BookingDto[]> {
        const request_branch_id = request.user.branch_id
        const role = request.user.role
        return this.bookingServices.findAll(request_branch_id,role);
    }

    @Patch('update-booking')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_booking'))
    @ApiOkResponse({ type: BookingDto })
    update(
        @Body() updateBookingDto: UpdateBookingDto,
    ): Promise<BookingCreatedAndUpdatedResponseDto> {
        return this.bookingServices.update(
            updateBookingDto.id,
            updateBookingDto,
        );
    }

    @Patch('update-booking-status')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_booking'))
    @ApiOkResponse({ type: BookingDto })
    updateStatus(
        @Body() updateBookingDto: UpdateBookingStatusDto,
    ): Promise<BookingCreatedAndUpdatedResponseDto> {
        return this.bookingServices.updateStatus(
            updateBookingDto.id,
            updateBookingDto,
        );
    }

    @Delete('delete-booking/:id')
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(new CheckPermission('manage_booking'))
    @ApiOkResponse({ type: BookingDto })
    delete(@Param('id') id: number): Promise<number> {
        return this.bookingServices.delete(id);
    }
}
