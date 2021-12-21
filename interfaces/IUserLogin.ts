export default interface IUserLogin {
  email: string;
  id_users: number;
  origin: string;
  roleId: Array<string>;
  iat: number;
}
