import { Picture } from "./Picture";

export class Saying {
    id: string;
    content: string;
    sayingDate: Date;
    pictures: Picture[];

    constructor() {
        this.pictures = [];
    }
}