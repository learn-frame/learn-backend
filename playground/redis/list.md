# 列表

## Setter

```ts
// 相当于 .shift()
await this.redisClient.lPush('list:1', 'a')

// 相当于 .unshift()
await this.redisClient.lPop('list:1')

// 相当于 .push()
await this.redisClient.rPush('list:1', ['b', 'c', 'd'])

// 相当于 .pop()
await this.redisClient.rPop('list:1')

// 取 list 的某个区间, 并覆盖原 list, 比如 lTrim([1, 2, 3, 4, 5, 6], -3, -1) -> [4, 5, 6]
await this.redisClient.lTrim('list:2', -3, -1)

// 用于将第一个 list 的第一个或最后一个元素移动到第二个 list 的开头或结尾
// 比如 list: 2 是 [a, b, c], list: 3 是 [d], 下面操作就是把 list:2 最左边的元素, 也就是 a 放到 list: 3 的最右边
// 执行结果是 list: 2 变成 [b, c]; list: 3 变成 [d, a]
await this.redisClient.lMove('list:2', 'list:3', 'LEFT', 'RIGHT')

// 如果列表空了, rpop 和 lpop 会直接返回 null, 并退出函数
// 如果使用 blPop 和 brPop, 在空了之后可以继续执行 X 秒, 在这 X 秒间, 直到一个元素被插进来被其消费, 这个方法才结束; 否则一直等着 X 秒后自动结束
// 如果 X 为 0 将永久阻塞, 直到一个元素被插进来
// rpop 和 lpop 就有点像 Event Loop 的消息队列, 一直轮询直到下一个任务到来; 而 blPop 和 brPop 会在那里 hold 住, 直到有新任务近来被消费
await this.redisClient.blPop('list:1', 0)
await this.redisClient.brPop('list:1', 0)

// 阻塞版的 lmove
await this.redisClient.blMove('list:2', 'list:3', 'LEFT', 'RIGHT', 0)

// 找到某个元素, 在其前或后增加一个元素
await this.redisClient.lInsert('list:2', 'AFTER', 'World', 'Wide')
```

## Getter

```ts
// 返回 list 的某个区间, 通过 (0, -1) 可以拿到所有
await this.redisClient.lRange('list:1', 0, -1)

// 返回 list 某个索引对应的元素
await this.redisClient.lIndex('list:1', 0)

// 获取某个 list 的长度
await this.redisClient.lLen('list:1')
```
