import { Product } from './products.entity';

export const ProductsProviders = [{ provide: 'ProductRepository', useValue: Product }];
