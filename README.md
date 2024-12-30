## Prerequisites

- Deno (I am using 2.1.4 but idk).
- VSCode (recommended).
- Deno extention in VSCode.

## Documentation

Refer to files in `Documentation\For-Creator` for documentation.

## Running

For now write your code in `test.txt` (or any file but update the file name in `lexer.ts`) and run the following command:

```shell
deno run -A lexer.ts
```

It should parse the code in the `test.txt`.

Example:
```text
let x = 45 * (3 / 4)
```

Then run the command:
```shell
deno run -A lexer.ts
```

It will output the following:
```shell
{ value: "let", type: 6 }
{ value: "x", type: 1 }
{ value: "=", type: 2 }
{ value: "45", type: 0 }
{ value: "*", type: 5 }
{ value: "(", type: 3 }
{ value: "3", type: 0 }
{ value: "/", type: 5 }
{ value: "4", type: 0 }
{ value: ")", type: 4 }
```

Explaination:

`{ value: "let", type: 6 }`: The token `"let"` is identified as a `TokenType.Let` in `lexer.ts`.

`{ value: "x", type: 1 }`: The token `"x"` is identified as an `TokenType.Identifier` in `lexer.ts`.

`{ value: "=", type: 2 }`: The token `"="` is identified as an `TokenType.Equals` in `lexer.ts`.

`{ value: "45", type: 0 }`: The token `"45"` is identified as a `TokenType.Number` in `lexer.ts`.

`{ value: "*", type: 5 }`: The token `"*"` is identified as an `TokenType.BinaryOperator` in `lexer.ts`.

`{ value: "(", type: 3 }`: The token `"("` is identified as a `TokenType.OpenParen` in `lexer.ts`.

`{ value: "3", type: 0 }`: The token `"3"` is identified as a `TokenType.Number` in `lexer.ts`.

`{ value: "/", type: 5 }`: The token `"/"` is identified as an `TokenType.BinaryOperator` in `lexer.ts`.

`{ value: "4", type: 0 }`: The token `"4"` is identified as a `TokenType.Number` in `lexer.ts`.

`{ value: ")", type: 4 }`: The token `")"` is identified as a `TokenType.CloseParen` in `lexer.ts`.