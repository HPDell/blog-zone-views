<template>
  <q-item multiline class="relative-position">
    <q-item-side>
      <q-item-tile avatar>
        <img src="/login/avatar/avatar.jpg" alt>
      </q-item-tile>
    </q-item-side>
    <q-item-main>
      <q-item-tile sublabel>新的微文</q-item-tile>
      <saying-editor class="saying-editor q-my-sm" v-model="saying.content" @paste="onPaste" :toolbar="false" :autofocus="true"></saying-editor>
      <q-item-tile class="row q-my-sm gutter-sm" v-if="preViewPictures.length">
        <div class="col-4" v-for="(pic, index) in preViewPictures" :key="`saying-picture-preview-${index}`">
          <div class="saying-img-container">
            <img :src="pic" class="saying-img" preview="saying-new-photo">
          </div>
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
    <q-inner-loading class="editor-spinner" :visible="isUploading">
      <q-spinner-mat :size="50" color="primary"></q-spinner-mat>
    </q-inner-loading>
  </q-item>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { Saying } from "../model/Saying";
import { Picture } from "../model/Picture";
import Axios from "axios";
import MavonEditorComponent from "./MavonEditor.vue";

@Component({
  components: {
    "saying-editor": MavonEditorComponent
  }
})
export default class SayingNew extends Vue {
  saying: Saying = new Saying();
  pictures: Picture[] = [];
  preViewPictures: string[] = [];
  reader = new FileReader();
  isUploading = false;

  async submitSaying () {
    this.isUploading = true;
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
        this.isUploading = false;
        this.$emit("post-new-saying");
      }
    } catch (error) {
      this.isUploading = false;
      console.log("提交微文失败");
    };
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
          this.$q.notify({
            message: `图片${this.pictures.indexOf(pic)}提交失败`,
            type: "negative",
            position: "top"
          });
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
    let fileList = e.clipboardData.files;
    if (fileList.length) {
      let pasteFile = fileList[0];
      console.log(pasteFile.name);
      if (pasteFile.type.startsWith("image")) {
        try {
          this.reader.readAsDataURL(pasteFile);
          let pic = new Picture();
          pic.file = pasteFile;
          this.pictures.push(pic);
        } catch (error) {
          console.log(error)
        }
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

<style lang="stylus">
</style>
