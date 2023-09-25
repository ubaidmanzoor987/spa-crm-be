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
import { Permission } from '../../src/permissions/permissions.entity';
import { RoleUser } from '../../src/roleUser/roleUser.entity';

@Table({
    tableName: 'rolepermissions',
})
export class RolePermissions extends Model<RolePermissions> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @BelongsTo(() => Permission)
    permission: Permission;
    @ForeignKey(() => Permission)
    @AllowNull(false)
    @Column({
        field: 'permission_id',
        type: DataType.INTEGER,
    })
    permission_id: number;


    @BelongsTo(() => RoleUser)
    user_role: RoleUser;
    @ForeignKey(() => RoleUser)
    @Column({
        field: 'user_role_id',
        type: DataType.INTEGER,
    })
    user_role_id: string;

    @Column
    is_allowed: string;
    
    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

}
