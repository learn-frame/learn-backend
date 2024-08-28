# REGEXP

```sql
/* `.` 代表匹配任意一个字符. */
WHERE comments REGEXP '.000' -- JetPack 1000, JetPack 2000, JetPack 3000
```

```sql
/* 匹配 comments 中包含 1000, 2000, 3000 的 */
WHERE comments REGEXP '1000|2000|3000' -- JetPack 1000, JetPack 2000, JetPack 3000
```

```sql
/* 匹配 comments 中开头是 1, 2, 3 后面跟着 Ton 的字符 */
WHERE comments REGEXP '[^123] Ton' -- 1 ton anvil, 2 ton anvil
```

```sql
/* 可以把上面 [123] 简化成 [1-3], 与之相对的还有 [a-z], [A-Z] 这些 */
WHERE comments REGEXP '[^1-3] Ton' -- 1 ton anvil, 2 ton anvil
```

```sql
/* . 是特殊符号, 需要转义一下, 如 \\. \\- \\\ */
/* 之所以用两个反斜杠, 是因为 MySQL 自己解释一个, 正则表达式库解释一个 */
WHERE comments REGEXP '//.' -- Furball Inc.
```

## 匹配字符类

| 类           | 说明                                               |
| ------------ | -------------------------------------------------- |
| `[:alnum:]`  | 任意字母和数字(同 `[a-zA-Z0-9]`)                   |
| `[:alpha:]`  | 任意字符(同 `[a-zA-Z]`)                           |
| `[:blank:]`  | 空格和制表(同 `[\\t]`)                            |
| `[:cntrl:]`  | ASCII 控制字符(ASCII 0 到 31 和 127)               |
| `[:digit:]`  | 任意数字(同 `[0-9]`)                              |
| `[:graph:]`  | 与 `[:print:]` 相同, 但不包括空格                  |
| `[:lower:]`  | 任意小写字母(同 `[a-z]`)                           |
| `[:print:]`  | 任意可打印字符                                     |
| `[:punct:]`  | 既不在 `[:alnum:]` 又不在 `[:cntrl:]` 中的任意字符 |
| `[:space:]`  | 包括空格在内的任意空白字符(同 `[\\f\\n\\r\\t\\v]`) |
| `[:upper:]`  | 任意大写字母(同 `[A-Z]`)                           |
| `[:xdigit:]` | 任意十六进制数字(同 `[a-fA-F0-9]`)                 |

## 匹配多个实例

```sql
/* [0-9]匹配任意数字, sticks? 匹配 stick 和sticks(因为 ? 匹配它前面的任何字符的 0 次或 1 次出现) */
WHERE prodName REGEXP '\\([0-9] sricks?\\)'
```

```sql
/* 匹配连在一起的任意 4 位数字 */
WHERE prodName REGEXP '[[:digit:]]{4}'
```

## 定位符

| 元字符    | 说明       |
| --------- | ---------- |
| `^`       | 文本的开始 |
| `$`       | 文本的结尾 |
| `[[:<:]]` | 词的开始   |
| `[[:>:]]` | 词的结尾   |

```sql
/* ^匹配串的开始. 因此, 只在.或任意数字为串中第一个字符时才匹配它们 */
WHERE prodName REGEXP '^[0-9\\.]'
```

`^` 有两种用法. 在集合中(用和定义), 用它来否定该集合, 否则, 用来指串的开始处.
