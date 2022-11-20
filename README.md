# Lexical Analyzer

## Lexical Rules

Each Token / Lexical should be seperated by a space

Code starts with `begin` and ends with `end`. Between the block will have all the statements.

## Types of statements

- Declaration
- Assign
- Condition
- Loop

### Declaration Statement

Starts with a Integer type keyword, followed by variable name, and ends with a `;`;

The variable is stored in a hashmap, **key** is the variable name and the **value** is an array. `[type, value]`.

### Assign Statement

The statement starts with a variable that exists in the stack. If it doesn't, throw an error.
Then follows an `=` token with the expression it should be assign to and ends with `;`;

### Condition Statement

The statement starts with keyword `cond`, followed with `( boolean expression )` and `{ statement }`.

### Loop Statement

The statement starts with keyword `repeat`, followed with `( boolean expression)` and `{ statement }`. Statement will keep running, till boolean expression is false.

### Mathematical Expressions

An expression is valid, if and only if, it matches with the following regex.

Each number, and token have to be **separated** by a space.

Valid expression:

- -2
- 2 + -10
- 2 + 10 + numOne

Invalid expression:

- 2+10
- -2+numOne

## Tokens

### Mathematical Operators

| Token Code       | Operation | Regex |
| ---------------- | --------- | ----- |
| ADD              | +         | +     |
| SUB              | -         | -     |
| MUL              | \*        | \*    |
| DIV              | /         | /     |
| MODULUS          | %         | %     |
| PARENTHESISOPEN  | (         | )     |
| PARENTHESISCLOSE | )         | )     |

### Mathematical Equators

| Token Code | Operation | Regex |
| ---------- | --------- | ----- |
| LT         | <         | <     |
| GT         | >         | >     |
| LTE        | <=        | <=    |
| GTE        | >=        | >=    |
| EQ         | ==        | ==    |
| NE         | !=        | !=    |

### Integer Types

| Token Code | condition                                          | Regex | Size    |
| ---------- | -------------------------------------------------- | ----- | ------- |
| SHORT      | -128 <= num <= 127                                 | \d+   | 1 byte  |
| TALL       | -32768 <= num <= 32767                             | \d+   | 2 bytes |
| GRANDE     | -2147483648 <= num <= 2147483647                   | \d+   | 4 bytes |
| VENTI      | -9223372036854775808 <= num <= 9223372036854775808 | \d+   | 8 bytes |

### Keyword Types

| Token Code | Regex          |
| ---------- | -------------- |
| VAR        | [a-zA-Z_]{6,8} |
| COND       | cond           |
| REPEAT     | repeat         |
| BEGIN      | begin          |
| END        | end            |

### Extras

| Token Code       | Operation | Regex |
| ---------------- | --------- | ----- |
| ASSIGNMENT       | =         | =     |
| CODEBLOCKOPEN    | {         | {     |
| CODEBLOCKCLOSE   | }         | }     |
| PARENTHESISOPEN  | (         | )     |
| PARENTHESISCLOSE | )         | )     |

## Priority Order

- ()
- \+
- \-
- \*
- /
- %

> Top to Bottom

## Production Rules

```txt

<Program> --> Begin <stmt_list> End
<stmt_list> --> {<stmt> `;`}
<stmt> --> <if_stmt> | <while_stmt> | <as_s>  | <declaration>
<if_stmt> --> cond  `(` <bool> `)` `{` <stmt_list> `}`
<while_stmt> --> repeat `(` <bool> `)` `{` <stmt_list> `}`
<as_s> --> <var> = <expression> `;`
<declaration> --> <datatype> <var> `;`

<datatype> --> (SHORT|TALL|GRANDE|VENTI)
<var> -->  [a-zA-Z_]{6,8} // our variable rule
<expression> --> <term> { (`*`|`\`|`%`) <term> }
<term> --> <term> { (`+`|`-`) <term> }
<factor> --> [0-9]+ | <var>  | `(` <expression> `)`
<bool> --> <expression> (`<=`|`>=` | `<` | `>`) <expression>

```

