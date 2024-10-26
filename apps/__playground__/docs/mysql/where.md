# Where

```sql
SELECT
 * 
FROM
 products 
WHERE
 buyPrice > 100;

SELECT
 * 
FROM
 products 
WHERE
 buyPrice < 100;

SELECT
 * 
FROM
 products 
WHERE
 buyPrice >= 100;

SELECT
 * 
FROM
 products 
WHERE
 buyPrice <= 100;

SELECT
 * 
FROM
 products 
WHERE
 buyPrice = 100;

SELECT
 * 
FROM
 products 
WHERE
 buyPrice != 100;

SELECT
 * 
FROM
 products 
WHERE
 buyPrice <> 100;

SELECT
 * 
FROM
 products 
WHERE
 buyPrice BETWEEN 10 
 AND 100;

SELECT
 * 
FROM
 products 
WHERE
 buyPrice IS NULL;
```

```sql
SELECT
 * 
FROM
 orders 
WHERE
 STATUS = "shipped" 
 AND orderNumber > 10200;

SELECT
 * 
FROM
 orders 
WHERE
 STATUS = "shipped" 
 OR orderNumber > 10200;

/* 要注意运算符的顺序问题, 你可以用 () 提高优先级 */
SELECT
 * 
FROM
 orders 
WHERE
 STATUS = "shipped" 
 AND ( orderNumber > 10200 OR comments IS NULL );
```

```sql
/* IN 操作符用来指定条件范围, 范围中的每个条件都可以进行匹配 */
/* 下面这个例子查询在 1 2 号办公室的员工 */
SELECT
 * 
FROM
 employees 
WHERE
 officeCode IN ( 1, 2 );

/* WHERE 子句中的 NOT 操作符有且只有一个功能, 那就是否定它之后所跟的任何条件 */
/* 下面这个例子查询不在 1 2 号办公室的员工 */
SELECT
 * 
FROM
 employees 
WHERE
 officeCode NOT IN ( 1, 2 );
```
