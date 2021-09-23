<template>
  <div>
    <v-textarea></v-textarea>
    <v-btn @click="write" color="success">write!</v-btn>
    <v-btn @click="read" color="success">read!</v-btn>
    <input type="file" @change="saveFile" />
    <span>{{ url }}@@</span>
    <!-- <img
      src="/fb/v0/b/vue-mem.appspot.com/o/some-childs?alt=media&token=b76ac65a-5b4b-4a40-a9fb-894ef8ba56ae"
      alt="eee"
    /> -->

    <a
      href="/fb/v0/b/vue-mem.appspot.com/o/some-childs?alt=media&token=b76ac65a-5b4b-4a40-a9fb-894ef8ba56ae"
      download
      >zzzzzzzz</a
    >
  </div>
</template>

<script>
import axios from "axios";

import {
  getStorage,
  ref,
  ListOptions,
  listAll,
  list,
  deleteObject,
  uploadString,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import urlParser from "url-parse";
export default {
  data() {
    return {
      url: "",
      hi: 1,
      happy:
        "https://firebasestorage.googleapis.com/v0/b/vue-mem.appspot.com/o/some-childs?alt=media&token=9cc87532-cd46-459d-8621-9aedb4872f7b",
    };
  },
  methods: {
    saveFile(e) {
      const file = e.target.files[0];

      const storage = getStorage();
      const storageRef = ref(storage, "some-childs.jpg");
      const metadata = {
        contentType: "image/jpeg",
      };
      // 'file' comes from the Blob or File API
      uploadBytes(storageRef, file, metadata).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((dURL) => {
          console.log(dURL);
          this.url = dURL;
        });
        console.log("Uploaded a blob or file!");
      });
    },
    async read() {
      let url = urlParser(this.url, true);

      url =
        url.pathname +
        Object.entries(url.query).reduce(
          (a, b) => a + b[0] + "=" + b[1] + "&",
          "?"
        );
      debugger;
      const r = await axios.get("/fb" + url);

      console.log(r);
      // const r = await axios.get(this.url);
      // debugger;
      // this.text = r.data;
      // console.log(r);
    },
    write() {
      var url = new urlParser("https://github.com/foo/bar", true);

      debugger;
      var storageRef = ref(getStorage(), "some-child");
      // var li = listAll(_ref)
      //   .then((res) => {
      //     debugger;
      //   })
      //   .catch((err) => {
      //     debugger;
      //   });
      const message = "This is my message.";
      const bytes = new Uint8Array([
        0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64,
        0x21,
      ]);

      // uploadString(storageRef, message).then((snapshot) => {
      //   console.log("Uploaded a raw string!");
      // });
      uploadBytes(storageRef, bytes).then((snapshot) => {
        console.log("Uploaded an array!");
      });
    },
  },
};
</script>

<style></style>
