# Table

## 创建表

> 在创建新表时，指定的表名必须不存在，否则将出错

```sql
CREATE TABLE some_table (
    id INT NOT NULL AUTO_INCREMENT,
    otherId INT NOT NULL AUTO_INCREMENT,
    name CHAR(50) NOT NULL DEFAULT "Yancey",
    description CHAR(255) NULL,
    PRIMARY KEY (id, otherId)
)  ENGINE=INNODB;
```

你可以加上 `IF NOT EXISTS` 保平安.

```sql
CREATE TABLE IF NOT EXISTS some_table (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(50) NOT NULL,
    description CHAR(255) NULL,
    PRIMARY KEY (id)
)  ENGINE=INNODB;
```

## 更新表

新增一个字段

```sql
ALTER TABLE some_table
  ADD phone CHAR(20) NOT NULL
```

移除一个字段

```sql
ALTER TABLE some_table
  DROP description
```

增加外键, 先创建一个列, 然后绑定外键.

```sql
ALTER TABLE some_table
 ADD COLUMN customerNumber INT NOT NULL,
 ADD CONSTRAINT fk_some_table_customers FOREIGN KEY (customerNumber) REFERENCES customers (customerNumber)
```

## 删除表

```sql
DROP TABLE some_table
```

## 重命名表

重命名表, 支持多个同时改

```sql
RENAME TABLE backup_a_table TO a_table, backup_b_table TO b_table, backup_c_table TO c_table;
```
