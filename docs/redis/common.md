# 通用方法

```ts
// 复制一个 key
await this.redisClient.copy('string:1', 'copiedString:1')

// 删除一个 key
await this.redisClient.del('string:1')

// 查看某个值是否存在, 支持数组, 每存在一个返回 +1
await this.redisClient.exists(['string:1', 'string:2'])
```
