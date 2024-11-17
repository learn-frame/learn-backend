# Docker

Run the following commands in the root path:

```bash
docker build -t commerce/gateway-service:0.0.1 -f docker/Dockerfile.gateway .
docker build -t commerce/order-service:0.0.1 -f docker/Dockerfile.order .
docker build -t commerce/product-service:0.0.1 -f docker/Dockerfile.product .
```
