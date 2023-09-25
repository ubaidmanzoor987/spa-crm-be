import {
    IsString,
    IsNumber,
    IsNotEmpty,
    IsArray,
    IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {

    @ApiProperty()
    readonly product_id: number;

    @ApiProperty()
    readonly product_price: number;

}
export class CreateBookingTipsDto {

    @ApiProperty()
    readonly tip_amount: number;

    @ApiProperty()
    @IsString()
    readonly user: any;

    @ApiProperty()
    @IsString()
    readonly payment_method: string;

    @ApiProperty()
    @IsString()
    readonly payment_method_card: string;
    

}

export class CreateTherapistCommissionDto {
    @ApiProperty()
    readonly commission: string;

    @ApiProperty()
    readonly id: string;
}

export class CreateBookingTherapistDto {
    @ApiProperty()
    @IsString()
    readonly booking_id: string;

    @ApiProperty()
    @IsString()
    readonly service_id: string;

    @ApiProperty()
    @IsArray()
    readonly user_ids: Array<string>;

}
export class CreateBookingServiceDto {
    @ApiProperty()
    @IsString()
    readonly booking_id: string;

    @ApiProperty()
    @IsString()
    readonly service_id: string;

    @ApiProperty()
    @IsString()
    readonly room_id: string;

    @ApiProperty()
    @IsString()
    readonly third_party_commission: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly selected_duration: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly selected_price: number;

    @ApiProperty()
    @IsArray()
    readonly therapists: Array<string>;

    @ApiProperty()
    @IsArray()
    // readonly optional_therapists: Array<string>;
    readonly optional_therapists: string;

    @ApiProperty()
    @IsString()
    readonly start_time: string;

    @ApiProperty()
    @IsString()
    readonly end_time: string;


}
export class CreateCustomerDto {
    @ApiProperty()
    @IsString()
    readonly name: string;

    @ApiProperty()
    @IsString()
    readonly email: string;

    @ApiProperty()
    @IsString()
    readonly phone: string;

    @ApiProperty()
    @IsString()
    readonly dob: string;

    @ApiProperty()
    @IsString()
    readonly street_address: string;

    @ApiProperty()
    @IsString()
    readonly city: string;

    @ApiProperty()
    @IsString()
    readonly country: string;

    @ApiProperty()
    @IsString()
    readonly postal_code: string;

    @ApiProperty()
    @IsString()
    readonly branch_id: number;

    @ApiProperty()
    @IsString()
    readonly state_name: string;

    @ApiProperty()
    @IsString()
    readonly remarks: string;
}


export class UpdateBookingDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty()
    @IsNotEmpty()
    readonly date_time: Date;

    @ApiProperty()
    // @IsNotEmpty()
    @IsString()
    readonly is_driver_commission: string;

    @ApiProperty()
    // @IsNotEmpty()
    @IsString()
    readonly is_other_commission: string;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    readonly discount: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly branch_id: number;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    readonly card_payment: string;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    readonly services_fee: number;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    readonly products_fee: number;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    readonly actual_services_fee: number;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    readonly actual_products_fee: number;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    readonly cash_payment: string;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    readonly other_commission: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly status: string;

    @ApiProperty()
    // @IsNotEmpty()
    // @IsString()
    readonly remarks: string;

    @ApiProperty()
    // @IsString()
    readonly driver_commission: string;

    @ApiProperty({ type: CreateCustomerDto })
    @IsNotEmpty()
    customer_detail:CreateCustomerDto;

    @ApiProperty({ type: [CreateBookingServiceDto] })
    @IsNotEmpty()
    @IsArray()
    service_detail: Array<CreateBookingServiceDto>;

    @ApiProperty({ type: [CreateBookingTipsDto] })
    @IsNotEmpty()
    @IsArray()
    tips: Array<CreateBookingTipsDto>;

    // @ApiProperty()
    // @IsArray()
    // product_detail: Array<number>;

    @ApiProperty({ type: [CreateProductDto] })
    // @IsNotEmpty()
    @IsArray()
    product_detail: Array<CreateProductDto>;

    @ApiProperty({ type: [CreateTherapistCommissionDto] })
    @IsOptional()
    @IsArray()
    therapists_commission: Array<CreateTherapistCommissionDto>;

}
