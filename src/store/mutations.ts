import { StoreState } from "./state";
import { Category } from "../model/Category";

export function setCategories(state: StoreState, categories: Category[]) {
    state.categories = categories;
}