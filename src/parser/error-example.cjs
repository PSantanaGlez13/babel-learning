const { parse } = require("@babel/parser");

const ast = parse(`a b`, { errorRecovery: true });

console.log(ast.errors[0].code); // BABEL_PARSER_SYNTAX_ERROR
console.log(ast.errors[0].reasonCode); // MissingSemicolon
console.log(JSON.stringify(ast, null, 2));