import { Token } from './token';

export function tokenize(str: string): Token[] {
  
  let splitStrings = str.replace(' ', '').split("");

  let tokens: Token[] = assignTokens(splitStrings);

  return tokens;
}

function assignTokens(splitStrings: string[]): Token[] {
  let tokens: Token[] = [];
  for (let char of splitStrings) {
    if(isDigit(char)) {
      tokens.push(new Token("Literal", char));
    } else if(isLetter(char)) {
      tokens.push(new Token("Variable", char));
    } else if(isOperator(char)) {
      tokens.push(new Token("Operator", char));
    } else if(isLeftParenthesis(char)) {
      tokens.push(new Token("Left Parenthesis", char));
    } else if(isRightParenthesis(char)) {
      tokens.push(new Token("Right Parentesis", char));
    } else if(isComma(char)) {
      tokens.push(new Token("Function Argument Separator", char));      
    }
  }

  return tokens;
}

function isComma(char: string): boolean {
  return (char === ',');
}

function isDigit(char: string): boolean {
  return !isNaN(parseInt(char));
}

function isLetter(char: string): boolean {
  return char.toLowerCase() != char.toUpperCase();
}

function isOperator(char: string): boolean {
  return (char === '+') ||
    (char === '-') ||
    (char === '*') ||
    (char === '/') ||
    (char === '^'); 
}


function isLeftParenthesis(char: string): boolean {
 return (char === "(");
}
function isRightParenthesis(char: string): boolean {
 return (char == ")");
}
