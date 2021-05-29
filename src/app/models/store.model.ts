export interface Store {
  products?: any[];
  users?: [
    {
      _id: string;
      email: string;
    }
  ];
  _id?: string;
  name: string;
  location: string;
  phone: number;
}
