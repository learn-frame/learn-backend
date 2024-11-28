# Procedure

存储过程简单来说, 就是为以后的使用而保存的一条或多条 MySQL 语句的集合

## 编写存储过程

先讲一下 `DELIMITER`,  因为 sql 语句都是用分号结尾, 在创建存储过程中的 sql 语句结尾也会带着一个分号, 如果不做任何处理, 引擎就认为到这里就结束了, 但
在实际创建存储过程时, sql 语句是被 BEGIN 和 END 包裹, 那这会导致 END 那一句执行不到而报错.

而 `DELIMITER //` 告诉命令行实用程序使用 `//` 作为新的语句结束分隔(占位)符,  最后通过 `DELIMITER ;` 恢复为原来的语句分隔符.

```sql
DELIMITER //

CREATE PROCEDURE GetAveragePrice()
BEGIN
    SELECT AVG(buyPrice) AS priceaverage
  FROM   products;
END //

DELIMITER ;
```

执行存储过程:

```sql
CALL GetAveragePrice()
```

## 带参数的存储过程

### 只带 IN 参数的存储过程

```sql
DELIMITER //

CREATE PROCEDURE GetUserById(IN employeeId INT)
BEGIN
    SELECT * FROM employees WHERE employeeNumber = employeeId;
END //
```

执行:

```sql
call GetUserById(1001);
```

### 只带 OUT 参数的存储过程

```sql
DELIMITER //

CREATE PROCEDURE GetPrice(OUT pl DECIMAL(8, 2), OUT pa DECIMAL(8, 2), OUT ph DECIMAL(8, 2))
BEGIN
    SELECT MIN(buyPrice)  AS priceMin INTO pl FROM products;
SELECT 
    AVG(buyPrice) AS priceAverage
INTO pa FROM
    products;SELECT 
    AVG(buyPrice) AS priceHigh
INTO ph FROM
    products;
END //

DELIMITER ;
```

执行:

```sql
call GetPrice(@pl, @pa, @ph); -- 注意只执行这句无反应, 因为 @pl, @pa, @ph 只相当于形参
SELECT @pl, @pa, @ph; -- 只有搭配 SELECT 才是实际调用
```

### 带 IN 和 OUT 参数的存储过程

```sql
DELIMITER //

CREATE PROCEDURE GetUserCount(IN title VARCHAR(50), OUT userCount INT)
BEGIN
    SELECT COUNT(*) INTO userCount FROM employees WHERE jobTitle = title;
END //
```

执行:

```sql
call GetUserCount('Sales Rep', @userCount);
select @userCount;
```

## 高级存储过程

```sql
-- Name: ordertotal
-- Parameters: onumber order number
--       taxable = 0 if not taxable, 1 if taxable 
--       ototal order total variable

DELIMITER //
CREATE PROCEDURE ordertotal( 
IN onumber INT,
IN taxable BOOLEAN, 
OUT ototal DECIMAL (8, 2)
) COMMENT 'Obtain order total, optionally adding tax' BEGIN

-- Declare variable for total 
DECLARE total DECIMAL(8, 2); 
-- Declare tax percentage 
DECLARE taxrate INT DEFAULT 6;

-- Get the order total
SELECT 
    SUM(item_price * quantity)
FROM
    orderitems
WHERE
    order_num = onumber INTO total;

-- Is this taxable? 
IF taxable THEN
 -- Yes, so add taxrate to the total
 SELECT total+(total/100*taxrate) INTO total; 
END IF;
-- And finally, save to out variable
SELECT total INTO ototal;

END //

DELIMITER ;
```

## 删除存储过程

```sql
DROP PROCEDURE IF EXISTS GetAveragePrice;
```

## 查看存储过程

```sql
SHOW PROCEDURE STATUS WHERE Db = 'classicmodels';
SHOW CREATE PROCEDURE GetAveragePrice;
```
