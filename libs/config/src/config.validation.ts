import Joi from 'joi'

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  HOST: Joi.string().hostname(),
  PORT: Joi.number().port(),
  DATABASE_URL: Joi.string().uri(),
  RABBITMQ_URI: Joi.string().uri(),
  ETCD_HOSTS: Joi.string(),
  ETCD_USERNAME: Joi.string(),
  ETCD_PASSWORD: Joi.string(),
  REDIS_URL: Joi.string().uri(),
  SERVICE_KEY: Joi.string(),
  SERVICE_VALUE: Joi.string()
})
