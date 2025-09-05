  export const rolesNames = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Guest' }
  ];
  export const DMLs: string[]= [
    "INSERT",
    "UPDATE",
    "DELETE",   
    "EXECUTING ERROR",
    "CLOSED CONNECTION",
  ];
  //extructura de DML
  export class DMLBase {
    constructor(
      public id: number,
      public name: string,

    ){}
  }
  //DML NAME WITH NAMES
  export const DML: DMLBase[] = [
    new DMLBase(1, "INSERT"),
    new DMLBase(2, "UPDATE"),
    new DMLBase(3, "DELETE"),
    new DMLBase(69, "CLOSED CONNECTION"),
    new DMLBase(999, "EXECUTING ERROR")
  ];

export const URL= "https://apitaxi-h8ggbzarbkacf0e2.centralus-01.azurewebsites.net/api/";