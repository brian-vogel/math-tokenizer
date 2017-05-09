import { TokenType } from './tokenType';

export class Token {
  public type: TokenType;
  public value: string;

  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}