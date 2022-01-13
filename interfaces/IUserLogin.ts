export default interface IUserLogin {
  email: string;
  id_user: number;
  origin: string;
  roleId: Array<string>;
  iat: number;
}
