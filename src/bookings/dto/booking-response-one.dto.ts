import { ApiProperty } from '@nestjs/swagger';
import { Booking } from '../../../src/bookings/bookings.entity';

export class BookingResponseOneDto {
    @ApiProperty()
    token: string;
    @ApiProperty()
    booking: Partial<any>;

    constructor(booking: Partial<any>) {
        const outputObj = {
            id: booking.id,
            date_time: booking.date_time,
            is_driver_commission: booking.is_driver_commission,
            is_other_commission: booking.is_other_commission,
            branch_id: booking.branch_id,
            customer_id: booking.customer_id,
            discount: booking.discount,
            card_payment: booking.card_payment,
            cash_payment: booking.cash_payment,
            other_commission: booking.other_commission,
            status: booking.status,
            remarks: booking.remarks,
            therapists_commission: booking.therapistCommission,
            products_fee:booking.products_fee.toString(),
            services_fee:booking.services_fee.toString(),
            actual_services_fee:booking.actual_services_fee.toString(),
            actual_products_fee:booking.actual_products_fee.toString(),
            service_detail: booking.bookingService.map(service => {
                let serviceId = service.service_id;
                let time_slot = service.time_slot;
                const srv = { ...service.toJSON() };
                if (time_slot && time_slot.length > 0) {
                    if (time_slot.includes('-')) {
                        const split = time_slot.split('-');
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
                booking.bookingTherapist.forEach(tp => {
                    if (tp.service_id === serviceId) {
                        if (
                            !tp.is_optional_therapist ||
                            tp.is_optional_therapist === null
                        ) {
                            if (!srv['therapists']) {
                                srv['therapists'] = [tp.user_id];
                            } else {
                                if (!srv['therapists'].includes(tp.user_id)) {
                                    srv['therapists'].push(tp.user_id);
                                }
                            }
                        } else {
                            if (!srv['optional_therapists']) {
                                srv['optional_therapists'] = tp.user_id;
                            }
                            // } else {
                            //     srv['optional_therapists'].push(tp.optional_therapist_id);
                            // }
                        }
                    }
                });

                return srv;
            }),
            customer_detail: booking.customers,
            tips: booking.tips,
            driver_commission: booking.taxiDriver?.driver_commission
                ? booking.taxiDriver?.driver_commission
                : '',
            product_detail: booking.bookingProduct,
        };
        outputObj.tips = outputObj.tips.map(tip => {
            const tp = { ...tip.toJSON() };
            if (tp.payment_method === 'card'){
                delete tp.payment_method;
                tp['payment_method_card'] = tip.payment_method as any;
            }else if (tp.payment_method === 'cash') {
                tp['payment_method'] = tip.payment_method as any;
            }
            console.log({tp})
            return tp;
        });

        this.booking = outputObj;
    }
}
