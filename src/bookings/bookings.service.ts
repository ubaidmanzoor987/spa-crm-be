import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Booking } from './bookings.entity';
import { BookingDto } from './dto/booking.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { BookingCreatedAndUpdatedResponseDto } from './dto/booking-response.dto';
import {
    CreateBookingTipsDto,
    UpdateBookingDto,
} from './dto/update-booking.dto';
import { Customers } from '../../src/customers/customers.entity';
import { BookingService } from '../../src/bookingServices/bookingServices.entity';
import { BookingTherapist } from '../../src/bookingTherapist/bookingTherapist.entity';
import { TaxiDriver } from '../../src/taxiDriver/taxiDriver.entity';
import { User } from '../../src/users/user.entity';
import sequelize from 'sequelize';
import { Tips } from '../../src/tips/tips.entity';
import { BookingResponseOneDto } from './dto/booking-response-one.dto';
import { BookingProduct } from '../../src/bookingProduct/bookingProducts.entity';
import { Service } from '../../src/services/services.entity';
import { Room } from '../../src/rooms/rooms.entity';
import { BookingResponsePrintDto } from './dto/booking-response-print.dto';
import { UpdateBookingStatusDto } from './dto/update-booking-status.dto';
import { TherapistCommission } from '../../src/therapistCommission/therapistCommission.entity';
import { Branch } from '../../src/branch/branch.entity';

@Injectable()
export class BookingServices {
    constructor(
        @Inject('BookingRepository')
        private readonly BookingRepository: typeof Booking,
    ) {}

    async deleteAllBookingAttached(booking_id: number) {
        try {
            await BookingTherapist.destroy({
                where: {
                    booking_id,
                },
            });
        } catch (er) {
            console.log('er while deleteAllBookingTherapist', er);
        }

        try {
            await BookingService.destroy({
                where: {
                    booking_id,
                },
            });
        } catch (er) {
            console.log('er while deleteAllBookingService', er);
        }

        try {
            await TaxiDriver.destroy({
                where: {
                    booking_id,
                },
            });
        } catch (er) {
            console.log('er while deleteAllTaxiDriver', er);
        }
        try {
            await Tips.destroy({
                where: {
                    booking_id,
                },
            });
        } catch (er) {
            console.log('er while deleteAllTips', er);
        }
        try {
            await BookingProduct.destroy({
                where: {
                    booking_id,
                },
            });
        } catch (er) {
            console.log('er while Delete BookingProduct', er);
        }
        try {
            await TherapistCommission.destroy({
                where: {
                    booking_id,
                },
            });
        } catch (er) {
            console.log('er while Delete TherapistCommission', er);
        }
    }

    async findPrintData(id: number) {
        try {
            const booking: any = await this.BookingRepository.findByPk<Booking>(
                id,
                {
                    attributes: ['id'],
                    include: [
                        {
                            model: BookingService,
                            attributes: [
                                'id',
                                'service_id',
                                'room_id',
                                'third_party_commission',
                                'time_slot',
                            ],
                            required: true,
                            include: [
                                {
                                    model: Service,
                                    attributes: ['name'],
                                    required: true,
                                },
                                {
                                    model: Room,
                                    attributes: ['name'],
                                    required: true,
                                },
                            ],
                        },
                        {
                            model: BookingTherapist,
                            attributes: ['service_id', 'is_optional_therapist'],
                            required: true,
                            include: [
                                {
                                    model: User,
                                    attributes: [
                                        ['first_name', 'firstName'],
                                        ['last_name', 'lastName'],
                                    ],
                                    required: true,
                                },
                            ],
                        },
                    ],
                },
            );

            if (!booking) {
                throw new HttpException(
                    'booking not found.',
                    HttpStatus.NOT_FOUND,
                );
            }
            return new BookingResponsePrintDto(booking);
            // return booking;
        } catch (error) {
            console.log('error from catch', { error });

            throw new Error(error);
        }
    }

