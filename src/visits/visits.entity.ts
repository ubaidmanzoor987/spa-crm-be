import { Branch } from '../../src/branch/branch.entity';
import { Secrets } from '../../src/secrets/secrets.entity';
import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsTo,
    ForeignKey,
    AllowNull,
} from 'sequelize-typescript';

@Table({
    tableName: 'visits',
})
export class Visits extends Model<Visits> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column
    visit_phone_number: string;

    @BelongsTo(() => Branch)
    branch: Branch;
    @ForeignKey(() => Branch)
    @Column({
        field: 'branch_id',
        type: DataType.INTEGER,
        onUpdate: 'CASCADE',
    })
    branch_id: number;

    @Column
    visit_id: string;

    @Column
    visit_date: string;

    @Column
    visit_time: string;

    @Column
    social_platform: string;

    @Column
    action_performed: string;

    @BelongsTo(() => Secrets)
    secrets: Secrets;
    @ForeignKey(() => Secrets)
    @AllowNull(false)
    @Column({
        field: 'secret_id',
        type: DataType.INTEGER,
    })
    secret_id: number;

    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

    //     @DeletedAt
    //     @Column({ field: 'deleted_at' })
    //     deletedAt: Date;
}
