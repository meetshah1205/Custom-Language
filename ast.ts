export type NodeType =
    | "Program"
    | "NumericLiteral"
    | "Identifier"
    | "BinaryExpr";

/*
 * Statement is not an expression.
 * Because they'll not return a value.
 * So like let x = 45 will not return 45.
 * But x = 45 is no longer a statement, it is an assignment expression.
 * That is the reason why the following code is not valid in C or JS:
 * let x = if (true) { 45 } else { 55 }
 * However it is valid in Rust.
 * Because in rust the if statement is an expression, it returns a value.
 */
export interface Stmt {
    kind: NodeType;
}

export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
}

// * Empty interface is used to represent a type that may have any value.
export interface Expr extends Stmt {}

export interface BinaryExpr extends Expr {
    kind: "BinaryExpr";
    left: Expr;
    right: Expr;
    operator: string;
/*
* Example of a binary expression:
* 10 - 5
* But something like foo - bar is also a binary expression, because the left is an expression and the right is an expression.
*/
}

export interface Identifier extends Expr {
    kind: "Identifier";
    symbol: string; // Something like x or foo
/*
* But this foo() - bar() is also valid.
* While (x - 5) - bar() is also valid in some languages.
*/
}

export interface NumericLiteral extends Expr {
    kind: "NumericLiteral";
    value: number; // Something like 5 or 10
}

// ! We will add more types later but for now this is enough.