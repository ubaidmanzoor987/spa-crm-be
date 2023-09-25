import {
    Table,
    Column,
    Model,
    DataType,
    CreatedAt,
    UpdatedAt,
    HasMany,
} from 'sequelize-typescript';
import { RolePermissions } from '../../src/rolePermissions/rolePermissions.entity';
import { User } from '../../src/users/user.entity';


@Table({
    tableName: 'roleuser',
})
export class RoleUser extends Model<RoleUser> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column
    role_name: string;

    @Column
    role_description: string;

    // @HasMany(() => User)
    // user: User[];

    @HasMany(() => RolePermissions)
    rolePermissions: RolePermissions[];
    
    @CreatedAt
    @Column({ field: 'created_at' })
    createdAt: Date;

    @UpdatedAt
    @Column({ field: 'updated_at' })
    updatedAt: Date;

}
