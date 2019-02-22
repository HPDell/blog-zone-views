export interface UserState {
  user: string;
  canEdit: boolean;
  token: string;
}

let state: UserState = {
  user: "unknown",
  canEdit: false,
  token: ""
};

export default state;
