export class user {
    constructor
        (
            public id: number = 0,
            public name: string = '',
            public email: string = '',
            public role: string = '',//Alomejor lo quito
            public dateCreated: Date = new Date('2024-01-01'),
            public password: string = '',
        ) {

    }
}