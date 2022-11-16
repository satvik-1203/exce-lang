import stack from "../stack";
import Statement from "../statement";

export default function declaration(statement: string) {
  const regexMatch = statement.match(/([^;]+);(.*)/)!;

  // short variableOne

  const [_, declarationStatement, restStatement] = regexMatch;

  let [type, variable] = declarationStatement.split(" ");

  type = type.trim();
  variable = variable.trim();

  if (stack[variable] != undefined)
    throw new Error(`${variable} already exists`);

  stack[variable] = [type, undefined];
  Statement(restStatement.trim());
}
