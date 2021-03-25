/*
This model stores all the core data that makes up a user even helps us with validating whether token is still valid
 */

export class User {
  constructor(
    public email: string,
    public id: string,
    private privateToken: string,
    private privateTokenExpirationDate: Date)
  {}

  token(): string | null {
    if (!this.privateToken || new Date() > this.privateTokenExpirationDate) {
      return null;
    }
    return this.privateToken;
  }

}
