import stack from "../stack";
import Statement from "../Statement";

/**
 *
 * Declares the variable in the stack memory.
 *
 * @param statement
 */

export default function Declaration(statement: string) {
  const regexMatch = statement.match(/([^;]+);(.*)/)!;

  // short variableOne

  const [_, declarationStatement, restStatement] = regexMatch;

  let [type, variable] = declarationStatement.split(" ");

  type = type.trim();
  variable = variable.trim();

  if (!variable || stack[variable] != undefined)
    throw new Error(`${variable} already exists`);

  const isValidVariable = variable.match(/[a-zA-Z_]{6,8}/);

  if (!isValidVariable || isValidVariable[0].length != variable.length)
    throw new Error("Invalid naming convention");

  stack[variable] = [type, undefined];
  Statement(restStatement.trim());
}
