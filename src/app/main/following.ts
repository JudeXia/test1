import { Profile } from '../profile';

export class Following {
  constructor(
    public displayName: string = null,
    public avatar: string = null,
    public headline: string = null,
    public id: string = null
  ) {}
}
