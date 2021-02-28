export class Ingredient {
  constructor(public name: string, public amount: number) {}
}
/* Это короткая запись варианта.

export class Ingredient {
  public name: string;
  public amount: number;

  constructor(name: string, amount: number) {
    this.name = name;
    this.amount = amount;
  }
}

Такой способ записи называется TypeScript’s constructor shorthand
Этот shorthand именно тайпскриптовый и в чистом JavaScript не сработает.
*/


