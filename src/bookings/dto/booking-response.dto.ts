import { ApiProperty } from '@nestjs/swagger';
import { Booking } from '../../../src/bookings/bookings.entity';

export class BookingCreatedAndUpdatedResponseDto {
    @ApiProperty()
    token: string;

    @ApiProperty()
    booking: Partial<Booking>;

    constructor(booking: Partial<Booking>) {
        const outputObj = {
            id: booking.id,
            date_time: booking.date_time,
            is_driver_commission: booking.is_driver_commission,
            branch_id: booking.branch_id,
            customer_id: booking.customer_id,
            discount: booking.discount,
            card_payment: booking.card_payment,
            cash_payment: booking.cash_payment,
            other_commission: booking.other_commission,
            status: booking.status,
            remarks: booking.remarks,
        };
        this.booking = outputObj;
    }
}
