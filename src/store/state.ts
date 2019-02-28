import { UserState } from "./user/state";
import { Category } from "../model/Category";
import { Tag } from "../model/Tag";

/*
* If not building with SSR mode, you can
* directly export the Store instantiation
*/

export interface StoreState {
    categories: Category[];
    tags: Tag[];
}

let state: StoreState = {
    categories: [],
    tags: []
}

export default state;