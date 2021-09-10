export interface iUser {
  username: string;
  password: string;
  alias: string;
  phone: string;
}

export class UserClass implements iUser {
  constructor (public username: string, public password: string, public alias: string, public phone: string) {
    this.username = username;
    this.password = password;
    this.alias = alias;
    this.phone = phone;
  }

  public toString(): string {
    return this.username
  }
}