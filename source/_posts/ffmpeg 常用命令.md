---
title: FFmpeg 常用命令
tags: [FFmpeg]
index_img: /img/ffmpeg.jpg
date: 2019-10-10 10:00:00
---
###### 合并音频，重叠
```
ffmpeg -i C:\Users\Administrator\Desktop\luyin.mp3 -i C:\Users\Administrator\Desktop\古典一合成.mp3 -filter_complex amerge -ac 2 -c:a libmp3lame -q:a 4 C:\Users\Administrator\Desktop\合成.mp3
```


###### 拼接音频，有点问题，后续拼接的音频 header 丢失
```
ffmpeg -i "concat:C:\Users\Administrator\Desktop\古典二.mp3|C:\Users\Administrator\Desktop\古典二.mp3" -c copy C:\Users\Administrator\Desktop\古典二和.mp3
```

###### 拼接音频，末尾追加
```
ffmpeg -f concat -safe 0 -i C:\Users\Administrator\Desktop\list.txt -c copy "C:\Users\Administrator\Desktop\平缓一合成.mp3"
```
###### list.txt 内容
```
file 'C:\Users\Administrator\Desktop\古典二.mp3'
file 'C:\Users\Administrator\Desktop\古典二.mp3'
file 'C:\Users\Administrator\Desktop\古典二.mp3'
file 'C:\Users\Administrator\Desktop\古典二.mp3'
```
