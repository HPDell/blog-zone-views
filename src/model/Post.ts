import { Tag } from "./Tag";
import { Category } from "./Category";

export class Post {
    id: string;
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