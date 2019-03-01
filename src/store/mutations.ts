import { StoreState } from "./state";
import { Category } from "../model/Category";
import { Tag } from "../model/Tag";

export function setCategories(state: StoreState, categories: Category[]) {
    state.categories = categories;
}

export function setTags(state: StoreState, tags: Tag[]) {
    state.tags = tags;
}