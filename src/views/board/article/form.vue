<template>
  <div>
    <v-btn @click="back">back</v-btn>

    <v-card>
      board form
      <h3>게시판 \내부 아티클 정보작성폼</h3>
      <h3>게시판 \내부 아티클 정보작성폼</h3>
      <h3>게시판 \내부 아티클 정보작성폼</h3>
      <v-form>
        <v-text-field v-model="form.title" label="제목"></v-text-field>
        <v-text-field v-model="form.content" label="제zz목"></v-text-field>
        <!-- <editor :initialValue="form.description" /> -->
        <editor ref="editor" :options="options" />

        <!-- <v-text-field
        v-model="form.description"
        label="form.description"
      ></v-text-field> -->
        <v-btn @click="create" color="success">create</v-btn>
        <span>{{ hi }}</span>
      </v-form>
      <span>{{ articleId }}</span>
    </v-card>
  </div>
</template>

<script>
import {
  doc,
  getFire,
  store,
  onSnapshot,
  setDoc,
  onSnapshotsInSync,
  getFirestore,
  collection,
  writeBatch,
  FieldValue,
  Firestore,
  deleteField,
  updateDoc,
  increment,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
  uploadBytes,
} from "firebase/storage";

import { imgResizer } from "../../../util/imageCompress";
export default {
  // props: ["doc", "prt"],

  data() {
    return {
      form: {
        content: "",
        title: "",
        images: [],
      },
      exists: false,
      loading: false,
      ref: null,
      hi: "befo",

      options: {
        language: "ko",
        hooks: {
          addImageBlobHook: async (file, cb) => {
            const url = await this.imageUpload(file);
            cb(url, "alt_textx");
          },
        },
      },
    };
  },
  watch: {
    form() {
      this.form = this.$refs.editor.invoke("getNarkdown");
    },

    docc() {
      return this.subscribe();
    },
  },
  async created() {
    // const cityRef = doc(getFirestore(), "boards", "ar1");
    // // Remove the 'capital' field from the document
    // await updateDoc(cityRef, {
    //   name: deleteField(),
    // });

    this.subscribe();
  },
  computed: {
    articleId() {
      return this.$route.query.articleId;
    },
    docc() {
      return this.$route.params.docc;
    },
  },
  destroyed() {
    this.unsubscribe?.();
  },

  methods: {
    async imageUpload(file) {
      const thumbnail = await imgResizer(file);
      await uploadBytes(
        ref(getStorage(), "img-thumb/" + thumbnail.size),
        thumbnail
      );

      const id = new Date().getTime() + "-" + file.name;
      const storageRef = ref(getStorage(), "img/" + id);
      const sn = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(sn.ref);

      const image = {
        origin: {
          name: file.name,
          size: file.size,
          id,
          url,
        },
        thumbnail: {
          size: thumbnail.size,
          id: "",
          url: "",
        },
      };

      this.form.images.push(image);
      return url;
    },
    back() {
      var url =
        "/" + this.$route.params.collection + "/" + this.$route.params.docc;
      this.$router.push(url);
    },
    subscribe() {
      if (this.articleId === "") return;
      this.unsubscribe?.();
      const docRef = doc(
        getFirestore(),
        "boards",
        this.docc,
        "ww",
        this.articleId
      );

      const _this = this;
      this.unsubscribe = onSnapshot(
        docRef,
        function (snn) {
          if (snn.exists())
            // _this.form = { ...snn.data(), content: 1, description: 3 }; //덩어리 업데이트안됨
            _this.form.title = snn.data().title;
          _this.form.content = snn.data().content;
        }.bind(this),
        (err) => {
          debugger;
          console.error(err);
        }
      );
    },

    async create() {
      console.log("creat@@@@@@@@");
      if (!this.articleId) {
        const createdAt = new Date();
        const id = createdAt.getTime().toString();
        const fn = `${id}-${this.$store.state.fireUser.uid}.md`;
        const storage = getStorage();
        const storageRef = ref(getStorage(), "boards/" + this.docc + "/" + fn);
        const md = this.$refs.editor.invoke("getMarkdown");

        const sn = await uploadString(storageRef, md).catch((err) => {
          err;
          debugger;
        });
        const dUrl = await getDownloadURL(sn.ref);

        const docForm = {
          title: this.form.title,
          updatedAt: createdAt,
          dUrl,
          id,
          cnt: 0,
          likeCount: 0,
          likeUids: [],
        };

        const db = getFirestore();
        const rr = Firestore;

        const batch = writeBatch(db);
        if (!this.articleId) {
          // new create
          doc.createdAt = createdAt;
          doc.commentCount = 0;

          // Set the value of 'NYC'
          const nycRef = doc(getFirestore(), "boards", this.docc, "ww", id);
          batch.set(nycRef, docForm);

          // Update the population of 'SF'
          const sfRef = doc(db, "boards", "keeee");
          batch.update(sfRef, { population: 1000003 });

          const updtFieldVal = doc(db, "boards", this.docc);

          batch.update(updtFieldVal, {
            count: increment(1),
          });
          await batch.commit().catch((err) => {
            debugger;
          });
        } else {
          const nycRef = doc(getFirestore(), "boards", this.docc, "ww", id);
          batch.set(nycRef, docForm);
        }
      } else {
        3;
      }
    },
  },
};
</script>

<style></style>
