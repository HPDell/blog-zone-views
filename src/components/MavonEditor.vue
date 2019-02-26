<template>
  <div class="flex-item-fill flex-col" @dragover="allowDrop" @drop="onDrop">
    <mavon-editor id="mavon-editor" :value="value" class="flex-item-fill" ref="editor" :toolbars="toolbars" :subfield="false" 
                  :boxShadow="false" @change="onChange"
                  @paste="onPaste" @drop="onDrop" @dragover="allowDrop"
                  :autofocus="isAutofocus"
                  ></mavon-editor>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator';
import { Picture } from '../model/Picture';
import Axios from 'axios';
import * as CodeMirror from "codemirror";
import * as $ from "jquery";

interface ToolbarConfing {
  [key: string]: boolean
}

@Component
export default class MavonEditorComponent extends Vue {
  @Prop(String) value: string;

  @Prop(Boolean) autofocus: boolean;

  content: string = "";
  toolbars: ToolbarConfing  = {
      bold: true, // 粗体
      italic: true, // 斜体
      underline: true, // 下划线
      strikethrough: true, // 中划线
      quote: true, // 引用
  }
  
  public get isAutofocus() : boolean {
    return this.autofocus ? true : false;
  }
  
  public setValue (val: string) {
    // this.editor.value(val);
  }

  mounted () {
    switch (this.$route.name) {
      case "sayings":
        Vue.set(this.toolbars, "preview", true);
        break;
      case "post-new":
      case "post-edit":
        Vue.set(this.toolbars, "mark", true);
        Vue.set(this.toolbars, "ol", true);
        Vue.set(this.toolbars, "ul", true);
        Vue.set(this.toolbars, "link", true);
        Vue.set(this.toolbars, "imagelink", true);
        Vue.set(this.toolbars, "code", true);
        Vue.set(this.toolbars, "table", true);
        Vue.set(this.toolbars, "alignleft", true);
        Vue.set(this.toolbars, "aligncenter", true);
        Vue.set(this.toolbars, "alignright", true);
      default:
        break;
    }
  }

  onChange (value: string) {
    this.$emit("input", value);
  }

  async uploadPicture (pic: File) {
    try {
      let formData = new FormData();
      formData.append("photos", pic);
      let response = await Axios.post<Picture>(`/api/picture/`, formData);
      if (response.data) {
        return response.data.id as string;
      }
    } catch (error) {
      this.$q.notify({
        message: "图片上传失败",
        type: "negative",
        position: "top"
      })
    }
  }

  insertImage (pictureID: string) {
    let pictureString = `/api/picture/${pictureID}/`;
    let editor = this.$refs.editor as any;
    if (editor) {
      editor.insertText(editor.getTextareaDom(), {
        prefix: "![](",
        str: pictureString,
        subfix: ")"
      })
    }
  }

  async onPaste (e: ClipboardEvent) {
    if (this.$route.name && this.$route.name === "sayings") {
      this.$emit("paste", e);
      return;
    }
    if (!(e.clipboardData && e.clipboardData.files)) {
      console.log(e.clipboardData.items, e.clipboardData.files)
      return;
    }
    let fileList = e.clipboardData.files;
    if (fileList.length) {
      let pasteFile = fileList[0];
      if (pasteFile.type.startsWith("image")) {
        let pictureID = await this.uploadPicture(pasteFile);
        if (pictureID) {
          this.insertImage(pictureID);
        }
      }
    }
  }

  async onDrop (editor: CodeMirror.Editor, e: DragEvent) {
    if (this.$route.name && this.$route.name === "sayings") {
      this.$emit("drop", e);
      return;
    }
    e.preventDefault();
    console.log("monaco onDrop")
    if (!(e.dataTransfer && e.dataTransfer.files)) {
      return
    }
    console.log("monaco drop transfer", e.dataTransfer.files, e.dataTransfer.items)
    let dataList = e.dataTransfer.files
    for (let i = 0; i < dataList.length; i++) {
      const element = dataList[i];
      console.log("monaco drop" + element.type)
      if (element.type.startsWith("image")) {
        let pictureID = await this.uploadPicture(element);
        if (pictureID) {
          // this.insertImage(pictureID);
        }
      }
    }
  }

  allowDrop (e: DragEvent) {
    e.preventDefault();
  }
}
</script>


<style lang="stylus">
.editor-toolbar.fullscreen, .CodeMirror-fullscreen
  z-index 6000

.CodeMirror 
  flex auto

.CodeMirror, .CodeMirror-scroll
  min-height 200px
</style>
