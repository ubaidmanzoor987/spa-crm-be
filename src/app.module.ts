import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { ServiceModule } from './services/services.module';
import { RoomsModule } from './rooms/rooms.module';
import { AmenitiesModule } from './amenities/amenities.module';
import { BranchModule } from './branch/branch.module';
import { CurrencyModule } from './currency/currency.module';
import { BookingsModule } from './bookings/bookings.module';
import { PermissionModule } from './permissions/permissions.module';
import { ProductsModule } from './products/products.module';
// import { AdminCheckMiddleware } from './common/middleware/admin-check.middleware';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { RoleUserModule } from './roleUser/roleUser.module';
import { RolePermissionModule } from './rolePermissions/rolePermissions.module';
import { VisitsModule } from './visits/visits.module';
import { SecretsModule } from './secrets/secrets.module';
import { LeadsModule } from './leads/leads.module';

@Module({
    imports: [
        UsersModule,
        BranchModule,
        CurrencyModule,
        SharedModule,
        ServiceModule,
        RoomsModule,
        AmenitiesModule,
        BookingsModule,
        PermissionModule,
        ProductsModule,
        RoleUserModule,
        RolePermissionModule,
        VisitsModule,
        SecretsModule,
        LeadsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

// export class AppModule implements NestModule {
//     configure(consumer: MiddlewareConsumer) {
//       consumer
//         .apply(AdminCheckMiddleware)
//         .forRoutes({ path: '*', method: RequestMethod.ALL });
//     }
//   }
