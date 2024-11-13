import express from 'express'
import * as redis from 'redis'

const app = express()
const PORT = 8964

const redisHost = process.env.REDIS_HOST || 'localhost'
const redisPort = process.env.REDIS_PORT || 6379

const client = redis.createClient({
  url: `redis://${redisHost}:${redisPort}`
})

client
  .connect()
  .then(() => {
    console.log(`Connected to Redis at ${redisHost}:${redisPort}`)
  })
  .catch((err) => {
    console.error('Could not connect to Redis:', err)
  })

app.get('/', async (_, res) => {
  try {
    const hits = await client.incr('hits')
    res.json({
      message: `This is an Express.js service running on Docker! The page has been visited ${hits} times!`
    })
  } catch (err) {
    console.log(err)
    res.status(500).send('Error connecting to Redis')
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
