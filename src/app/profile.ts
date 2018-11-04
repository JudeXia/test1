export class Profile {
  constructor(
    public userId: number,
    public accountName: string,
    public displayName: string,
    public email: string,
    public phoneNumber: string,
    public birthday: string,
    public zipcode: string,
    public password: string,
    public avatar: string,
    public headline: string
  ) { }
}