## Grammar Rules

```txt

E -> E + T           Expression + Term
E -> E - T           Expression - Term
E -> T               Term
T -> T * F           Term * Expression
T -> T / F           Term / Expression
T -> F               Factor
F -> -F              Negative Factor
F -> +F              Positive Factor
F ->( E )            Expression inside parentheses
F -> a               Constant

```

## Is it a LL Grammar? (C)

Our code works on LR Grammar and doesn't have pairwise disjoint. Our code works on push down / top down automata.

## Is it Ambiguous Grammar? (D)

Looking at our LR table, if we had any ambiguity, our LR table blocks would be highlighted in red in the action block. The picture is show below. So there is **no ambiguity**.

## Program

The program starts at `src/index.ts`.

Steps to run the code:

- yarn install
- yarn dev:start `<filename>`

### filenames:

- passing:

  - ./tests/passing/one.exce
  - ./tests/passing/two.exce

- failing:

  - ./tests/failing/one.exce
  - ./tests/failing/two.exce

## Working and failing (G)

### Failing

```txt

begin

  GRAND var1One;
  var1One = 10 + (2 + 5);

  cod ( var1One >= 20) {
    var1Oe = 50;
  }

  VENT varTwo;
  varTwo = var1One + 10;

end

```

Lexical Errors:

- GRAND: Supposed to be GRANDE
- cod: Supposed to be cond
- vat1One: Doesn't follow the naming rules
- VENT: Supposed to be VENTI
- var1Oe: Supposed to be var1One

```txt

start

  GRANDE varOne;
  varOne = 10+5 - 2;

  cond (varOne < = 15 {
    varOne = 20;

    cond (varOne == 20) {
      varOne = varOne % 2;

    GRANDE varTwo;
    varTwo = 10 + 5 * ( 2 + 3 ;
  }

end

```

Error:

- 10+5 : Need to have a space between the operands 10 + 5
- < = : shouldn't be separated. <=
- 15 ) : boolean expression should end with )
- 2; } : boolean statement should end with }
- 2 + 3 : mathematical parenthesis should be closed with )

### Working

```txt

begin

  SHORT varOne;
  varOne = 2;

  VENTI varTwo;
  varTwo = 90 + 100 + (2 + (5 * 2)) * varOne;

  cond (varOne != varTwo) {
    cond (varOne <= varTwo) {
      varOne = varTwo * 2;
    }
  }

  SHORT varThree;
  varThree = 0;

  repeat (varThree <= 5) {
    varThree = varThree + 1;

    cond (varThree == 3) {
      varThree = varThree * 2;
    }
  }

end

```

```txt

begin

  GRANDE varOne;
  varOne = 10 + (5 + -2) * 4;

  GRANDE varTwo;
  varTwo = 2 * varOne;

  SHORT iter_i;
  iter_i = 0;

  repeat (iter_i < 5) {
    iter_i = iter_i + 1;
  }

end

```

## LR(1) Grammar and parse tree (H).

### LR(1) Grammar

![Grammar table](https://raw.githubusercontent.com/satvik-1203/exce-lang/main/images/one.jpg)

### LR(1) Parse Table

![Grammar table](https://raw.githubusercontent.com/satvik-1203/exce-lang/main/images/two.jpg)

### Fail - 1

![Grammar table](https://raw.githubusercontent.com/satvik-1203/exce-lang/main/images/fail1.jpg)

### Pass - 1

![Grammar table](https://raw.githubusercontent.com/satvik-1203/exce-lang/main/images/pass1.jpg)

### Fail - 2

![Grammar table](https://raw.githubusercontent.com/satvik-1203/exce-lang/main/images/fail2.jpg)

### Pass - 2

![Grammar table](https://raw.githubusercontent.com/satvik-1203/exce-lang/main/images/pass2.jpg)
