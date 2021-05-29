import { Store } from './store.model';

export interface Product {
  _id: string;
  name: string;
  category: string;
  description: number;
  available_quantity: number;
  store: string | Store;
}
