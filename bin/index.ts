import fs from "fs";
import path from "path";
import { parser } from "../src/parser.js";
import { run } from "../src/run.js";

const content = fs.readFileSync(
  path.join(import.meta.dirname, "../tests/assets/cmd-compose.yml"),
  { encoding: "utf-8" }
);

const commands = parser(content);
run(commands);
