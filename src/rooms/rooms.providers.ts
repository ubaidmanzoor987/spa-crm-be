import { Room } from './rooms.entity';

export const RoomsProviders = [{ provide: 'RoomRepository', useValue: Room }];
