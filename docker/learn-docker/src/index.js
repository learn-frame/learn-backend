const express = require('express')
const { createClient } = require('redis')

const app = express()
const redis = createClient({
  url: 'redis://localhost:6379'
})

app.get('/', async (_, res) => {
  const hits = await redis.incr('hits')
  res.json({
    message: `This is an Express.js service running on Docker! The page has been visited for ${hits} times!`
  })
})

const PORT = process.env.PORT || 8964
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
