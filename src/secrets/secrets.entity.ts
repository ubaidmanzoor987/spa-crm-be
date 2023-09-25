import { Visits } from '../../src/visits/visits.entity';
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    HasMany,
} from 'sequelize-typescript';

@Table({
    tableName: 'secrets',
})
export class Secrets extends Model<Secrets> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column
    secret_code: string;

    @Column
    secret_key: string;

    @Column
    campaign_email: string;

    @HasMany(() => Visits)
    visits: Visits[];

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    // @DeletedAt
    // @Column({ field: 'deleted_at' })
    // deletedAt: Date;
}
