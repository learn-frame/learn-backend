# 字符串

## Setter

```ts
// 插入单个字符串
set('string:1', 'hello')
set('string:2', 1) // 注意存储时数字 1 被转成字符串 '1'

// 一次性插入多个字符串
mSet([
  ['string:3', '1'],
  ['string:4', 'a']
])

// 如果数字字符串支持加1减1, 和按步长加减, 如果在非数字字符串操作这些方法报错
incr('string:2') // 2
incrBy('string:2', 10) // 12
decr('string:2') // 11
decrBy('string:2', 10) // 1
incrByFloat('string:2', 0.1) // 1.1

// 后面追加
append('string:1', ' world') // hello world

// 查看并删除
getDel('string:1')

// 查看并设置过期时间
getEx('string:2', {
  EX: 1, // 设置精确的过期秒
  PX: 1, // 设置精确的过期毫秒
  EXAT: 1, // 设置未来过期秒级时间戳
  PXAT: 1, // 设置未来过期毫秒级时间戳
  PERSIST: true // 永不过期
})

// 给某个值设置精确的过期秒, 并用新值覆盖
setEx('string:1', 1, 'newValue')

// 给某个值设置精确的过期毫秒, 并用新值覆盖
pSetEx('string:1', 1, 'newValue')

// 查看并用新值覆盖
getSet('string:1', 'hola')

// MSETNX 用于同时设置多个键值对,但只有当所有给定键都不存在时才能成功执行. 如果任何一个给定键已经存在, 则整个操作将失败, 不会修改任何键.
// 下面这个例子, string:5 和 string:6 不存在, 所以分别被设置成 a 和 b
// 但第二次设置 string:6 和 string:7 时, 由于 string:6 已存在, 所以不能被设置成 c, 且由于这件事导致整个操作失败, 对 string:7 的操作也不会执行
mSetNX([
  ['string:5', 'a'],
  ['string:6', 'b']
])
mSetNX([
  ['string:6', 'c'],
  ['string:7', 'd']
])

// SETNX 用于设置单个键值对,但只有当给定键不存在时才能成功执行. 如果该给定键已经存在, 则操作将失败, 不会做修改.
// 下面这个例子, 一开始 string:8 不存在, 所以 被设置成 a, 但第二次执行, 由于 string:8 已存在, 操作不执行
setNX('string:8', 'a')
setNX('string:8', 'b')

// 把某个字符串, 从第 X 位之后的东西替换成新字符串, 如果 X 位已经超过了字符串的长度, 用空字符串填充
// get string:1 -> "hello world"
// setrange string:1 20 'redis' -> (integer) 25
// get string:1 -> "hello world\x00\x00\x00\x00\x00\x00\x00\x00\x00redis"
setRange('string:1', 6, 'redis')
```

## Getter

```ts
// 获取一个字符串
get('string:1')

// 批量获取多个字符串
mGet(['string:1', 'string:2'])

// 某个字符串的长度
strLen('string:2')

// 相当于获取一个字符串后执行 .slice()
getRange('string:1', 0, 2)

// 获取两个字符串的最长重复字串
// https://algorithm.yanceyleo.com/leetcode/medium/3-length-of-longest-substring
lcs('string:1', 'string:2')
```
