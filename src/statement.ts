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
import assign from "./statements/assign";
import Tokens from "./misc/Tokens";
import declaration from "./statements/declaration";

export default function Statement(statement: string) {
  if (!statement) return;

  const firstWordRegex = statement.match(/^[a-zA-Z]* /g);

  if (!firstWordRegex) throw new Error("Invalid syntax");

  const firstWord = firstWordRegex[0].trim();

  if (DataTypes.has(firstWord)) {
    // declaration'
    declaration(statement);
  } else if (firstWord == Tokens.REPEAT) {
    // while statement
  } else if (firstWord == Tokens.COND) {
    // if statement
  } else if (stack[firstWord] != undefined) {
    assign(statement);
    // is an assigny operator
  } else {
    // throw error
  }
}
