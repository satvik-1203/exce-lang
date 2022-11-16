import stack from "../stack";
import Tokens from "../misc/Tokens";
import Statement from "../statement";

export default function assign(statement: string) {
  const regexMatch = statement.match(/([^;]+);(.*)/)!;

  const [_, assignStatement, restStatement] = regexMatch;

  // a = 10
  let [variable, expression] = assignStatement.split(Tokens.ASSIGN);

  variable = variable.trim();
  expression = expression.trim();
  // run the expression function to simplify the expression

  if (stack[variable] == undefined)
    throw new Error(`${variable} isn't defined`);

  // const result = simplifyExpression(expression)

  stack[variable][1] = +expression; // result

  Statement(restStatement.trim());
}
