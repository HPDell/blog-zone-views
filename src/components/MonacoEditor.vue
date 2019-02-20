<template>
  <div id="monaco-editor" ref="monaco"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import * as monaco from 'monaco-editor';

@Component
export default class MonacoEditorComponent extends Vue {
  @Prop(String) value: string;

  editor!: monaco.editor.IStandaloneCodeEditor;

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
      })
    }
  }

  mounted () {
    this.initMonacoEditor();
  }
}
</script>


<style>
</style>
