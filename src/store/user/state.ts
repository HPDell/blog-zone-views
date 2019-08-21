export interface UserState {
  id: string;
  user: string;
  canEdit: boolean;
  canComment: boolean;
  token: string;
  avatar: string
}

let state: UserState = {
  id: "",
  user: "unknown",
  canEdit: false,
  canComment: false,
  token: "",
  avatar: ""
};

export default state;
