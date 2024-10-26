# Like, %, _

```sql
/* 检索所有 productCode 以 'S18' 开头的产品 */
SELECT
 * 
FROM
 products 
WHERE
 productCode LIKE 'S18%';

/* 检索所有 productName 包含 'Ford' 的产品 */
SELECT
 * 
FROM
 products 
WHERE
 productName LIKE '%Ford%';

/* 检索所有 productLine 以 'Cars' 結尾的产品 */
SELECT
 * 
FROM
 products 
WHERE
 productLine LIKE '%Cars';

/* 下面的写法可以匹配万物, 除了 NULL */
SELECT
 * 
FROM
 products 
WHERE
 productLine LIKE '%';
```

```sql
/* _ 用于检索一个字符, 比如下面这个例子可以匹配到 x104, x103, x10t 等等 */
SELECT
 * 
FROM
 employees 
WHERE
 extension LIKE 'x10_';
```