    async findOne(id: number) {
        // const Op = sequelize.Op;
        // const booking: any = await this.BookingRepository.findByPk<Booking>(id, {
        //     include: [
        //       {
        //         model: BookingService,
        //         where: {
        //             deleted_at: {
        //                 [Op.not]: null
        //               }
        //         },
        //         attributes: [
        //           'id',
        //           'service_id',
        //           'room_id',
        //           'third_party_commission',
        //           'time_slot',
        //         ],
        //         required: true,
        //       },
        //       {
        //         model: BookingTherapist,
        //         where: {
        //             deleted_at: {
        //                 [Op.not]: null
        //               }
        //         },
        //         attributes: ['user_id'],
        //         required: true,
        //         include: [
        //           {
        //             model: User,
        //             where: {
        //                 deleted_at: {
        //                     [Op.not]: null
        //                   }
        //             },
        //             attributes: [
        //               'first_name',
        //               'last_name',
        //               'profile_picture',
        //             ],
        //             required: true,
        //           },
        //         ],
        //       },
        //       {
        //         model: Customers,
        //         where: {
        //           deleted_at: null
        //         },
        //         required: true,
        //       },
        //       {
        //         model: TaxiDriver,
        //         where: {
        //             deleted_at: {
        //                 [Op.not]: null
        //               }
        //         },
        //         required: true,
        //       },
        //     ],
        //   });

        try {
            const booking: any = await this.BookingRepository.findByPk<Booking>(
                id,
                {
                    include: [
                        {
                            model: BookingService,
                            attributes: [
                                'id',
                                'service_id',
                                'room_id',
                                'selected_duration',
                                'selected_price',
                                'third_party_commission',
                                'time_slot',
                            ],
                            required: false,
                        },
                        {
                            model: BookingTherapist,
                            attributes: [
                                'user_id',
                                'service_id',
                                'is_optional_therapist',
                            ],
                            required: false,
                            // include: [
                            //     {
                            //         model: User,
                            //         attributes: [
                            //             'first_name',
                            //             'last_name',
                            //             'profile_picture',
                            //         ],
                            //         required: true,
                            //     },
                            // ],
                        },
                        {
                            model: Customers,
                            required: false,
                        },
                        {
                            model: TaxiDriver,
                            required: false,
                        },
                        {
                            model: BookingProduct,
                            attributes: ['product_id', 'product_price'],
                            required: false,
                            // include: [
                            //     {
                            //         model: Product,
                            //         attributes: [
                            //             'id',
                            //             'name',
                            //             'price',
                            //             'image',
                            //             'description',
                            //         ],
                            //         required: false,
                            //     },
                            // ],
                        },
                        {
                            model: TherapistCommission,
                            attributes: [
                                ['user_id', 'id'],
                                ['commission', 'commission'],
                            ],
                            required: false,
                        },
                        {
                            model: Tips,
                            attributes: ['tip_amount', 'payment_method'],
                            required: false,
                            include: [
                                {
                                    model: User,
                                    attributes: [
                                        'id',
                                        'email',
                                        'first_name',
                                        'last_name',
                                        'profile_picture',
                                    ],
                                    required: false,
                                },
                            ],
                        },
                    ],
                },
            );

            if (!booking) {
                throw new HttpException(
                    'booking not found.',
                    HttpStatus.NOT_FOUND,
                );
            }
            return new BookingResponseOneDto(booking);
            // return booking;
        } catch (error) {
            console.log('error from catch', { error });

            throw new Error(error);
        }
    }

    async createBookingAttached(
        id: number,
        createBookingDto: CreateBookingDto,
    ) {
        try {
            const promises = [];
            createBookingDto.service_detail.forEach(data => {
                const bookingSer = new BookingService();
                bookingSer.booking_id = id;
                bookingSer.service_id = data.service_id;
                bookingSer.room_id = data.room_id;
                bookingSer.selected_duration = data.selected_duration;
                bookingSer.selected_price = data.selected_price;
                bookingSer.third_party_commission = data.third_party_commission;
                bookingSer.time_slot = data.start_time + '-' + data.end_time;
                const bookingSerData = bookingSer.save();
                promises.push(bookingSerData);
            });
            if (promises.length > 0) {
                await Promise.all(promises);
            }
        } catch (err) {
            console.log('error while BookingService', err);
        }

        try {
            const promises = [];
            createBookingDto.service_detail.forEach(data => {
                data.therapists?.forEach(userId => {
                    const bookingTherapist = new BookingTherapist();
                    bookingTherapist.booking_id = id;
                    bookingTherapist.service_id = data.service_id;
                    bookingTherapist.user_id = userId;
                    const bookingTherapistData = bookingTherapist.save();
                    promises.push(bookingTherapistData);
                });
                if (data?.optional_therapists) {
                    const bookingTherapistOptional = new BookingTherapist();
                    bookingTherapistOptional.booking_id = id;
                    bookingTherapistOptional.service_id = data.service_id;
                    bookingTherapistOptional.user_id = data.optional_therapists;
                    bookingTherapistOptional.is_optional_therapist = 'true';
                    const bookingTherapistOptionalData = bookingTherapistOptional.save();
                    promises.push(bookingTherapistOptionalData);
                }
            });
            if (promises.length > 0) {
                await Promise.all(promises);
            }
        } catch (err) {
            console.log('error while BookingTherapist', err);
        }

        try {
            const promises = [];
            createBookingDto.therapists_commission?.forEach(data => {
                const therapistCommission = new TherapistCommission();
                therapistCommission.booking_id = id;
                therapistCommission.user_id = data.id;
                therapistCommission.booking_date = createBookingDto.date_time;
                therapistCommission.commission = data.commission;
                const therapistCommissionData = therapistCommission.save();
                promises.push(therapistCommissionData);
            });
            if (promises.length > 0) {
                await Promise.all(promises);
            }
        } catch (err) {
            console.log('error while TherapistCommission', err);
        }

        if (createBookingDto?.product_detail?.length > 0) {
            try {
                const promises = [];
                createBookingDto.product_detail.forEach(productId => {
                    const bookingProduct = new BookingProduct();
                    bookingProduct.booking_id = id;
                    bookingProduct.product_id = productId.product_id;
                    bookingProduct.product_price = productId.product_price;
                    const bookingProductData = bookingProduct.save();
                    promises.push(bookingProductData);
                });

                if (promises.length > 0) {
                    await Promise.all(promises);
                }
            } catch (err) {
                console.log('error while BookingProduct', err);
            }
        }
        if (
            createBookingDto &&
            createBookingDto.is_driver_commission === 'true'
        ) {
            const taxiDriver = new TaxiDriver();
            taxiDriver.driver_commission = createBookingDto.driver_commission
                ? createBookingDto.driver_commission
                : '0';
            taxiDriver.booking_id = id;
            await taxiDriver.save();
        }
    }

