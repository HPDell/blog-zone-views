<template>
  <q-item multiline>
    <q-item-side>
      <q-item-tile avatar>
        <img src="statics/quasar-logo.png" alt>
      </q-item-tile>
    </q-item-side>
    <q-item-main>
      <q-item-tile sublabel>新的微文</q-item-tile>
      <q-input type="textarea" v-model="saying.content" autofocus @paste="onPaste"></q-input>
      <q-item-tile class="row q-my-sm gutter-sm" v-if="preViewPictures.length">
        <div class="col-4" v-for="(pic, index) in preViewPictures" :key="`saying-picture-preview-${index}`">
          <img :src="pic" style="width: 100%;" preview="saying-new-photo">
        </div>
      </q-item-tile>
      <input v-for="(pic, index) in pictures" :key="`saying-picture-${index}`" 
             type="file" :id="`image-input-${index}`" name="photo"
             v-show="false"/>
    </q-item-main>
    <q-item-side right>
      <div class="row"><q-btn flat round dense icon="check" @click="submitSaying"></q-btn></div>
      <div class="row"><q-btn flat round dense icon="photo" @click="addPicture"></q-btn></div>
      <div class="row"><q-btn flat round dense icon="close" @click="cancelNewSaying"></q-btn></div>
    </q-item-side>
  </q-item>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Saying } from "../model/Saying";
import { Picture } from "../model/Picture";
import Axios from "axios";

@Component
export default class SayingNew extends Vue {
  saying: Saying = new Saying();
  pictures: Picture[] = [];
  preViewPictures: string[] = [];
  reader = new FileReader();

  async submitSaying () {
    try {
      let response = await Axios.post<Saying>("/api/saying/", this.saying);
      if (response.data) {
        let successNum = 0;
        try {
          console.log("提交图片");
          successNum = await this.submitPictures(response.data.id);
        } catch (error) {
          console.log(`提交图片出错，成功${successNum}`);
        }
        this.$emit("post-new-saying");
      }
    } catch (error) {
      console.log("提交微文失败");
    }
  }

  addPicture () {
    if (this.pictures.length) {
      if (this.pictures.length >= 9) {
        return;
      } else {
        let lastIndex = this.pictures.length - 1;
        if (this.pictures[lastIndex].file) {
          this.pictures.push(new Picture());
        } else {
          this.pictures.splice(lastIndex, 1, new Picture());
        }
      }
    } else {
      this.pictures.push(new Picture());
    }
    let index = this.pictures.length - 1;
    setTimeout(() => {
      let imageInput = document.getElementById(`image-input-${index}`);
      if (imageInput) {
        let self = this;
        imageInput.onchange = function () {
          let uploadElement = this as any;
          let fileList = uploadElement.files as FileList;
          if (fileList.length) {
            let pic = self.pictures[index];
            pic.file = fileList[0];
            self.reader.readAsDataURL(pic.file);
          }
        }
        imageInput.click();
      }
    }, 100);
  }

  async submitPictures (saying: string) {
    let successNum = 0;
    for (const pic of this.pictures) {
      if (pic.file) {
        try {
          let formData = new FormData();
          formData.append("photos", pic.file);
          let response = await Axios.post<Picture>(`/api/picture/`, formData, {
            params: {
              saying: saying
            }
          });
          if (response.data) {
            this.saying.pictures.push(response.data);
            successNum = successNum + 1;
          }
        } catch (error) {
          console.log(`图片${this.pictures.indexOf(pic)}提交失败`, error);
        }
      }
    }
    return successNum;
  }

  cancelNewSaying () {
    this.$emit("cancel-new-saying");
  }

  onPaste (e: ClipboardEvent) {
    if (!(e.clipboardData && e.clipboardData.items)) {
      return;
    }
    let dataList = e.clipboardData.items;
    if (dataList.length) {
      let pasteData = dataList[0];
      if (pasteData.kind === "file" && pasteData.type.startsWith("image")) {
        let pasteFile = pasteData.getAsFile();
        if (pasteFile) {
          let pic = new Picture();
          pic.file = pasteFile;
          this.pictures.push(pic);
          this.reader.readAsDataURL(pasteFile);
        }
      }
    }
    let fileList = e.clipboardData.files;
    if (fileList.length) {
      let pasteFile = fileList[0];
      if (pasteFile.type.startsWith("image")) {
        let pic = new Picture();
        pic.file = pasteFile;
        this.pictures.push(pic);
        this.reader.readAsDataURL(pasteFile);
      }
    }
  }

  onDrop (e: DragEvent) {
    e.preventDefault();
    if (!(e.dataTransfer && e.dataTransfer.files)) {
      return
    }
    let dataList = e.dataTransfer.files
    for (let i = 0; i < dataList.length; i++) {
      const element = dataList[i];
      if (element.type.startsWith("image")) {
        let pic = new Picture();
        pic.file = element;
        this.pictures.push(pic);
        this.reader.readAsDataURL(element);
      }
    }
  }

  allowDrop (ev: DragEvent) {
    ev.preventDefault();
  }

  mounted () {
    let self = this;
    this.reader.onload = function () {
      let dataUrl = this.result as string;
      self.preViewPictures.push(dataUrl);
    }
  }
}
</script>
