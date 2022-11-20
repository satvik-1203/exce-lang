/**
 *
 * This function is required to get the string inside the pair brackets
 *
 * @param statement
 * @param startBracket
 * @param endBracket
 * @returns
 */

export default function InsideBrackets(
  statement: string,
  startBracket: string,
  endBracket: string
) {
  let bracketCounter = 1;
  let currIndex = 1;

  while (bracketCounter > 0) {
    if (currIndex >= statement.length) throw new Error("Invalid Statement");

    if (statement.charAt(currIndex) == startBracket) bracketCounter++;
    else if (statement.charAt(currIndex) == endBracket) bracketCounter--;

    currIndex++;
  }

  return {
    insideStatement: statement.substring(1, currIndex - 1).trim(),
    restStatement: statement.substring(currIndex).trim(),
  };
}
