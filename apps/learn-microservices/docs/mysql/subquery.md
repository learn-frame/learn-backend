# 子查询

说白了就是级联查询. 下面这个例子中, 先在 orderdetails 表中查询 productCode = 'S18_2795' 的所有订单 ID(orderNumber), 根据这些订单 ID, 在 orders 表中查询出这些订单的客户 ID(customerNumber), 然后再在 customers 表中查询出这批用户的国家分布, 当然用 DISTINCT 做了个去重.

```sql
SELECT
 DISTINCT country
FROM
 customers 
WHERE
 customerNumber IN (
 SELECT
  customerNumber 
 FROM
  orders 
WHERE
 orderNumber IN ( SELECT orderNumber FROM orderdetails WHERE productCode = 'S18_2795' ));
```

## 作为计算字段使用子查询

下面这个例子, 查询每个用户有多少个订单. 要格外注意 `orders.customerNumber = customers.customerNumber`, 这里一定要避免歧义.

```sql
SELECT
 *,
 (
 SELECT
  COUNT(*) 
 FROM
  orders 
 WHERE
  orders.customerNumber = customers.customerNumber 
 ) AS orderCounts 
FROM
 customers
```
