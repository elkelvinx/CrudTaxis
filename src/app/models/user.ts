//* used in the LogInComponent
export class userLogIn {
    constructor
        (
            public name: string = 'leo',
            public password: string = 'prueba',
        ) {
    }
}
//* used to recive the token from the server
export class userResponse{
    constructor
    (
        public Token: string = '',
        public IsSuccess:boolean= false,
        public ErrorMessage: string= ''
    ){}
}
export interface RolesNames{
   id: number;
   name:string;
}
//! Classes for the CRUD of the user
//* used to get,update a user
export class user {
    constructor
        (
            public id: number = 0,
            public name: string = '',
            public email: string = 'elkelvin484@gmail.com',
            public dateCreated: Date = new Date(),
           //! public password: string = 'de pelos', PELIGROSO TENER ESTE DATO 
           public password: string = 'CONTRASEÑA DEFAULT',
        ) {

    }
}
//! we wont delete any user just not show them
export class userPermission{
    constructor
        (
            public id: number = 0,
            public idUser: number = 0,
            public idRole: number = 1,
            public roleName: string = '',
            public driver: boolean = false,
            public admin: boolean = false,
            public permissionaire: boolean = false,
            public unit: boolean = false,
            public sinister: boolean = false,
            public extraData: boolean = false,
            public pdf: boolean = false,
        ) {

    }
}
//* used to insert a new user
export class userInsert{
    constructor
    (
        public name: string = 'leo',
        public email: string = 'elkelvin484@gmail.com',
        public dateCreated: Date = new Date('2024-01-01'),
        public idRole: number = 0,
        public driver: boolean = false,
        public admin: boolean = false,
        public permissionaire: boolean = false,
        public unit: boolean = false,
        public sinister: boolean = false,
        public extraData: boolean = false,
        public pdf: boolean = false,
    ){}
}
export class UserModification{
    constructor
    (
        public User:user= new user(),
        public Permissions:userPermission = new userPermission()
    ){}
}