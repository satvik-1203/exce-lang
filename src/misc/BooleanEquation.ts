import Expression from "./Expression";
import Tokens from "./Tokens";

/**
 *
 * Gets a boolean equation from the parameter, check if the equation is true of false
 *
 * @param equation
 * @returns
 */

export default function BooleanEquation(equation: string): boolean {
  const { GT, LT, GTE, LTE, EQ, NE } = Tokens;

  const equationOperators = [GT, LT, GTE, LTE, EQ, NE];

  for (let i = 0; i < equationOperators.length; i++) {
    const hasToken = equation.includes(` ${equationOperators[i]} `);

    if (!hasToken) continue;

    const [expressionOne, expressionTwo] = equation.split(
      ` ${equationOperators[i]} `
    );

    const valueOne = Expression(expressionOne);
    const valueTwo = Expression(expressionTwo);

    const token = equationOperators[i];

    if (token == LT) return valueOne < valueTwo;

    if (token == LTE) return valueOne <= valueTwo;

    if (token == GT) return valueOne > valueTwo;

    if (token == GTE) return valueOne >= valueTwo;

    if (token == EQ) return valueOne == valueTwo;

    if (token == NE) return valueOne != valueTwo;
  }

  throw new Error("Invalid Boolean expression");
}
