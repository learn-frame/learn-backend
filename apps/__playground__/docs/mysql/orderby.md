# Order By

```sql
/* 正序排序 */
SELECT
 officeCode 
FROM
 employees 
ORDER BY
 officeCode;

/* 降序排序 */
SELECT
 officeCode 
FROM
 employees 
ORDER BY
 officeCode DESC;

/* 先根据 officeCode 升序排序, 再根据 email 降序排序 */
SELECT
 * 
FROM
 employees 
ORDER BY
 officeCode,
 email;

/* 先根据 officeCode 升序排序, 再根据 email 降序排序 */
SELECT
 * 
FROM
 employees 
ORDER BY
 officeCode,
 email DESC;

/* 找到 products 表中最贵的商品 */
SELECT
 * 
FROM
 products 
ORDER BY
 buyPrice DESC 
 LIMIT 1;
```
