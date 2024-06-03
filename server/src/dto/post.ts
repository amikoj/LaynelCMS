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

export class CategoryDTO {
  id?: number;
  name: string;
  pid: number;
  desc?: string;
  [key: string]: any;
}
