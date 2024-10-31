# Use 和 Show

```sql
/* 展示所有数据库 */
SHOW DATABASES;
```

```sql
/* 使用数据库 classicmodels */
USE classicmodels;
```

```sql
/* 展示数据库 classicmodels 的所有表 */
SHOW TABLES;
```

```sql
/* 展示数据库 classicmodels 中表 employees 的所有列 */
SHOW COLUMNS 
FROM
 employees;

/* 等同于  */
DESCRIBE employees;
```

```sql
/* 用于显示广泛的服务器状态信息 */
SHOW STATUS;
```

```sql
/* 分别用来显示创建特定数据库或表的 MySQL 语句 */
SHOW CREATE DATABASE;
SHOW CREATE TABLE;
```

```sql
/* 用来显示授予用户(所有用户或特定用户)的安全权限 */
SHOW GRANTS;
```

```sql
/* 用来显示服务器错误或警告消息 */
SHOW ERRORS;
SHOW WARNINGS;
```
