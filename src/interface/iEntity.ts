export interface iEntity {
  name: string;
  quantity: number;
  description: string;
  fors: string[];
}

export class EntityClass implements iEntity {
  constructor (public name: string, public quantity: number, public description: string, public fors: string[]) {
    this.name = name;
    this.quantity = quantity;
    this.description = description;
    this.fors = [...fors];
  }

  public toString(): void {
    console.log(`${this.name} ${this.quantity} cho ${this.fors.map(ele => ele + ",")}`)
  }
}