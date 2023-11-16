```
npm install
npm run dev
```

```
npm run deploy
```

# redirect service and push influxdata of clicks


use Cloudflare Workers to redirect this link

> https://yourService.domain/?redirect=https://yourAudio.domain/ly/audio/2023/mw/mw231116.mp3?metric=LyAudio%26keyword=mw%26bot=1%26to=wxid_vi0twc8l12

to

> https://yourAudio.domain/ly/audio/2023/mw/mw231116.mp3?from=redirect

and then send to influxdata with those Line Protocol data:

> clicks,metric=LyAudio,keyword=mw,bot=1,to=wxid_vi0twc8l12 count=1i,target="mw231116.mp3",ip="undefined"

and save AWS Lambda $16.92 + Amazon API Gateway $7.39 per month.