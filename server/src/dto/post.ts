export class PostDTO {
  id?: number;
  title: string;
  content: string;
  published = 0;
  tags?: any[] | any;
  categories?: any[] | any;
  author?: any;
  [key: string]: any;
}
