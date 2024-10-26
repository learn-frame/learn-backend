import { Inject, Injectable } from '@nestjs/common'
import type { RedisClientType } from 'redis'

@Injectable()
export class LearnRedisService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType
  ) {}

  // -------------字符串-----------------
  public async string() {
    // -------------setter-----------------

    // 插入单个字符串
    await this.redisClient.set('string:1', 'hello')
    await this.redisClient.set('string:2', 1) // 注意存储时数字 1 被转成字符串 '1'

    // 一次性插入多个字符串
    await this.redisClient.mSet([
      ['string:3', '1'],
      ['string:4', 'a']
    ])

    // 如果数字字符串支持加1减1, 和按步长加减, 如果在非数字字符串操作这些方法报错
    await this.redisClient.incr('string:2') // 2
    await this.redisClient.incrBy('string:2', 10) // 12
    await this.redisClient.decr('string:2') // 11
    await this.redisClient.decrBy('string:2', 10) // 1
    await this.redisClient.incrByFloat('string:2', 0.1) // 1.1

    // 后面追加
    await this.redisClient.append('string:1', ' world') // hello world

    // 查看并删除
    await this.redisClient.getDel('string:1')

    // 查看并设置过期时间
    await this.redisClient.getEx('string:2', {
      EX: 1, // 设置精确的过期秒
      PX: 1, // 设置精确的过期毫秒
      EXAT: 1, // 设置未来过期秒级时间戳
      PXAT: 1, // 设置未来过期毫秒级时间戳
      PERSIST: true // 永不过期
    })

    // 给某个值设置精确的过期秒, 并用新值覆盖
    await this.redisClient.setEx('string:1', 1, 'newValue')

    // 给某个值设置精确的过期毫秒, 并用新值覆盖
    await this.redisClient.pSetEx('string:1', 1, 'newValue')

    // 查看并用新值覆盖
    await this.redisClient.getSet('string:1', 'hola')

    // MSETNX 用于同时设置多个键值对,但只有当所有给定键都不存在时才能成功执行. 如果任何一个给定键已经存在, 则整个操作将失败, 不会修改任何键.
    // 下面这个例子, string:5 和 string:6 不存在, 所以分别被设置成 a 和 b
    // 但第二次设置 string:6 和 string:7 时, 由于 string:6 已存在, 所以不能被设置成 c, 且由于这件事导致整个操作失败, 对 string:7 的操作也不会执行
    await this.redisClient.mSetNX([
      ['string:5', 'a'],
      ['string:6', 'b']
    ])
    await this.redisClient.mSetNX([
      ['string:6', 'c'],
      ['string:7', 'd']
    ])

    // SETNX 用于设置单个键值对,但只有当给定键不存在时才能成功执行. 如果该给定键已经存在, 则操作将失败, 不会做修改.
    // 下面这个例子, 一开始 string:8 不存在, 所以 被设置成 a, 但第二次执行, 由于 string:8 已存在, 操作不执行
    await this.redisClient.setNX('string:8', 'a')
    await this.redisClient.setNX('string:8', 'b')

    // 把某个字符串, 从第 X 位之后的东西替换成新字符串, 如果 X 位已经超过了字符串的长度, 用空字符串填充
    // get string:1 -> "hello world"
    // setrange string:1 20 'redis' -> (integer) 25
    // get string:1 -> "hello world\x00\x00\x00\x00\x00\x00\x00\x00\x00redis"
    await this.redisClient.setRange('string:1', 6, 'redis')

    // -------------getter-----------------

    // 获取一个字符串
    await this.redisClient.get('string:1')

    // 批量获取多个字符串
    await this.redisClient.mGet(['string:1', 'string:2'])

    // 某个字符串的长度
    await this.redisClient.strLen('string:2')

    // 相当于获取一个字符串后执行 .slice()
    await this.redisClient.getRange('string:1', 0, 2)

    // 获取两个字符串的最长重复字串
    // https://algorithm.yanceyleo.com/leetcode/medium/3-length-of-longest-substring
    await this.redisClient.lcs('string:1', 'string:2')

    return {
      success: true
    }
  }

  public async list() {
    // -------------setter-----------------

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

    // -------------getter-----------------
    // 返回 list 的某个区间, 通过 (0, -1) 可以拿到所有
    await this.redisClient.lRange('list:1', 0, -1)

    // 返回 list 某个索引对应的元素
    await this.redisClient.lIndex('list:1', 0)

    // 获取某个 list 的长度
    await this.redisClient.lLen('list:1')
    return {
      success: true
    }
  }

  public async json() {
    return {
      success: true
    }
  }

  public async set() {
    return {
      success: true
    }
  }

  public async hash() {
    return {
      success: true
    }
  }

  public async helper() {
    // -------------通用方法-----------------
    // 复制一个 key
    await this.redisClient.copy('string:1', 'copiedString:1')

    // 删除一个 key
    await this.redisClient.del('string:1')

    // 查看某个值是否存在, 支持数组, 每存在一个返回 +1
    await this.redisClient.exists(['string:1', 'string:2'])

    return {
      success: true
    }
  }
}
