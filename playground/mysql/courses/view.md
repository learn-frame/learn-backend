# View

View 其实类似于函数, 把重复的东西封装起来, 可以传参数进来, 我们选择 [Join](./join.md) 一节的例子, 下面这个例子找出购买 S24_2360 这款产品的所有订单, 然后找出这些订单的客户, 最后找出服务这个客户的员工信息:

```sql
SELECT DISTINCT
    employees.*
FROM
    orderdetails,
    orders,
    customers,
    employees
WHERE
    orderdetails.orderNumber = orders.orderNumber
        AND orders.customerNumber = customers.customerNumber
        AND employees.employeeNumber = customers.salesRepEmployeeNumber
        AND orderdetails.productCode = 'S24_2360';
```

如果我们用视图, 就可以简化成下面的样子:

```sql
SELECT 
    *
FROM
    some_view
WHERE
    productCode = 'S24_2360';
```

## 为什么使用视图

- 重用 SQL 语句.
- 简化复杂的SQL操作。在编写查询后，可以方便地重用它而不必知道它的基本查询细节。
- 使用表的组成部分而不是整个表。
- 保护数据。可以给用户授予表的特定部分的访问权限而不是整个表的访问权限。
- 更改数据格式和表示。视图可返回与底层表的表示和格式不同的数据。

## 视图的规则和限制

- 与表一样, 视图必须唯一命名(不能给视图取与别的视图或表相同的名字).
- 对于可以创建的视图数目没有限制,
- 为了创建视图, 必须具有足够的访问权限. 这些限制通常由数据库管理人员授予.
- 视图可以嵌套, 即可以利用从其他视图中检索数据的查询来构造一个视图.
- ORDER BY 可以用在视图中, 但如果从该视图检索数据 SELECT 中也含有 ORDER BY, 那么该视图中的 ORDER BY 将被覆盖.
- 视图不能索引, 也不能有关联的触发器或默认值.
- 视图可以和表一起使用. 例如, 编写一条联结表和视图的 SELECT 语句.

## 视图操作

### 创建视图

使用 `CREATE VIEW` 来创建视图.

```sql
CREATE VIEW some_view AS
    SELECT DISTINCT
        employees.*, orderdetails.productCode
    FROM
        orderdetails,
        orders,
        customers,
        employees
    WHERE
        orderdetails.orderNumber = orders.orderNumber
            AND orders.customerNumber = customers.customerNumber
            AND employees.employeeNumber = customers.salesRepEmployeeNumber;
```

注意我们的目的是将 `productCode` 当作**参数**传入到视图中, 所以你得在视图的 SELECT 中把 `productCode` 暴露出来. 并且你得在 where 语句中使用 `productCode` 而不是 `orderdetails.productCode`. 不懂. TODO:

```sql
SELECT 
    *
FROM
    some_view
WHERE
    productCode = 'S24_2360';
```

比如你还可以把函数处理的逻辑封装成 View. 不过没什么卵用, 让前端搞就好了.

```sql
FROM
    customers
ORDER BY country;

CREATE VIEW some_concat AS
    SELECT 
        CONCAT(contactLastName,
                ' ',
                contactFirstName,
                ' ',
                '(',
                country,
                ')') AS identifier
    FROM
        customers
    ORDER BY country;
```

### 查看视图

```sql
SHOW CREATE VIEW some_view;
```

### 删除视图

```sql
DROP VIEW some_view;
```

### 更新视图

使用 `CREATE OR REPLACE VIEW` 语法, 如果要更新的视图不存在, 则会创建一个视图. 一般, 应该将视图用于检索(SELECT语句)而不用于更新(INSERT, UPDATE 和 DELETE)

```sql
CREATE OR REPLACE VIEW some_view AS
    SELECT DISTINCT
        employees.*, orderdetails.productCode
    FROM
        orderdetails,
        orders,
        customers,
        employees
    WHERE
        orderdetails.orderNumber = orders.orderNumber
            AND orders.customerNumber = customers.customerNumber
            AND employees.employeeNumber = customers.salesRepEmployeeNumber;
```

如果视图定义中有以下操作, 则不能进行视图的更新:

- 分组(使用 GROUP BY 和 HAVING)
- 联结
- 子查询
- 并
- 聚集函数 Min(), Count(), Sum() 等
- DISTINCT
- 导出(计算)列
