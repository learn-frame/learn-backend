# Compute

```sql
/* 将 firstName 和 last N a me 合并成一个字段 */
/* 由于这相当于产生了一个新的列, 它的默认名就是 CONCAT(firstName, ' ', lastName) */
SELECT 
    CONCAT(firstName, ' ', lastName)
FROM
    employees



/* 你可以给一个 AS 作为别名 */
SELECT 
    CONCAT(firstName, ' ', lastName) AS fullName
FROM
    employees
```

```sql
SELECT
    RTRIM( firstName ) 
FROM
    employees 
 
SELECT 
    LTRIM(firstName)
FROM
    employees
 
SELECT 
    TRIM(firstName)
FROM
    employees
```

```sql
/* 可以用加减乘除进行四则运算 */
SELECT 
    priceEach + orderLineNumber AS a
FROM
    orderdetails;

SELECT 
    priceEach - orderLineNumber AS b
FROM
    orderdetails;
    
SELECT 
    priceEach * orderLineNumber AS c
FROM
    orderdetails;

SELECT 
    priceEach / orderLineNumber AS d
FROM
    orderdetails;

/* 用 % 也可以取余数 */
/* 也注意 CAST, 数据库里的 priceEach 是 FLOAT 类型, 这里把它转换成 INT 类型 */
SELECT 
    (CAST(priceEach AS UNSIGNED INTEGER) % orderLineNumber) AS remainder
FROM
    orderdetails;
```

```sql
/* 可以通过 SELECT 加上计算的方式快速测试 */
SELECT TRIM(' a bc ')

SELECT 3 * 2

SELECT NOW()
```
