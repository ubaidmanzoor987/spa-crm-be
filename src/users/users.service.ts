import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './user.entity';
import { genSalt, hash, compare } from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { UserLoginRequestDto } from './dto/user-login-request.dto';
import { CreateStaffDto, CreateUserDto } from './dto/create-user.dto';
import { UserLoginResponseDto } from './dto/user-login-response.dto';
import { JwtPayload } from './auth/jwt-payload.model';
import { sign } from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from './../shared/config/config.service';
import { UserResponseDto } from './dto/user-response.dto';
import { Branch } from '../../src/branch/branch.entity';
import { Roles } from '../../src/shared/enum/roles';
import { adminUser, superAdminUser } from '../../src/shared/initialUsers/initials';

@Injectable()
export class UsersService {
    private readonly jwtPrivateKey: string;

    constructor(
        @Inject('UsersRepository')
        private readonly usersRepository: typeof User,
        private readonly configService: ConfigService,
    ) {
        this.jwtPrivateKey = this.configService.jwtConfig.privateKey;
    }

    async findAll(request_branch_id: string, role: string) {
        const queryOptions = role === "superAdmin" ? {
            include: [
                {
                    model: Branch,
                    attributes: ['name'],
                    required: false,
                },
            ],
        } : { where: { branch_id: request_branch_id } };
        const users = await this.usersRepository.findAll<User>(queryOptions);
        return users.map(user => new UserDto(user, user.branch?.name));
    }

    async findAllTherapists() {
        const users = await this.usersRepository.findAll<User>({
            where: {
                role: Roles.therapist,
            },
        });
        return users.map(user => new UserDto(user));
    }

    async getUserByEmail(email: string) {
        return await this.usersRepository.findOne<User>({
            where: { email },
        });
    }

    async create(createUserDto: CreateUserDto) {
        const initialUser = await this.getUserByEmail(createUserDto.email.trim().toLowerCase());
        if (initialUser?.email) {
            throw new HttpException(
                'Email already Exists.',
                HttpStatus.BAD_REQUEST,
            );
        }

        try {
            const user = new User();
            user.email = createUserDto.email.trim().toLowerCase();
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;
            user.gender = createUserDto.gender;
            user.dob = createUserDto.dob;
            user.role = createUserDto.role;
            user.branch_id = createUserDto.branch_id;
            user.phone = createUserDto.phone;
            user.department = createUserDto.department;
            user.salary = createUserDto.salary;
            user.presentAddress = createUserDto.presentAddress;
            user.permanentAddress = createUserDto.permanentAddress;
            user.passport = createUserDto.passport;
            user.idCard = createUserDto.idCard;
            user.commission_per_service = createUserDto.commission_per_service;
            user.profile_picture = createUserDto.profile_picture;

            const salt = await genSalt(10);
            user.password = await hash(createUserDto.password, salt);

            const userData = await user.save();

            // when registering then log user in automatically by returning a token
            const token = await this.signToken(userData);
            return new UserLoginResponseDto(userData, token);
        } catch (err) {
            // if (err.original.constraint === 'user_email_key') {
            //     throw new HttpException(
            //         `User with email '${err.errors[0].value}' already exists`,
            //         HttpStatus.CONFLICT,
            //     );
            // }

            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async login(userLoginRequestDto: UserLoginRequestDto) {
        const email = userLoginRequestDto.email;
        const password = userLoginRequestDto.password;
        const initialUser = await this.getUserByEmail('crm@admin.com');
        if (!initialUser) {

            try {
                const branch = new Branch();
                branch.name = 'iniial Branch';
                branch.address = '';
                branch.phone = '';
                branch.image = '';
                branch.default_currency = 'USD';
                await branch.save();
            } catch (err) {
                throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
            }
            await this.create(adminUser);
        }
        const superAdmin = await this.getUserByEmail('crm@superadmin.com');
        if (!superAdmin) {
            await this.create(superAdminUser);
        }
        const user = await this.getUserByEmail(email);
        if (!user) {
            throw new HttpException(
                'Invalid email or password.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const isMatch = await compare(password, user.password);
        if (!isMatch) {
            throw new HttpException(
                'Invalid email or password.',
                HttpStatus.BAD_REQUEST,
            );
        }

        const token = await this.signToken(user);
        return new UserLoginResponseDto(user, token);
    }

    async update(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.usersRepository.findByPk<User>(
            updateUserDto.id,
        );
        if (!user) {
            throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
        }

        user.firstName = updateUserDto.firstName || user.firstName;
        user.lastName = updateUserDto.lastName || user.lastName;
        user.gender = updateUserDto.gender || user.gender;
        user.dob = updateUserDto.dob || user.dob;
        user.role = updateUserDto.role || user.role;
        user.branch_id = updateUserDto.branch_id || user.branch_id;
        user.phone = updateUserDto.phone || user.phone;
        user.department = updateUserDto.department || user.department;
        user.salary = updateUserDto.salary || user.salary;
        user.presentAddress =
            updateUserDto.presentAddress || user.presentAddress;
        user.permanentAddress =
            updateUserDto.permanentAddress || user.permanentAddress;
        user.passport = updateUserDto.passport || user.passport;
        user.idCard = updateUserDto.idCard || user.idCard;
        user.commission_per_service =
            updateUserDto.commission_per_service || user.commission_per_service;
        user.profile_picture =
            updateUserDto.profile_picture || user.profile_picture;

        try {
            const data = await user.save();
            return new UserResponseDto(data);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async delete(id: string) {
        const user = await this.usersRepository.findByPk<User>(id);
        await user.destroy();
        return new UserResponseDto(user);
    }

    async finduser(role: Roles, request_branch_id) {
        const users = await this.usersRepository.findAll<User>({
            where: {
                role, branch_id: request_branch_id,
            },
        });
        return users.map(user => new UserDto(user));
    }

    async addStaff(createUserDto: CreateStaffDto) {

        const initialUser = await this.getUserByEmail(createUserDto.email
            ? createUserDto.email.trim().toLowerCase()
            : null);

        if (initialUser?.email) {
            throw new HttpException(
                'Email already Exists.',
                HttpStatus.BAD_REQUEST,
            );
        }
        const salt = await genSalt(10);

        try {
            const user = new User();
            user.email = createUserDto.email
                ? createUserDto.email.trim().toLowerCase()
                : null;
            user.firstName = createUserDto.firstName;
            user.lastName = createUserDto.lastName;
            user.gender = createUserDto.gender;
            user.dob = createUserDto.dob;
            user.role = Roles.therapist,
                user.branch_id = createUserDto.branch_id;
            user.phone = createUserDto.phone;
            user.department = createUserDto.department;
            user.salary = createUserDto.salary;
            user.presentAddress = createUserDto.presentAddress;
            user.permanentAddress = createUserDto.permanentAddress;
            user.passport = createUserDto.passport;
            user.idCard = createUserDto.idCard;
            user.commission_per_service = createUserDto.commission_per_service;
            user.profile_picture = undefined;
            user.profile_picture = createUserDto.profile_picture;

            // const salt = await genSalt(10);
            // user.password = await hash(createUserDto.password, salt);
            const userData = await user.save();

            return new UserResponseDto(userData);
        } catch (err) {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async signToken(user: User) {
        const payload: JwtPayload = {
            email: user.email,
            role: user.role
        };

        return sign(payload, this.jwtPrivateKey, {});
    }
}
