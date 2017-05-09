import { Token } from './token';
import { TokenType } from './tokenType';

export class Tokenizer {

  private tokens: Token[];
  private letterBuffer: string[];
  private numberBuffer: string[];

  constructor() { }

  tokenize(str: string) {
    this.tokens = [];
    this.letterBuffer = [];
    this.numberBuffer = [];

    let splitStrings = str.replace(' ', '').split('');
    for (let char of splitStrings) {

      if (this.isDigit(char)) {
        this.numberBuffer.push(char);
      } else if (this.isDecimalPoint(char)) {
        this.numberBuffer.push(char);
      } else if (this.isLetter(char)) {
        if (this.numberBuffer.length) {
          this.emptyNumberBufferAsLiteral();
          this.tokens.push(new Token(TokenType.Operator, '*'));
        }
        this.letterBuffer.push(char);
      } else if (this.isOperator(char)) {
        this.emptyNumberBufferAsLiteral();
        this.emptyLetterBufferAsVariables();
        this.tokens.push(new Token(TokenType.Operator, char));
      } else if (this.isLeftParenthesis(char)) {
        if (this.letterBuffer.length) {
          this.tokens.push(new Token(TokenType.Function, this.letterBuffer.join("")));
          this.letterBuffer = [];
        } else if (this.numberBuffer.length) {
          this.emptyNumberBufferAsLiteral();
          this.tokens.push(new Token(TokenType.Operator, "*"));
        }
        this.tokens.push(new Token(TokenType.LeftParenthesis, char));
      } else if (this.isRightParenthesis(char)) {
        this.emptyLetterBufferAsVariables();
        this.emptyNumberBufferAsLiteral();
        this.tokens.push(new Token(TokenType.RightParenthesis, char));
      } else if (this.isComma(char)) {
        this.emptyLetterBufferAsVariables();
        this.emptyNumberBufferAsLiteral();
        this.tokens.push(new Token(TokenType.FunctionArgumentSeparator, char));
      }
    }

    if (this.numberBuffer.length) {
      this.emptyNumberBufferAsLiteral();
    }
    if (this.letterBuffer.length) {
      this.emptyLetterBufferAsVariables();
    }

    return this.tokens;
  }

  private emptyNumberBufferAsLiteral() {
    if (this.numberBuffer.length) {
      this.tokens.push(new Token(TokenType.Literal, this.numberBuffer.join('')));
      this.numberBuffer = [];
    }
  }

  private emptyLetterBufferAsVariables() {
    for (var i = 0; i < this.letterBuffer.length; i++) {
      this.tokens.push(new Token(TokenType.Variable, this.letterBuffer[i]));
      if (i < this.letterBuffer.length - 1) { //there are more Variables left
        this.tokens.push(new Token(TokenType.Operator, "*"));
      }
    }
    this.letterBuffer = [];
  }

  private isComma(char: string): boolean {
    return (char === ',');
  }

  private isDecimalPoint(char: string): boolean {
    return (char === '.');
  }

  private isDigit(char: string): boolean {
    return !isNaN(parseInt(char));
  }

  private isLetter(char: string): boolean {
    return char.toLowerCase() != char.toUpperCase();
  }

  private isOperator(char: string): boolean {
    return (char === '+') ||
      (char === '-') ||
      (char === '*') ||
      (char === '/') ||
      (char === '^');
  }

  private isLeftParenthesis(char: string): boolean {
    return (char === '(');
  }

  private isRightParenthesis(char: string): boolean {
    return (char == ')');
  }
}





