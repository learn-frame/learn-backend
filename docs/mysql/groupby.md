# Group By

## 创建分组

```sql
/* 根据 orderNumber 分组 */
SELECT
 orderNumber,
 COUNT(*) AS orderNumberCount 
FROM
 orderdetails 
GROUP BY
 orderNumber;
```

```TS
+-------------+------------------+
| orderNumber | orderNumberCount |
+-------------+------------------+
|       ... |                ... |
|       10421 |                2 |
|       10422 |                2 |
|       10423 |                5 |
|       10424 |                6 |
|       10425 |               13 |
+-------------+------------------+
326 rows in set (0.00 sec)
```

你可以在后面加上 `WITH ROLLUP`, 可以额外多给一行汇总信息.

```sql
SELECT
 orderNumber,
 COUNT(*) AS orderNumberCount 
FROM
 orderdetails 
GROUP BY
 orderNumber WITH ROLLUP;
```

```TS
+-------------+------------------+
| orderNumber | orderNumberCount |
+-------------+------------------+
|       ...   |              ... |
|       10421 |                2 |
|       10422 |                2 |
|       10423 |                5 |
|       10424 |                6 |
|       10425 |               13 |
|        NULL |             2996 |
+-------------+------------------+
327 rows in set (0.00 sec)
```

### 规定

- GROUP BY 子句可以包含任意数目的列. 这使得能对分组进行嵌套,  为数据分组提供更细致的控制.
- 如果在 GROUP BY 子句中嵌套了分组, 数据将在最后规定的分组上 进行汇总. 换句话说, 在建立分组时, 指定的所有列都一起计算(所以不能从个别的列取回数据).
- GROUP BY 子句中列出的每个列都必须是检索列或有效的表达式(但不能是聚集函数). 如果在 SELECT 中使用表达式, 则必须在 GROUP BY 子句中指定相同的表达式. 不能使用别名.
- 除聚集计算语句外, SELECT 语句中的每个列都必须在 GROUP BY 子句中给出.
- 如果分组列中具有 NULL 值, 则 NULL 将作为一个分组返回. 如果列 中有多行 NULL 值, 它们将分为一组.
- GROUP BY 子句必须出现在 WHERE 子句之后, ORDER BY 子句之前.

### only_full_group_by

MySQL 在 >= 5.7 之后增加了个 `only_full_group_by`, 在这个模式下, 我们使用分组查询时, SELECT 出来的的字段只能是 GROUP BY 的那个字段, 或使用聚合函数计算的字段.

比如: `SELECT orderNumber, COUNT(*) AS orderNumberCount FROM orderdetails GROUP BY orderNumber;`, orderNumber 就是 GROUP BY 的那个字段, orderNumberCount 就是通过聚合函数计算的字段.

不管那么多了, 先把这玩意儿干掉吧.

```sql
/* 先找出目前所有的配置 */
SELECT @@sql_mode 

/* 假设打印出的是 ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION */

/* 修改后面新数据库的配置 */
set @@sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

/* 修改既有数据库的配置 */
set sql_mode ='STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
```

## 过滤分组

下面在分组之后, 可以通过 HAVING 进行过滤. 注意对于分组, 只能通过 HAVING 而不能使用 WHERE.

```sql
SELECT
 orderNumber,
 COUNT(*) AS orderNumberCount 
FROM
 orderdetails 
GROUP BY
 orderNumber 
HAVING
 orderNumberCount >= 10;
```

## 分组和排序

有时分组和排序会一起用, 因为分组出来的数据不一定是有序的.

```sql
SELECT
 orderNumber,
 COUNT(*) AS orderNumberCount 
FROM
 orderdetails 
GROUP BY
 orderNumber HAVING orderNumberCount >= 10
 ORDER BY orderNumberCount
```

## SELECT 子句顺序

| 子句     | 说明               | 是否必须使用           |
| -------- | ------------------ | ---------------------- |
| SELECT   | 要返回的列或表达式 | 是                     |
| FROM     | 从中检索数据的表   | 仅在从表选择数据时使用 |
| WHERE    | 行级过滤           | 否                     |
| GROUP BY | 分组说明           | 仅在按组计算聚集时使用 |
| HAVING   | 组级过滤           | 否                     |
| ORDER BY | 输出排序顺序       | 否                     |
| LIMIT    | 要检索的行数       | 否                     |
