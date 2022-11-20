import BooleanEquation from "../misc/BooleanEquation";
import InsideBrackets from "../misc/InsideBrackets";
import Tokens from "../misc/Tokens";
import Statement from "../Statement";

/**
 *
 * Gets the condition expression.
 * If the statement is true, performs what is in the condition statements
 *
 * @param statement
 */

export default function Condition(statement: string) {
  statement = statement.replace("cond ", "");

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

  if (BooleanEquation(booleanEquation)) Statement(insideStatement);

  Statement(restStatement);
}
