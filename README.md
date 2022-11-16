# Test - 2

## Tokens

| Token Code    | Operation | Regex |
| ------------- | --------- | ----- |
| ADD           | +         | +     |
| SUB:          | -         | -     |
| MUL:          | \*        | \*    |
| DIV:          | /         | /     |
| MOD:          | %         | %     |
| LESS:         | <         | <     |
| GREATER:      | >         | >     |
| LESS THAN:    | <=        | <=    |
| GREATER THAN: | >=        | >=    |
| EQUAL TO:     | ==        | ==    |
| NOT EQUAL TO: | !=        | !=    |
| ASSIGNMENT:   | &         | &     |
| BLOCK         | {}        | {.\*} |

| Token Code | condition                                          | Regex |
| ---------- | -------------------------------------------------- | ----- |
| TINY       | -128 <= num <= 127                                 | \d+   |
| SMALL      | -32768 <= num >= 32767                             | \d+   |
| PERFECT    | -2147483648 <= num >= 2147483647                   | \d+   |
| BIG        | -9223372036854775808 <= num >= 9223372036854775808 | \d+   |

| Token Code | Regex         |
| ---------- | ------------- |
| VAR        | [a-zA-Z]{6,8} |
| COND       | cond          |
| REPEAT     | repeat        |
| BEGIN      | begin         |
| END        | end           |

## Production Rules

```txt

<Program> --> Begin <stmt> End

<stmt> --> <if_stmt> | <while_stmt> | <as_s> | <block> | <declaration>

<if_stmt> --> cond <bool> : <stmt> :

<while_stmt> --> repeat <bool> : <stmt> :

<as_s> --> <var> & <expression>

<block> --> { <stmt> }

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
