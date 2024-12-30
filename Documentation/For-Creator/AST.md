# NodeType (`ast.ts`)

We will create a `NodeTypes` type which will contain a string of types we want in our language.

It will contain the following types:

```typescript
export type NodeType =
  | "Program"
  | "NumericLiteral"
  | "Identifier"
  | "BinaryExpr"
  | "CallExpr"
  | "UnaryExpr"
  | "FunctionDeclaration";
```

But for now we will just focus on the following types:

```typescript
    "Program",
    | "NumericLiteral"
    | "Identifier"
    | "BinaryExpr"
```


## What is a program?
If we look at our `lexer.ts` we see that any program is just an array of statements.

We create this statement:
```typescript
export interface Stmt { // Stmt is short for statement
    kind: NodeType;
}
```


