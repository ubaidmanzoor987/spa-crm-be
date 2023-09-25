import { Booking } from '../../../src/bookings/bookings.entity';
import { ApiProperty } from '@nestjs/swagger';
import moment from 'moment';

export class BookingDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    readonly date_time: Date;

    @ApiProperty()
    readonly is_driver_commission: string;

    @ApiProperty()
    readonly branch_id: number;

    @ApiProperty()
    readonly branch_name: string;
    
    @ApiProperty()
    readonly cutomer_id: string;

    @ApiProperty()
    readonly discount: string;

    @ApiProperty()
    readonly card_payment: string;

    @ApiProperty()
    readonly total_fee: number;

    @ApiProperty()
    readonly services_fee: string;

    @ApiProperty()
    readonly products_fee: string;

    @ApiProperty()
    readonly created_at: Date;

    @ApiProperty()
    readonly cash_payment: string;

    @ApiProperty()
    readonly other_commission: string;

    @ApiProperty()
    readonly status: string;

    @ApiProperty()
    readonly remarks: string;

    @ApiProperty()
    readonly created_by: string;

    @ApiProperty()
    readonly check_out: any;

    @ApiProperty()
    readonly check_in: any;

    @ApiProperty()
    readonly service_rooms: any;

    constructor(booking: Booking, branch_name?: any) {
        this.id = booking.id;
        this.date_time = booking.date_time;
        this.is_driver_commission = booking.is_driver_commission;
        this.branch_id = booking.branch_id;
        this.branch_name = branch_name;
        this.cutomer_id = booking.customer_id.toString();
        this.discount = booking.discount;
        this.services_fee = booking.services_fee.toString();
        this.products_fee = booking.products_fee.toString();
        this.total_fee = booking.products_fee + booking.services_fee;
        this.created_at = booking.createdAt;
        this.card_payment = booking.card_payment;
        this.cash_payment = booking.cash_payment;
        this.other_commission = booking.other_commission;
        this.status = booking.status;
        this.remarks = booking.remarks;
        const sta = booking.bookingService[0]?.time_slot.split('-');
        const end = booking.bookingService[
            booking.bookingService.length - 1
        ]?.time_slot.split('-');
        this.check_in = `${moment(sta[0], 'HH:mm').format('hh:mm A')} `;
        this.check_out = `${moment(end[1], 'HH:mm').format('hh:mm A')}`;
        const roomsIds: string[] = [];
        booking.bookingService.map(service => {
            roomsIds.push(service.room_id);
        });
        this.service_rooms = roomsIds.join(',');
        this.created_by = 'crm';
    }
}
