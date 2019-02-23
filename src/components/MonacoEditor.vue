<template>
  <div id="monaco-editor" ref="monaco" @paste="onPaste" @drop="onDrop" @dragover="allowDrop"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import * as monaco from 'monaco-editor';
import { Picture } from '../model/Picture';
import Axios from 'axios';

@Component
export default class MonacoEditorComponent extends Vue {
  @Prop(String) value: string;

  editor!: monaco.editor.IStandaloneCodeEditor;
  pictureList: Picture[] = [];

  initMonacoEditor () {
    let editorContainer = this.$refs.monaco
    if (editorContainer) {
      this.editor = monaco.editor.create((editorContainer as HTMLElement), {
        value: this.value,
        language: "markdown",
        minimap: {
          enabled: false
        },
        lineNumbers: "off"
      });
      this.editor.onDidChangeModelContent(e => {
        this.$emit("input", this.editor.getValue());
      });
      
    }
  }

  mounted () {
    this.initMonacoEditor();
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
    let model = this.editor.getModel();
    if (model) {
      let position = this.editor.getPosition();
      if (position) {
        // model.pushEditOperations([], [{
        //   range: new monaco.Range(selection.endLineNumber, selection.endColumn, selection.endLineNumber, selection.endColumn),
        //   text: `/api/picture/${pictureID}`
        // }], (inverseEditOperations: monaco.editor.IIdentifiedSingleEditOperation[]) => {
        //   inverseEditOperations[0]
        // })
        let pictureString = `![](/api/picture/${pictureID}/)`;
        this.editor.executeEdits("", [{
          range: new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column),
          text: pictureString
        }]);
      }
    }
  }

  async onPaste (e: ClipboardEvent) {
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

  async onDrop (e: DragEvent) {
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

  allowDrop (ev: DragEvent) {
    ev.preventDefault();
  }
}
</script>


<style>
</style>