    async createBookingTips(
        id: number,
        createBookingTipsDto: Array<CreateBookingTipsDto>,
    ) {
        try {
            const promises = [];
            createBookingTipsDto.forEach(data => {
                const bookingTherapistTips = new Tips();
                bookingTherapistTips.booking_id = id;
                bookingTherapistTips.tip_amount = data.tip_amount;
                bookingTherapistTips.user_id = data.user.id;
                bookingTherapistTips.payment_method = data.payment_method? data.payment_method : data.payment_method_card;
                const bookingTherapistTipsData = bookingTherapistTips.save();
                promises.push(bookingTherapistTipsData);
            });
            if (promises.length > 0) {
                await Promise.all(promises);
            }
        } catch (err) {
            console.log('error while create Booking Tips', err);
        }
    }

    async createBooking(
        customerID: number,
        createBookingDto: CreateBookingDto,
    ) {
        try {
            const booking = new Booking();
            booking.date_time = createBookingDto.date_time;
            booking.is_driver_commission =
                createBookingDto.is_driver_commission === 'true'
                    ? 'true'
                    : 'false';
            booking.is_other_commission =
                createBookingDto.is_other_commission === 'true'
                    ? 'true'
                    : 'false';
            booking.customer_id = customerID;
            booking.discount = createBookingDto.discount;
            booking.branch_id = createBookingDto.branch_id;
            booking.card_payment = createBookingDto.card_payment;
            booking.cash_payment = createBookingDto.cash_payment;
            booking.other_commission = createBookingDto.other_commission;
            booking.services_fee = createBookingDto.services_fee;
            booking.products_fee = createBookingDto.products_fee;
            booking.actual_services_fee = createBookingDto.actual_services_fee;
            booking.actual_products_fee = createBookingDto.actual_products_fee;
            booking.status = createBookingDto.status;
            booking.remarks = createBookingDto.remarks;
            const bookingData = await booking.save();
            this.createBookingAttached(bookingData.id, createBookingDto);

            const therapists = [];
            createBookingDto.service_detail.forEach(async a => {
                const promises = [];
                a.therapists?.forEach(d => {
                    if (!therapists.includes(d)) {
                        therapists.push(d);
                        const bookingTherapistTips = new Tips();
                        bookingTherapistTips.booking_id = bookingData.id;
                        bookingTherapistTips.tip_amount = 0;
                        bookingTherapistTips.user_id = d;
                        bookingTherapistTips.payment_method = 'cash';

                        const bookingTherapistTipsData = bookingTherapistTips.save();
                        promises.push(bookingTherapistTipsData);
                    }
                });
                if (promises.length > 0) {
                    await Promise.all(promises);
                }
            });

            return new BookingCreatedAndUpdatedResponseDto(bookingData);
        } catch (er) {
            console.log('error while createBooking', er);
            throw new HttpException(
                // 'error while createBooking.',
                er,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async findCustomer(phone: number) {
        const Op = sequelize.Op;
        try {
            const customer = await Customers.findAll({
                where: {
                    phone: {
                        [Op.like]: `%${phone}%`,
                    },
                },
            });
            return customer;
        } catch (er) {
            console.log('error while findCustomer', er);
        }
    }

    async findAll(request_branch_id: string, role: string) {
        let queryOptions: any = {
          include: [
            {
              model: BookingService,
              attributes: [
                'id',
                'service_id',
                'room_id',
                'selected_duration',
                'selected_price',
                'third_party_commission',
                'time_slot',
              ],
              required: true,
            },
            {
                model: Branch,
                attributes: ['name'],
                required: false,
            }
          ],
        };
      
        if (role === "superAdmin") {
          queryOptions = {
            include: queryOptions.include,
          };
        } else {
          queryOptions = {
            ...queryOptions,
            where: { branch_id: request_branch_id },
          };
        }
      
        const bookings: any = await this.BookingRepository.findAll<Booking>(queryOptions);
      
        return bookings.map((booking: Booking) => new BookingDto(booking, booking.branch?.name));
      }

    async create(createBookingDto: CreateBookingDto) {
        try {
            const customerExists = await Customers.findOne({
                where: {
                    phone: createBookingDto.customer_detail.phone,
                },
            });

            if (customerExists && customerExists.phone.length > 0) {
                const Data = this.createBooking(
                    customerExists.id,
                    createBookingDto,
                );
                return Data;
            } else {
                const customer = new Customers();
                const createCustomer = createBookingDto.customer_detail;
                customer.name = createCustomer.name;
                customer.email = createCustomer.email;
                customer.phone = createCustomer.phone;
                customer.dob = createCustomer.dob;
                customer.street_address = createCustomer.street_address;
                customer.city = createCustomer.city;
                customer.country = createCustomer.country;
                customer.postal_code = createCustomer.postal_code;
                customer.branch_id = createCustomer.branch_id;
                customer.state_name = createCustomer.state_name;
                customer.remarks = createCustomer.remarks;
                const customerData = await customer.save();

                const Data = this.createBooking(
                    customerData.id,
                    createBookingDto,
                );

                return Data;
            }
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async update(id: number, updateBookingDto: UpdateBookingDto) {
        const booking: any = await this.BookingRepository.findByPk<Booking>(id);

        if (!booking) {
            throw new HttpException('booking not found.', HttpStatus.NOT_FOUND);
        }

        try {
            await this.deleteAllBookingAttached(id);
            await this.createBookingAttached(id, updateBookingDto);
            await this.createBookingTips(id, updateBookingDto.tips);
            booking.date_time = updateBookingDto.date_time;
            booking.is_driver_commission =
                (updateBookingDto.is_driver_commission === 'true'
                    ? 'true'
                    : 'false') ||
                (booking.is_driver_commission === 'true' ? 'true' : 'false');
            booking.is_other_commission =
                (updateBookingDto.is_other_commission === 'true'
                    ? 'true'
                    : 'false') ||
                (booking.is_other_commission === 'true' ? 'true' : 'false');
            // booking.customer_id = updateBookingDto.cutomer_id;
            booking.discount = updateBookingDto.discount;
            booking.branch_id = updateBookingDto.branch_id || booking.branch_id;
            booking.card_payment = updateBookingDto.card_payment;
            booking.cash_payment = updateBookingDto.cash_payment;
            booking.other_commission = updateBookingDto.other_commission;
            booking.services_fee = updateBookingDto.services_fee;
            booking.products_fee = updateBookingDto.products_fee;
            booking.actual_services_fee = updateBookingDto.actual_services_fee;
            booking.actual_products_fee = updateBookingDto.actual_products_fee;

            booking.status = updateBookingDto.status;
            booking.remarks = updateBookingDto.remarks;

            const data = await booking.save();
            try {
                const customer = await Customers.findByPk<Customers>(
                    booking.customer_id,
                );
                const createCustomer = updateBookingDto.customer_detail;
                customer.name = createCustomer.name || customer.name;
                customer.email = createCustomer.email || customer.email;
                customer.phone = createCustomer.phone || customer.phone;
                customer.dob = createCustomer.dob || customer.dob;
                customer.street_address =
                    createCustomer.street_address || customer.street_address;
                customer.city = createCustomer.city || customer.city;
                customer.country = createCustomer.country || customer.country;
                customer.postal_code =
                    createCustomer.postal_code || customer.postal_code;
                customer.branch_id =
                    createCustomer.branch_id || customer.branch_id;
                customer.state_name =
                    createCustomer.state_name || customer.state_name;
                customer.remarks = createCustomer.remarks || customer.remarks;
                await customer.save();
            } catch (err) {
                console.log('error while UpdateCustomer', err);
            }
            return new BookingCreatedAndUpdatedResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateStatus(
        id: number,
        updateBookingStatusDto: UpdateBookingStatusDto,
    ) {
        const booking: any = await this.BookingRepository.findByPk<Booking>(id);

        if (!booking) {
            throw new HttpException('booking not found.', HttpStatus.NOT_FOUND);
        }

        try {
            booking.status = updateBookingStatusDto.status;
            booking.cash_payment = updateBookingStatusDto.cash_payment;
            booking.card_payment = updateBookingStatusDto.card_payment;
            const data = await booking.save();
            return new BookingCreatedAndUpdatedResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: number) {
        await this.deleteAllBookingAttached(id);
        const booking = await this.BookingRepository.destroy({
            where: {
                id,
            },
        });
        return booking;
    }
}
