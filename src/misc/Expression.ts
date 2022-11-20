import LexicalAnalyzer from "./LexicalAnalyzer";

/**
 *
 * Reduces the mathematical expression using parse tree and returns the result
 *
 * () > + > - > * > /
 *
 * @param expression
 * @returns
 */

export default function Expression(expression: string) {
  const lexicalAnalyzer = new LexicalAnalyzer(expression.trim());

  return lexicalAnalyzer.getEquation();
}
