# The Babel Parser

The docs for the parser are at https://babeljs.io/docs/babel-parser

They  aren't willing to change the  API to support plugins
because it's not clear how to make that API effective, and it would limit 
their ability to refactor and optimize the codebase.

**The current recommendation for those that want to create their own custom syntax is for users to fork the parser**.

To consume our custom parser, 
we can add a plugin to our options 
to call the parser via its npm package name 
or require it if using JavaScript,

```js
const parse = require("custom-fork-of-babel-parser-on-npm-here");

module.exports = {
  plugins: [
    {
      parserOverride(code, opts) {
        return parse(code, opts);
      },
    },
  ],
};
```

## Article Creating custom JavaScript syntax with Babel

See the Svelte maintainer Tan Liu Hau (陈立豪) article "Creating custom JavaScript syntax with Babel" (September 25, 2019) available at https://lihautan.com/creating-custom-javascript-syntax-with-babel
where the author creates  a curry function syntax `@@`:

```js
// '@@' makes the function `foo` curried
function @@ foo(a, b, c) {
  return a + b + c;
}
console.log(foo(1, 2)(3)); // 6
```

the parser is a recursive descent parser. 

- Modifies the lexer. [packages/babel-parser/src/tokenizer/types.js](https://github.com/tanhauhau/babel/blob/feat/curry-function/packages/babel-parser/src/tokenizer/types.js#L86). We need typescript for that.

- The author looks for
`"FunctionDeclaration"` and finds a function called `parseFunction` in 
[packages/babel-parser/src/parser/statement.js](https://github.com/tanhauhau/babel/blob/da0af5fd99a9b747370a2240df3abf2940b9649c/packages/babel-parser/src/parser/statement.js#L1030),
and here found a line that sets the `generator` attribute.

See [tan-liu-article.md](/doc/tan-liu-article.md) for the summary of my experience reproducing Tan Liu Hau's article.


## References

See section [References](docs/references.md).