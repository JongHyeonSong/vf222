# vf222

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).



```bash
$ firebase login # if you are not logged in
$ firebase use --add
? Which project do you want to add? xxx-site
? What alias do you wnat to use for this project? default

```

key download

functions/key.json download from console service account key


환경변수설정 
https://firebase.google.com/docs/functions/config-env

```bash
firebase functions:config:set someservice.key="THE API KEY" someservice.id="THE CLIENT ID"

$ firebase functions:config:set admin.email=xx@abc.com admin.db_url=https://xxx-site.firebaseio.com
```

firebase 디플로이 특정 람다만 할때
firebase deploy --only functions:createUser

본인 이메일을 환경변수에 저장할때 
firebase functions:config:set admin.email=159159@gmail.com admin.db_url=https://vue-mem-default-rtdb.firebaseio.com

저장한 환경변수 볼떄
firebase functions:config:get


저장한 환경변수로 database.rules.json 설정
