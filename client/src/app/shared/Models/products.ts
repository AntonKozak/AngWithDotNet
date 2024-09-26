import { Photo } from './photo';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
  quantityInStock: number;
  isMain: boolean;
  url: string;
  photos: Photo[];
}
