import { tokenize } from './tokenizer';

let testEquations: string[] = [
  '2y + 1',
  '2 + 3',
  '4a + 1',
  '5x+ (2y)',
  '11 + sin(20.4)',
  '456.7xy + 6sin(7.04x) — min(a, 7)'
];

for(let equation of testEquations) {
  console.log(tokenize(equation));
}
