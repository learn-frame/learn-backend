# Insert

## 插入完整的行

必须一一对应给出列字段.

```sql
INSERT INTO employees
VALUES
(1000, 'Leo', 'Yancey', 'x8964', 'developer@yanceyleo.com', 4, NULL, 'CEO')
```

更保险的做法是给出列名, 这样一一对应更安全, 这样的好处是

```sql
INSERT INTO employees
(
    employeeNumber,
    lastName,
    firstName,
    extension,
    email,
    officeCode,
    jobTitle
)
VALUES
(1001, 'Leo', 'Yancey', 'x8964', 'developer@yanceyleo.com', 4, 'CEO')
```

一次请求也可以使用多个 INSERT INTO 插入多条:

```sql
INSERT INTO employees
(
    employeeNumber,
    lastName,
    firstName,
    extension,
    email,
    officeCode,
    jobTitle
)
VALUES
(1001, 'Leo', 'Yancey', 'x8964', 'developer@yanceyleo.com', 4, 'CEO');
INSERT INTO employees
(
    employeeNumber,
    lastName,
    firstName,
    extension,
    email,
    officeCode,
    jobTitle
)
VALUES
(1000, 'Sayaka', 'Yamamoto', 'x6489', 'sayaka@yanceyleo.com', 4, 'CFO')
```

但更优雅的方式是使用一条 INSERT INTO 然后插入同步插入两条:

```sql
INSERT INTO employees
(
    employeeNumber,
    lastName,
    firstName,
    extension,
    email,
    officeCode,
    jobTitle
)
VALUES
(1001, 'Leo', 'Yancey', 'x8964', 'developer@yanceyleo.com', 4, 'CEO'), (1000, 'Sayaka', 'Yamamoto', 'x6489', 'sayaka@yanceyleo.com', 4, 'CFO');
```

## 插入检索出的数据

这种就是从把另外一个表查询出的数据, 当作插入的参数, 感觉不常用吧.

```sql
INSERT INTO employees
(
    employeeNumber,
    lastName,
    firstName,
    extension,
    email,
    officeCode,
    jobTitle
)
SELECT employeeNumber,
    lastName,
    firstName,
    extension,
    email,
    officeCode,
    jobTitle FROM newEmployees
```

## 提高性能

如果插入不着急, 可以用 `INSERT LOW_PRIORITY INTO` 降低插入的优先级, 把更高优的资源留给其他操作(一般是 SELECT).
