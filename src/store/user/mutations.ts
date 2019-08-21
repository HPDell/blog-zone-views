import { UserState } from "./state";
import { UserInfo } from "../../model/UserInfo";

export function updateUser (state: UserState, userInfo: UserInfo) {
    state.id = userInfo.id;
    state.user = userInfo.name;
    state.token = userInfo.token;
    state.canEdit = userInfo.canEdit;
    state.canComment = userInfo.canComment;
    state.avatar = userInfo.avatar;
}

export function logout (state: UserState) {
    state.user = "unknown";
    state.token = "";
    state.canEdit = false;
}