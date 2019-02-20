import { Tag } from "./Tag";
import { Category } from "./Category";

export class Post {
    id: number;
    title: string;
    content: string;
    tags: Tag[];
    category: Category;
    cover: string;

    constructor() {
        this.tags = [];
        this.category = new Category();
    }
}