import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    BelongsTo,
    ForeignKey,
    AllowNull,
} from 'sequelize-typescript';
import { Amenitie } from '../../src/amenities/amenities.entity';
import { Service } from '../../src/services/services.entity';

@Table({
    tableName: 'servicesamenities',
})
export class ServicesAmenities extends Model<ServicesAmenities> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @BelongsTo(() => Service)
    service: Service;
    @ForeignKey(() => Service)
    @AllowNull(false)
    @Column({
        field: 'service_id',
        type: DataType.INTEGER,
    })
    serviceId: number;

    @BelongsTo(() => Amenitie)
    amenitie: Amenitie;
    @ForeignKey(() => Amenitie)
    @AllowNull(false)
    @Column({
        field: 'amenitie_id',
        type: DataType.INTEGER,
    })
    amenitieId: number;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

}
