# Select, Distinct, Limit

```sql
SELECT
 * 
FROM
 employees;
```

```sql
SELECT
 employeeNumber,
 lastName 
FROM
 employees;
```

```sql
/* 下面这个例子中获取所有的办公室号, 有的雇员可能在同一个办公室, 所以加上 DISTINCT 用来去重 */
SELECT DISTINCT
 officeCode 
FROM
 employees;
```

```sql
/* 返回前 5 行 */
SELECT
 lastName 
FROM
 employees 
 LIMIT 5;

/* 返回第 5 - 10 行 */
SELECT
 lastName 
FROM
 employees 
 LIMIT 5,
 5;

/* 返回第 10 - 15 行 */
SELECT
 lastName 
FROM
 employees 
 LIMIT 10,
 5;
```

除了用 `LIMIT` 两个参数的方式, 还可以用 `LIMIT + OFFSET` 的组合.

```sql
/* 返回前 5 行 */
SELECT
 lastName 
FROM
 employees 
 LIMIT 5 OFFSET 0;

/* 返回第 5 - 10 行 */
SELECT
 lastName 
FROM
 employees 
 LIMIT 5 OFFSET 5;

/* 返回第 10 - 15 行 */
SELECT
 lastName 
FROM
 employees 
 LIMIT 5 OFFSET 10;
```

```sql
/* 使用完全限定的表名和数据库名 */
SELECT
 employees.lastName 
FROM
 classicmodels.employees;
```
