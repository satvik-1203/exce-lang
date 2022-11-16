# Test - 2

## Tokens

| Token Code   | Operation | Regex |
| ------------ | --------- | ----- |
| ADD          | +         | +     |
| SUB          | -         | -     |
| MUL          | \*        | \*    |
| DIV          | /         | /     |
| MOD          | %         | %     |
| FLRDIV       | $         | $     |
| LESS         | <         | <     |
| GREATER      | >         | >     |
| LESS THAN    | <=        | <=    |
| GREATER THAN | >=        | >=    |
| EQUAL TO     | ==        | ==    |
| NOT EQUAL TO | !=        | !=    |
| ASSIGNMENT   | =         | =     |
| BLOCK        | {}        | {.\*} |

| Token Code | condition                                          | Regex |
| ---------- | -------------------------------------------------- | ----- |
| SHORT      | -128 <= num <= 127                                 | \d+   |
| TALL       | -32768 <= num <= 32767                             | \d+   |
| GRADE      | -2147483648 <= num <= 2147483647                   | \d+   |
| VENTI      | -9223372036854775808 <= num <= 9223372036854775808 | \d+   |

| Token Code | Regex         |
| ---------- | ------------- |
| VAR        | [a-zA-Z]{6,8} |
| COND       | cond          |
| REPEAT     | repeat        |
| BEGIN      | begin         |
| END        | end           |

## Priority Order

- \+
- \-
- \*
- /
- ^

> Top to Bottom

<!-- Can we use bit wise operator -->

## Production Rules

```txt

<Program> --> Begin <stmt> End

<stmt> --> <if_stmt> | <while_stmt> | <as_s>  | <declaration>

<if_stmt> --> cond <bool> { <stmt> }

<while_stmt> --> repeat <bool> { <stmt> }

<as_s> --> <var> = <expression>

<bool> --> <band> { `OR` <band>}
<band> { `OR` <band> }
<band> --> <beq> { `AND` <beq> }
<beq> --> <brel> { (`!=`|`==`) <brel> }
<brel> --> <expr> { (`<=`|`>=` | `<` | `>`) <expr> }
<expr> --> <term> { (`+`|`-`) <term> }
<term> --> <not> { (`*`|`\`|`%`) <bnot> }
<not> -> [!]<bfactor>
<factor> --> `id` | `int_lit`  | `(` <bexpr> `)`


```
