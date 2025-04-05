export class Chat {
  constructor(
    public id?: string,
    public senderId?: string,
    public receiverId?: string,
    public message?: string,
    public timestamp: Date = new Date(),
    public seen?: boolean
  ) {}
}
