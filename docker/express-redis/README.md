# Learn Docker

## Container Commands

- The `-t` option tells Docker to allocate a pseudo-tty and bind it to the container's standard input, while the `-i` option leaves the container's standard input open.
- `-d` is used to execute in daemon state
- `docker CONTAINER_ID logs` gets the output information in the container
- `docker exec -it CONTAINER_ID bash` to enter the container
- `docker export CONTAINER_ID > ZZZ.tar` exports a container snapshot to a compressed file
- `cat ZZZ.tar | docker import - XXX/YYY` or `docker import http://XXX.com/ZZZ.tgz XXX/YYY` to import a container snapshot

## Storage

### Volumes

- `docker volume create VOLUME_NAME` creates a new volume
- Create a container named `CONTAINER_NAME` and load an volume named `VOLUME_NAME` to `/usr/share/nginx/html` in the container.

    ```bash
    $ docker run -d -P \
        --name CONTAINER_NAME \
        # -v VOLUME_NAME:/usr/share/nginx/html \
        --mount source=VOLUME_NAME,target=/usr/share/nginx/html \
        nginx:alpine
    ```

### Bind mounts

You can pass a directory or single file as the source.

```bash
$ docker run -d -P \
    --name CONTAINER_NAME \
    --mount type=bind,source=DIRECTORY_PATH_OR_JUST_A_SINGLE_FILE,target=/usr/share/nginx/html \
    nginx:alpine
```

## Networking

### -P

- `-P` means docker randomly choose a port that is not used. `docker run -d -P nginx:alpine`

### -p

`-p` means you must declare a specific port that is not used.

- map to a specific port and any address: `docker run -d -p 80:80 nginx:alpine`
- map to a specific port and a specific address: `docker run -d -p 127.0.0.1:80:80 nginx:alpine`
- map to any port and a specific address: `docker run -d -p 127.0.0.1::80 nginx:alpine`
- map an UDP address: `docker run -d -p 127.0.0.1:80:80/udp nginx:alpine`

### Create and lint to a network

- `docker network create -d bridge NETWORK_NAME` create a network
- `docker run -it --rm --name CONTAINER_NAME_1 --network NETWORK_NAME IMAGE_NAME sh` run a container named `CONTAINER_NAME_1` and add to the `NETWORK_NAME` network
- `docker run -it --rm --name CONTAINER_NAME_2 --network NETWORK_NAME IMAGE_NAME sh` run a container named `CONTAINER_NAME_2` and add to the `NETWORK_NAME` network

then, you can execute `PING CONTAINER_NAME_2` in `CONTAINER_NAME_1` and execute `PING CONTAINER_NAME_1` in `CONTAINER_NAME_2`.
