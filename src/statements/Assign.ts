import stack from "../stack";
import Tokens from "../misc/Tokens";
import Statement from "../Statement";
import Expression from "../misc/Expression";

/**
 *
 * This function is responsible for assigning a expression to the variable in stack
 *
 * @param statement
 */

export default function Assign(statement: string) {
  const regexMatch = statement.match(/([^;]+);(.*)/)!;

  if (!regexMatch) throw new Error("Invalid formatting while assigning");

  const [_, assignStatement, restStatement] = regexMatch;

  // a = 10
  let [variable, expression] = assignStatement.split(Tokens.ASSIGN);

  variable = variable.trim();
  expression = expression.trim();
  // run the expression function to simplify the expression

  stack[variable][1] = Expression(expression); // result

  Statement(restStatement.trim());
}
