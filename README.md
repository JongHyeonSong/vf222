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

1 . setDoc에 리스트 넣을때 정해진 이름으로 넣기
const docRef = doc(getFirestore(), "boards", "keeee");
const sn = await setDoc(docRef, { newd: 33 });

2. 랜덤넣기

const newCityRef = doc(collection(getFirestore(), "cities"))
// newCityRef.id -> '32wfowOIEW' 랜덤키
await setDoc(newCityRef, { data: "zz" });

// transaction
const sfDocRef = doc(getFirestore(), "boards", "keeee");
try {
const newPopulation = await runTransaction(
getFirestore(),
async (transaction) => {
const sfDoc = await transaction.get(sfDocRef);
if (!sfDoc.exists()) {
throw "Document does not exist!";
}
debugger;
const newPop = (sfDoc.data().population || 0) + 1;
if (newPop <= 1000000) {
transaction.update(sfDocRef, { population: newPop });
return newPop;
} else {
return Promise.reject("Sorry! Population is too big");
}
}
);

      console.log("Population increased to ", newPopulation);
    } catch (e) {
      // This will be a "population is too big" error.
      console.error(e);
    }

콜렉션 > 도큐먼트 > 특정필드만 삭제하기
const cityRef = doc(getFirestore(), "boards", "ar1");

// Remove the 'capital' field from the document
await updateDoc(cityRef, {
name: deleteField(),
});

###

query를 사용해서 endBefore나 StartAfter등을 사용할떄

onSnapShot에서 콜백으로 받은
sn객체(Cu Class)에서
sn.docs[n](Du Class) 를 인자로 넘기는데
{...sn.docs[n]}은 인자로 넘겨도 **_절대_** 찾지 못한다

const docRef = doc(getFirestore(), "boards", this.docc, "ww", this.item.id );

docRef(Ec Class)도 사용이 가능하고 -- 안됨 시발;

const docSn = await getDoc(docRef)

에서 docSn(Su Class) 도 사용이 가능하다

startAfter등은 기본적으로 orderBy에 종속적이며 꼭 doc객체를 넣지않아도 된다 아래같이 숫자,문자 하드코딩으로도 구현이 가능하다

orderBy("id", "desc") 라면
startAfter({id})를 적어주어야 적용이되고

startAfter({createdAt})처럼 다른 내용을 적어도 쿼리되지않는다

1 카테고리별로 게시글볼수있게
2 최신글은 불꽃마크
3 v-skeletone으로 데이터가 안왔을때 은빛 로딩 처리
