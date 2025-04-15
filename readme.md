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
docker build --no-cache -t tts-server . #no cache build
docker ps
docker stop tts-server-1
docker rm tts-server-1
docker run -d --name tts-server-1 -p 3011:3011 --env-file .env  -v "${PWD}:/app" tencent-tts #linux
docker run -d --name tts-server-1 -p 3011:3011 --env-file .env -v "%cd%:/app" tencent-tts #windows
```


# testing with token:
```
fetch("http://127.0.0.1:3011/ping",{headers: {
						'Content-Type': 'application/json',
						'x-access-token': "testing_token_19283",
					}})
```


# need to add file
```
.env
middlewares\tokens.json
```

# trigger deploy
```
git commit --allow-empty -m "Trigger deployment"
```