# RabbitMQ

## Docker command

```bash
docker run -d -p 5672:5672 -p 15672:15672 --hostname rabbitmq_host --name rabbitmq -e RABBITMQ_DEFAULT_USER=root -e RABBITMQ_DEFAULT_PASS=password rabbitmq:3-management
```

## Visual Management

1. Enter your rabbitMQ docker container.

    ```bash
    docker exec -it rabbitmq bash
    ```

2. Start visual management service.

    ```bash
    rabbitmq-plugins enable rabbitmq_management
    ```

The URL is [http://localhost:15672/](http://localhost:15672/), and the default username and password are both `guest`.

![rabbitmq-1](../../screenshots/rabbitmq-1.png)
