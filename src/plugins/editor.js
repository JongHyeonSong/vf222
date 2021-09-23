import Vue from "vue";

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr"; //한글용
import "@toast-ui/editor/dist/toastui-editor-viewer"; //뷰어
import { Editor, Viewer } from "@toast-ui/vue-editor";
Vue.component("editor", Editor);
Vue.component("viewer", Viewer);
