export default class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public profile: string,
    public dateOfBirth: string,
    public phone: string,
    public bio: string,
    public website: string,
    public youtube: string,
    public twitter: string,
    public facebook: string,
    public linkdin: string,
    public enableChatNotification: boolean,
    public enableChatSound: boolean,
    public password: string
  ) {}
}
