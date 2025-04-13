# build cook
```
docker build -t tencent-tts .
```


# run local 
```
docker run -p 3011:3011 --env-file .env tencent-tts --name tts-server-1

# rebuild and run
```
docker build -t tencent-tts .
docker ps
docker stop tts-server-1
docker rm tts-server-1
docker run -d --name tts-server-1 -p 3011:3011 --env-file .env tencent-tts 
```