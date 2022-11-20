import stack from "../stack";
import Tokens from "./Tokens";

const { ADD, SUB, MUL, DIV, PARENTHESISCLOSE, PARENTHESISOPEN, MOD } = Tokens;

/**
 * Tree Node in the parse tree
 */

class BinaryNode {
  left: BinaryNode | undefined;
  right: BinaryNode | undefined;
  value: string | number = "";

  constructor(value: string = "") {
    this.value = value;
    this.left;
    this.right;
  }
}

/**
 * Lexical Analyzer class to equate the expression
 */

export default class LexicalAnalyzer {
  value;
  root;

  constructor(expression: string) {
    const root = new BinaryNode();
    this.makeTree(expression, root);

    this.root = root;
    this.value = this.equateTree(root);
  }

  getEquation = () => {
    return this.value;
  };

  /**
   *
   * Function to turn the expression into a parse tree.
   *
   */

  makeTree = (expression: string, node: BinaryNode) => {
    expression = expression.trim();

    if (this.inParenthesis(expression))
      expression = expression.substring(1, expression.length - 1);

    if (!expression) throw new Error("Invalid Expression");

    if (!isNaN(+expression)) return (node.value = +expression);

    let plusIndex;
    let subIndex;
    let multiplicationIndex;
    let divisionIndex;
    let modeIndex;

    let tempExp = expression;

    for (let i = 0; i < tempExp.length; i++) {
      if (tempExp[i] == PARENTHESISOPEN) {
        i = this.getIndexOfPairBracket(
          tempExp,
          PARENTHESISOPEN,
          PARENTHESISCLOSE,
          i
        );
      } else if (tempExp.substring(i - 1, i + 2) == ` ${ADD} `) plusIndex = i;
      else if (tempExp.substring(i - 1, i + 2) == ` ${SUB} `) subIndex = i;
      else if (tempExp.substring(i - 1, i + 2) == ` ${MUL} `)
        multiplicationIndex = i;
      else if (tempExp.substring(i - 1, i + 2) == ` ${DIV} `) divisionIndex = i;
      else if (tempExp.substring(i - 1, i + 2) == ` ${MOD} `) modeIndex = i;
    }

    if (
      plusIndex ||
      subIndex ||
      multiplicationIndex ||
      divisionIndex ||
      modeIndex
    ) {
      node.left = new BinaryNode();
      node.right = new BinaryNode();
    } else {
      if (stack[expression] == undefined || stack[expression][1] == undefined) {
        throw new Error("Variable doesn't exist");
      }

      if (stack[expression] != undefined) node.value = stack[expression][1]!;

      return;
    }

    const operatorIndices: Array<[number | undefined, string]> = [
      [modeIndex, MOD],
      [multiplicationIndex, MUL],
      [divisionIndex, DIV],
      [plusIndex, ADD],
      [subIndex, SUB],
    ];

    for (let i = 0; i < operatorIndices.length; i++) {
      const [index, operator] = operatorIndices[i];

      if (!index) continue;

      node.value = operator;
      this.makeTree(expression.substring(0, index).trim(), node.left!);
      this.makeTree(expression.substring(index + 2).trim(), node.right!);

      break;
    }
  };

  /**
   *
   * Equates the parse tree to a number
   *
   */

  equateTree = (node: BinaryNode | undefined): number => {
    if (!node) return 0;

    if (typeof node.value == "number") return node.value;

    switch (node.value) {
      case "+":
        return this.equateTree(node.left) + this.equateTree(node.right);
      case "-":
        return this.equateTree(node.left) - this.equateTree(node.right);
      case "*":
        return this.equateTree(node.left) * this.equateTree(node.right);
      case "%":
        return this.equateTree(node.left) % this.equateTree(node.right);
      default:
        return this.equateTree(node.left) / this.equateTree(node.right);
    }
  };

  /**
   *
   * Responsible for getting the index of the other bracket pair
   * Used to skip lexical inside parenthesis
   */

  getIndexOfPairBracket = (
    statement: string,
    startBracket: string,
    endBracket: string,
    startIndex: number
  ) => {
    let bracketCounter = 1;
    let currIndex = startIndex + 1;

    while (bracketCounter > 0) {
      if (currIndex >= statement.length) throw new Error("Invalid Expression");

      if (statement.charAt(currIndex) == startBracket) bracketCounter++;
      else if (statement.charAt(currIndex) == endBracket) bracketCounter--;

      currIndex++;
    }

    return currIndex;
  };

  /**
   *
   * Checks if the entire expression is in parenthesis
   *
   * @param expression
   * @returns
   */

  inParenthesis = (expression: string) => {
    if (expression[0] != PARENTHESISOPEN) return false;

    const i = this.getIndexOfPairBracket(
      expression,
      PARENTHESISOPEN,
      PARENTHESISCLOSE,
      0
    );

    return i >= expression.length;
  };
}
