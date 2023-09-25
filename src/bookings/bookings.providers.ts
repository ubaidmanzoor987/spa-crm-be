import { Booking } from './bookings.entity';

export const BookingsProviders = [{ provide: 'BookingRepository', useValue: Booking }];
