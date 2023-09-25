import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { User } from './../users/user.entity';
import { Currency } from './../currency/currency.entity';
import { ConfigService } from './../shared/config/config.service';
import { Service } from '../../src/services/services.entity';
import { Branch } from '../../src/branch/branch.entity';
import { Room } from '../../src/rooms/rooms.entity';
import { Amenitie } from '../../src/amenities/amenities.entity';
import { RoomsAmenities } from '../../src/roomsAmenities/roomsAmenities.entity';
import { ServicesAmenities } from '../../src/servicesAmenities/servicesAmenities.entity';
import { Booking } from '../../src/bookings/bookings.entity';
import { Customers } from '../../src/customers/customers.entity';
import { BookingService } from '../../src/bookingServices/bookingServices.entity';
import { BookingTherapist } from '../../src/bookingTherapist/bookingTherapist.entity';
import { TaxiDriver } from '../../src/taxiDriver/taxiDriver.entity';
import { Tips } from '../../src/tips/tips.entity';
import { Permission } from '../../src/permissions/permissions.entity';
import { RolePermissions } from '../../src/rolePermissions/rolePermissions.entity';
import { Product } from '../../src/products/products.entity';
import { BookingProduct } from '../../src/bookingProduct/bookingProducts.entity';
import { TherapistCommission } from '../../src/therapistCommission/therapistCommission.entity';
import { RoleUser } from '../../src/roleUser/roleUser.entity';
import { Visits } from '../../src/visits/visits.entity';
import { Secrets } from '../../src/secrets/secrets.entity';
import { Leads } from '../../src/leads/leads.entity';

console.log("databaseProviders")
export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(
                configService.sequelizeOrmConfig as SequelizeOptions,
            );
            sequelize.addModels([
                User,
                Currency,
                Service,
                Branch,
                Room,
                Amenitie,
                Booking,
                Customers,
                TaxiDriver,
                Tips,
                Permission,
                RolePermissions,
                Product,
                BookingTherapist,
                RoomsAmenities,
                ServicesAmenities,
                BookingService,
                TherapistCommission,
                RoleUser,
                BookingProduct,
                Secrets,
                Visits,
                Leads
            ]);
            try {
                await sequelize.authenticate();
                console.log('Connection Estalished');
                await sequelize.sync({ alter: false });
            } catch (error) {
                console.log('db error', error);
            }
            return sequelize;
        },
        inject: [ConfigService],
    },
];
