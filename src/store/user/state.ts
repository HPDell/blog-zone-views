export interface UserState {
  user: string;
  canEdit: boolean;
  token: string;
  avatar: string
}

let state: UserState = {
  user: "unknown",
  canEdit: false,
  token: "",
  avatar: ""
};

export default state;
