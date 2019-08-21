<template>
  <div class="fit flex-col"> 
    <q-card class="login-card">
      <q-card-title>注册</q-card-title>
      <q-list link>
        <q-item tag="label">
          <q-item-main>
            <q-input float-label="用户名" type="text" v-model="username"></q-input>
          </q-item-main>
        </q-item>
        <q-item tag="label">
          <q-item-main>
            <q-input float-label="密码" type="password" v-model="password"></q-input>
          </q-item-main>
        </q-item>
        <q-item tag="label">
          <q-item-main>
            <q-input float-label="自述" type="textarea" v-model="description"></q-input>
          </q-item-main>
        </q-item>
        <!-- <q-item>
          <q-item-main>
            <q-uploader float-label="头像" ref="avatar-uploader" url="/login/avatar/" name="avatars" :send-raw="false" hide-upload-button @fail="onUploadFail"></q-uploader>
          </q-item-main>
        </q-item> -->
      </q-list>
      <q-card-actions>
        <q-btn flat label="注册" @click="login"></q-btn>
        <q-btn flat label="取消" @click="cancel"></q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style lang="stylus" scoped>
.login-card
  width 360px
  margin: auto
</style>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Axios from "axios";
import { UserInfo } from "../model/UserInfo";

@Component
export default class LoginPage extends Vue {
  username: string = "";
  password: string = "";
  description: string = "";

  async login () {
    try {
      let response = await Axios.post<UserInfo>("/login/register/", {
        username: this.username,
        password: this.password,
        description: this.description
      });
      if (response.data) {
        let uploader = this.$refs["avatar-uploader"] as any;
        if (uploader) {
          uploader.upload()
        }
        this.$q.notify({
          message: `注册成功`,
          type: "positive",
          position: "top"
        });
        this.$store.commit("updateUser", response.data);
        localStorage.setItem("token", response.data.token);
        this.cancel();
        this.$router.replace({
          name: this.$route.name,
          params: this.$route.params,
          replace: true
        });
      }
    } catch (error) {
      this.$q.notify({
        message: `登录失败`,
        type: "negative",
        position: "top"
      });
      this.cancel();
    }
  }

  onUploadFail () {
    this.$q.notify({
      message: `头像上传失败，请联系管理员解决`,
      type: "negative",
      position: "top"
    });
  }

  cancel () {
    this.$router.back();
  }
}
</script>

<style>
</style>
