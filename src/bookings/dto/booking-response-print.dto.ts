import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Booking } from '../../../src/bookings/bookings.entity';

export class DUser {
    @ApiProperty()
    @IsString()
    readonly first_name: string;

    @ApiProperty()
    @IsString()
    readonly last_name: string;
}
export class BookingResponsePrintDto {
    @ApiProperty()
    token: string;
    @ApiProperty()
    booking: Partial<Booking>;

    constructor(booking: Partial<Booking>) {
        const formatTime = timeValue => {
            const [hours, minutes] = timeValue.split(':');
            const hoursNum = parseInt(hours, 10);
            const amPm = hoursNum >= 12 ? 'PM' : 'AM';
            const hours12 =
                hoursNum === 0 ? 12 : hoursNum > 12 ? hoursNum - 12 : hoursNum;
            return `${hours12}:${minutes} ${amPm}`;
        };
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
            service_detail: booking.bookingService.map(service => {
                let serviceId = service.service_id;
                let time_slot = service.time_slot;
                const srv = { ...service.toJSON() };
                if (time_slot && time_slot.length > 0) {
                    if (time_slot.includes('-')) {
                        const split = time_slot.split('-');
                        srv['booked_time'] =
                            formatTime(split[0]) +
                            ' ' +
                            '-' +
                            ' ' +
                            formatTime(split[1]);

                        srv['start_time'] = split[0];
                        srv['end_time'] = split[1];
                    } else {
                        srv['start_time'] = '';
                        srv['end_time'] = '';
                    }
                } else {
                    srv['start_time'] = '';
                    srv['end_time'] = '';
                }

                if (!srv['room_name']) {
                    srv['room_name'] = service.room.name;
                } else {
                    srv['room_name'] = service.room.name;
                }

                if (!srv['service_name']) {
                    srv['service_name'] = service.service.name;
                } else {
                    srv['service_name'] = service.service.name;
                }

                booking.bookingTherapist.forEach(tp => {
                    if (tp.service_id === serviceId) {
                        if (
                            !tp.is_optional_therapist ||
                            tp.is_optional_therapist === null
                        ) {
                            if (!srv['therapists']) {
                                srv['therapists'] = [
                                    `${tp.user.firstName} ${tp.user.lastName},`,
                                ];
                            } else {
                                if (!srv['therapists'].includes(` ${tp.user.firstName} ${tp.user.lastName},`)) {
                                    srv['therapists'].push(
                                        ` ${tp.user.firstName} ${tp.user.lastName},`,
                                    );
                                }
                            }
                        } else {
                            if (!srv['optional_therapists']) {
                                srv[
                                    'optional_therapists'
                                ] = `${tp.user.firstName} ${tp.user.lastName}`;
                            }
                            // } else {
                            //     srv['optional_therapists'].push(tp.optional_therapist_id);
                            // }
                        }
                    }
                });
                return srv;
            }),
        };

        this.booking = outputObj;
    }
}
