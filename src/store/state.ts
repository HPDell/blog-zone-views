import { UserState } from "./user/state";
import { Category } from "../model/Category";

/*
* If not building with SSR mode, you can
* directly export the Store instantiation
*/

export interface StoreState {
    categories: Category[];
}

let state: StoreState = {
    categories: []
}

export default state;