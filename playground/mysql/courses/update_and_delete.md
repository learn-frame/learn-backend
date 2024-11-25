# update and delete

## 更新数据

注意一定要写 where, 要不全表更新就死翘翘了.

```sql
UPDATE customers 
SET 
    state = 'LA',
    addressLine2 = NULL
WHERE
    customerNumber = 103
```

### 忽略失败

如果用 UPDATE 语句更新多行, 并且在更新这些行中的一行或多行时出一个现错误, 则整个 UPDATE 操作被取消. 为了即使是发生错误, 也继续进行更新, 可使用 IGNORE 关键字, 如下所示:

```sql
UPDATE IGNORE customers
```

## 删除数据

注意一定要写 where, 要不全表删除就死翘翘了.

```sql
DELETE FROM customers 
WHERE
    customerNumber = 103
```

### 更快的删除

`TRUNCATE TABLE customers` 的效果等价于 `DELETE FROM customers`, 但前者原理是直接删表再重建一张空的, 后者是一条一条删除, 所以删库跑路首选前者.
