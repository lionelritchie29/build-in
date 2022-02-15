export type CartItem = {
  id: string;
  categoryId: string | number;
  subCategoryId: string;
  type:
    | 'architecture'
    | 'interior'
    | 'furniture'
    | 'material'
    | 'other'
    | 'accesories';
  quantity: number;
  image: string;
  price: number;
  name: string;
};
