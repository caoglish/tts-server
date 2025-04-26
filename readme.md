# build cook
```
docker build -t tencent-tts .
```


# run local 
```
docker run -p 3011:3011 --env-file .env tencent-tts --name tts-server-container

# rebuild and run
```
docker build -t tencent-tts .
docker build --no-cache -t tts-server . #no cache build
docker ps
docker stop tts-server-container
docker rm tts-server-container
docker run -d --name tts-server-container -p 3011:3011 --env-file .env   tencent-tts #linux



```


# testing with token:
```
fetch("http://127.0.0.1:3011/ping",{headers: {
						'Content-Type': 'application/json',
						'x-access-token': "testing_token_19283",
					}})
```

```
 fetch('https://caoglish.com/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': 'testing_token_19283' // 如果后端有验证，务必填写正确
      },
      body: JSON.stringify({ text: '测试语音合成' })
    });
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