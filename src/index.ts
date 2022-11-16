import fs from "fs/promises";
import stack from "./stack";
import Statement from "./statement";

const main = async () => {
  const filePath = process.cwd() + "/" + process.argv[2];
  const exceCode = (await fs.readFile(filePath, "ascii"))
    .trim()
    .replaceAll("\n", " ")
    .replaceAll(/\s+/g, " ");

  const result = exceCode.matchAll(/begin (.*) end/gm);
  const statement = [...result][0][1];
  Statement(statement);
  console.log(stack);
};

main();
