# build cook
```
docker build -t tencent-tts .
```


# run local 
```
docker run -p 3011:3011 --env-file .env tencent-tts
```

# rebuild and run
```
docker build -t tencent-tts .
docker ps
docker stop old_container_id
docker rm old_container_id
docker run -p 3011:3011 --env-file .env tencent-tts
```