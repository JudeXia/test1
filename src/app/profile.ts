export class Profile {
  constructor(
    public userId: number = null,
    public username: string = null,
    public displayName: string = null,
    public email: string = null,
    public phone: string = null,
    public birthday: string = null,
    public zipcode: string = null,
    public avatar: string = null,
    public headline: string = null
  ) { }
}
