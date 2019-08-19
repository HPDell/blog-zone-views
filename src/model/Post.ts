import { Tag } from "./Tag";
import { Category } from "./Category";
import { Comment } from "./Comment";

export class Post {
    id: string;
    title: string;
    content: string;
    tags: Tag[];
    category: Category = new Category();
    cover: string;
    comments: Comment[];

    constructor() {
        this.tags = [];
    }
}