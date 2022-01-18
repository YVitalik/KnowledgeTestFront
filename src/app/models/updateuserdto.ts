export class UpdateUserDto {
    constructor(public userId: string, public username: string,
                public email: string, public password: string) { }
}