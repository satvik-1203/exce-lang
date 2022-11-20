import BooleanEquation from "../misc/BooleanEquation";
import Statement from "../Statement";
import InsideBrackets from "../misc/InsideBrackets";
import Tokens from "../misc/Tokens";

/**
 *
 * Gets the loop condition, and runs a while loop till the condition is false.
 *
 * @param statement
 */

export default function Loop(statement: string) {
  // repeat () {}

  statement = statement.replace("repeat ", "").trim();

  const {
    insideStatement: booleanEquation,
    restStatement: conditionStatement,
  } = InsideBrackets(
    statement,
    Tokens.PARENTHESISOPEN,
    Tokens.PARENTHESISCLOSE
  );

  const { insideStatement, restStatement } = InsideBrackets(
    conditionStatement.trim(),
    Tokens.CODEBLOCKOPEN,
    Tokens.CODEBLOCKCLOSE
  );

  while (true) {
    if (BooleanEquation(booleanEquation)) Statement(insideStatement);
    else break;
  }

  Statement(restStatement);
}
