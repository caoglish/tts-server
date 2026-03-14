rem call docker stop tts-server-1
rem call docker rm tts-server-1
call docker run -it --rm --name tts-server-1 -p 3011:3011 --env-file .env tencent-tts 