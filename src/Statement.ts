/**
 * Statement can have 4 options
 *
 * if - starts with keyword cond
 *
 * while - starts with keyword repeat
 *
 * assign - starts with a variable in the stack
 *
 * declaration - starts with either SHORT TALL GRADE VENTI
 *
 */

import stack from "./stack";
import DataTypes from "./misc/DataTypes";
import Assign from "./statements/Assign";
import Tokens from "./misc/Tokens";
import Declaration from "./statements/Declaration";
import Condition from "./statements/Condition";
import Loop from "./statements/Loop";

/**
 *
 * This function gets a statement and understands which type of statement it would be
 * And performs the action of the right statement
 *
 * @param statement
 * @returns
 */

export default function Statement(statement: string = "") {
  statement = statement.trim();

  if (!statement) return;
  const firstWordRegex = statement.match(/^[a-zA-Z_]* /g);

  if (!firstWordRegex) throw new Error("Invalid syntax");

  const firstWord = firstWordRegex[0].trim();

  if (DataTypes.has(firstWord)) {
    // declaration'
    Declaration(statement);
  } else if (firstWord == Tokens.REPEAT) {
    // while statement
    Loop(statement);
  } else if (firstWord == Tokens.COND) {
    // if statement
    Condition(statement);
  } else if (stack[firstWord] != undefined) {
    Assign(statement);
    // is an assigny operator
  } else {
    // throw error
    throw new Error(`${firstWord} isn't defined`);
  }
}
