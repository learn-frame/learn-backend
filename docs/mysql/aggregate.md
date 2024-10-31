# aggregate

```sql
/* 计算平均值 */
/* 如果遇到 NULL, 会过滤掉 */
/* DISTINCT 会过滤掉列中相同的值 */
SELECT
 AVG( DISTINCT priceEach ) AS avgPriceEach 
FROM
 orderdetailss;
```

```sql
/* 计算总数, 即便某一行是 NULL, 也会计算在内 */
SELECT
 COUNT(*) AS totalCount 
FROM
 orders;-- 326

/* 计算总数, 按照某列来统计, 如股票某一行的这个字段是 NULL, 会忽略掉 */
SELECT
 COUNT( comments ) AS totalCount 
FROM
 orders;-- 80
```

```sql
/* 计算最大 */
SELECT
 MAX( priceEach ) 
FROM
 orderdetails;-- 214.30

/* 计算最小 */
SELECT
 MIN( priceEach ) 
FROM
 orderdetails;-- 26.55
```

```sql
/* 计算总和 */
SELECT
 SUM( quantityOrdered * priceEach ) 
FROM
 orderdetails 
WHERE
 orderNumber = '10103';-- 50218.95
```

```sql
/* 聚集不同值 */
SELECT
 AVG( DISTINCT priceEach ) AS avgPriceEach,
 MAX( priceEach ) AS maxPriceEach,
 MAX( priceEach ) AS minPriceEach 
FROM
 orderdetails;
```
