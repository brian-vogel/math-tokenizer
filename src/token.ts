export class Token {
  public type: string;
  public value: string;

  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}