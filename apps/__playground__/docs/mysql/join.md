# join

如下代码, 我们想从 orders 和 customers 两张表中取出所有字段, 那么 FROM 就要把这两个表都选上.

需要注意的是, 这种写法计算出来的是笛卡尔积, 也就说如果 orders 表有 10 行, customers 中有 20 行, 如果不做任何 WHERE 限制, 它会生成 200 行数据.

下面这个例子, 我们把  customers.customerNumber orders.customerNumber 都固定到 298, 那么它的意义就变成了从 orders 和 customers 两张表中取出所有字段, 当且仅当 customerNumber 是 298 的时候.

```sql
SELECT
 orders.*,
 customers.* 
FROM
 orders,
 customers 
WHERE
 customers.customerNumber = '298' 
 AND orders.customerNumber = '298';
```
