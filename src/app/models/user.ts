export class user {
    constructor
        (
            public id: number = 0,
            public name: string = 'leo',
            public email: string = 'elkelvin484@gmail.com',
            public role: string = '',//Alomejor lo quito
            public dateCreated: Date = new Date('2024-01-01'),
            public password: string = 'de pelos',
        ) {

    }
}
export class userLogIn {
    constructor
        (
            public name: string = 'leo',
            public password: string = 'de pelos',
        ) {
    }
}
export class userResponse{
    constructor
    (
        public Token: string = '',
        public IsSuccess:boolean= false,
        public ErrorMessage: string= ''
    ){}
}
export class userPermissions{
    constructor
    (
        public Token: string = '',
        public IsSuccess:boolean= false,
        public ErrorMessage: string= ''
    ){}
}