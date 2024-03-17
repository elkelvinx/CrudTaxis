export class Admin {
  constructor(
    public id: number = 0,
    public name: string = '',
    public lm1: string = '',
    public lm2: string = '',
    public phone: number = 0,
    public st1: number = 0,
    public st2: number = 0,
    public st3: number = 0,
    public settlement: number = 0,
    public extNumber: number = 0,
    public birthDate: Date = new Date('1900-01-01'),
    public birthS: string = '',
    public registerD: Date = new Date(),
    public lastModDate: Date = new Date(),
    public mail: string = '',
    public street1: string = '',
    public street2: string = '',
    public street3: string = '',
    public settlementS: string = '',
  ) { }
};