<template>
  <div id="editor-container" class="flex-item-fill flex-col">
    <textarea id="simple-mde" @paste="onPaste" @drop="onDrop" @dragover="allowDrop"></textarea>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator';
import * as SimpleMDE from 'simplemde';
import { Picture } from '../model/Picture';
import Axios from 'axios';
import * as CodeMirror from "codemirror";
import "simplemde/dist/simplemde.min.css"

@Component
export default class SimpleMDEComponent extends Vue {
  @Prop(String) value: string;

  editor!: SimpleMDE;
  pictureList: Picture[] = [];

  initSimpleMDE () {
    let editorContainer = document.getElementById("simple-mde")
    if (editorContainer) {
      this.editor = new SimpleMDE({
        element: editorContainer,
        autofocus: true,
        status: false,
        spellChecker: false,
        toolbar: ["bold", "italic", "strikethrough", 
          "heading", "heading-1", "heading-2", "heading-3", 
          "code", "quote", "unordered-list", "ordered-list", "clean-block", "link", "image",
          "table", "horizontal-rule", "fullscreen"]
      })
      let codemirror = this.editor.codemirror as CodeMirror.Editor;
      codemirror.on("change", () => {
        this.$emit("input", this.editor.value());
      });
      codemirror.on("paste", this.onPaste);
      codemirror.on("drop", this.onDrop);
      codemirror.on("dragover", this.allowDrop);
    }
  }

  public setValue (val: string) {
    this.editor.value(val);
  }

  mounted () {
    this.initSimpleMDE();
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
    let pictureString = `![](/api/picture/${pictureID}/)`;
    (this.editor.codemirror as CodeMirror.Editor).getDoc().replaceSelection(pictureString);
  }

  async onPaste (editor: CodeMirror.Editor, e: ClipboardEvent) {
    console.log("onpaste")
    if (!(e.clipboardData && e.clipboardData.items)) {
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
          this.insertImage(pictureID);
        }
      }
    }
  }

  allowDrop (editor: CodeMirror.Editor, e: DragEvent) {
    e.preventDefault();
  }
}
</script>


<style lang="stylus">
#simple-mde
  max-height 0px;

.editor-toolbar.fullscreen, .CodeMirror-fullscreen
  z-index 6000

.CodeMirror
  height calc(100vh - 240px)
  // flex auto
  // -ms-flex auto
</style>
