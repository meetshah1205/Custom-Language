# First thing: Lexer (`lexer.ts`)
Imagine we have this code:
```js
let x = 45
```
which is valid js code.

The compiler will convert this into an array of tokens.

## What is a token?
A token is just something a machine can give a valid meaning to.

Now our JS code will be converted into an array like this:
```javascript
[ LetToken, IdentifierTk, EqualsToken, NumberToken ] 
```
`LetToken` is `let`

`IdentifierTk` is `x`

`EqualsToken` is `=`

`NumberToken` is `45`


# Coding
(```lexer.ts```)
- Every token will have a `value` which is of `string` type.

- Every token will have a `type` which will be of type `TokenType` but there is a problem, that is not a valid datatype in TypeScript.
    * So we will create a new data type.
    * An `enum` called `TokenType`. (`lexer.ts`:1)
        * It will have a `Number`, `Identifier`, `Equals`, `Let`, `OpenParen` (`(`), `CloseParen` (`)`), `BinaryOperator`. 
        * For now these are the only tokens we will support.

## Tokenization function
It will take in the following parameters:
- `sourceCode` of type string

And it will return an array of tokens, `Token[]`

We will create a variable `tokens` which will be an array, `Array<Token>`

The function will return the variable `tokens`.

We will create a variable, `src` that will contain every character of the passed code:
```js
// inside the tokenize function
const src = sourceCode.split("");
```
Now we can have every single element in the code.

### Build each token till the end of the file passed in
We can run a `while` loop till the length of the passed in string is greater than `0`.

(NOTE: This isn't the most efficient or memory efficient way to do this, but it is the simplest)

#### `TokenType.OpenParen` and `TokenType.CloseParen`
We can check if the first character passed in is a `LeftParen`.

* We can build a function for that.
* In that function we take the `value: stirng` and `type: TokenType` as parameters
* And return a token of `value` and `type`, 
```javascript
{ value, type }
```
* But that gives an error as the passed in `.shift()` output returns `string | undefined` and in TypeScript we need absolute type safety so we assign the `value` passed in the `token()` function a default value of `""`.

<br>

So that was the `LeftParen` now lets work on the `RightParen`.

It is a pretty simple change, just changing the `"("` to `")"` and instead of `TokenType.OpenParen`, `TokenType.CloseParen`.

And there, we have already handled 2 of our token types. However, there are a lot more to handle.

```typescript
if (src[0] == "("){
    // tokens.push({type: TokenType.OpenParen, value: src.shift()}) // This is quite hard to read
    tokens.push(token(src.shift(), TokenType.OpenParen))
} else if (src[0] == ")"){
    // tokens.push({type: TokenType.OpenParen, value: src.shift()}) // This is quite hard to read
    tokens.push(token(src.shift(), TokenType.CloseParen))
}
```

#### `BinaryOperators`
We can handle the `+` and `-` using the same logic but instead of `TokenType.OpenParen` we will put `TokenType.BinaryOperator`.

Same logic applies for multiplication and division.

And just like that our Operations tokens have been handles

```typescript
else if (src[0] == "+" || src[0] == "-" || src[0] == "*" || src[0] == "/"){
    tokens.push(token(src.shift(), TokenType.BinaryOperator))
}
```

#### `TokenType.Equals`
It is a pretty simple process
```typescript
else if (src[0] == "="){
    tokens.push(token(src.shift(), TokenType.Equals))
} 
```

#### `Number`, `Identifier` etc.
- NOTE: We will be implementing them now but for now we won't be using them.

Now at the end of our `tokenize()` function, that if there is no match then it is either a whitespace, newline or something we haven't yet made.

So we can now use the `else` statement to "handle multi-character tokens".

##### What is a multi-character token?
Take for example `+` it is a single character but if we take things like `>=`, `=>` or `let` they are multi-character token.


Now we will create our own function for that, we can use regular expressions, but some languages have poor support for regular expressions so ever you are following this in another language you wouldn't have a problem implementing the same steps.

We will create our own function named `isaplha()` and all that is going to do is take in a `source: string` and return whether it is an alphabetical string.

We can achieve that by checking whether `src.toUpperCase()` is the same (==) to `src.toLowerCase()`.

Because we know that the only characters that should be different on calling these functions are alphabetical characters since:

$$
a \neq A
$$

We can similar function for the int, named `isint()`.

We can take a `str: string` as a parameter.

We can get the Unicode character in a variable `c`.

We can also have bounds for us to know whether the number is valid.

```typescript
const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)];
```

And we can return the `if` condition,
```ts
return (c >= bounds[0] && c <= bounds[1]);
```

We can know whether the passed number is a number.

And now we have the ability to handle multi-character tokens.

We can handle the number token as follows:
```typescript
if (isint(src[0])){
    let num = "";
    while (src.length > 0 && isint(src[0])){
        num += src.shift();
    }

    tokens.push(token(num, TokenType.Number));
}
```

We can also handle now about the `Identifier`.

```typescript
else if (isalpha(src[0])){
    let ident = "";
    while (src.length > 0 && isalpha(src[0])){
        ident += src.shift();
    }

    tokens.push(token(ident, TokenType.Identifier));
}
```

But the string can be `let` but it can also be `foo`.

To handle that we can create something that will hold our valid tokens.

```typescript
const KEYWORDS: Record<string, TokenType> = {}; // Basically a dictionary in case you are not using TypeScript
```

We create a token `"let"` and it is of type `TokenType.Let`.

Now before pushing the token we check for it in the reserved keywords.
```typescript
const reserved = KEYWORDS[ident];
```

If the user passed in `foo` it will be undefined.

So if the `reserved` is undefined we push it.

But if it is not undefined i.e. it contains a valid datatype, we push it with type as `reserved`.

#### Skip able characters
The characters which we don't care are like spaces, new line or tab characters.
```typescript
str == ' ' || str == '\n' || str == '\t'; // Boolean value
```

Now this is not the most optimal way but I don't care as much about optimization all I currently need is a working programming language.

And if we detect an error we just show an error and exit with:
```ts
Deno.exit(1);
```


# Testing

```ts
const source = await Deno.readTextFile("./lexer.ts");
for (const token of tokenize(source)){
    console.log(token);
}
```
Theoretically when we run this we should get a token for everything in our file.

```sh
deno run -A lexer.ts
```

But what! We get an error in our programming language, 😭.

But we will create a file to test stuff.

In `./test.txt` we have a source code for our language,

```text
let x = 45
```

When we run the file, we get this output:
```sh
{ value: "let", type: 6 }
{ value: "x", type: 1 }
{ value: "=", type: 2 }
{ value: "45", type: 0 }
```

Explaination:
- "let" is at `TokenType[6]` actually 7th element
- "x" is a `TokenType.Identifier` at `TokenType[1]` actually the 2nd element.
- "=" is a `TokenType.Equals` at `TokenType[2]` actually the 3rd element.
- "45" is a `TokenType.Number` at `TokenType[0]` actually the 1st element.

Lets have a more complex string:
```text
let x = 45 * ( 4 / 3 )
```

We get the following output:
```sh
{ value: "let", type: 6 }
{ value: "x", type: 1 }
{ value: "=", type: 2 }
{ value: "45", type: 0 }
{ value: "*", type: 5 }
{ value: "(", type: 3 }
{ value: "4", type: 0 }
{ value: "/", type: 5 }
{ value: "3", type: 0 }
{ value: ")", type: 4 }
```
It is pretty self explainatory.

And if we add an unknown token like `;` it gives an error.

Now we have managed to convert a string of characters in the understandable array.