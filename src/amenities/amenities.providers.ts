import { Amenitie } from './amenities.entity';

export const AmenitiesProviders = [{ provide: 'AmenitieRepository', useValue: Amenitie }];
