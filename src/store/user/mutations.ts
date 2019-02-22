import { UserState } from "./state";
import { UserInfo } from "../../model/UserInfo";

export function updateUser (state: UserState, userInfo: UserInfo) {
    state.user = userInfo.name;
    state.token = userInfo.token;
    state.canEdit = true;
}

export function logout (state: UserState) {
    state.user = "unknown";
    state.token = "";
    state.canEdit = false;
}