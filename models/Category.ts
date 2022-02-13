import { SubCategory } from './SubCategory';

export type Category = {
  id: number | string;
  title: string;
  image: string;
  sub_categories: SubCategory[];
};
