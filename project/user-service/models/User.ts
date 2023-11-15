class User {
  id: Number;
  username: String;
  password: String;
  isAdmin: Boolean;

  constructor(id: Number, username: String, password: String, isAdmin: Boolean) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}

export default User;
