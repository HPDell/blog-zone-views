<template>
  <div class="fit flex-col"> 
    <q-card class="login-card">
      <q-card-title>登录</q-card-title>
      <q-list link>
        <q-item tag="label">
          <q-item-side>用户名</q-item-side>
          <q-item-main>
            <q-input type="text" v-model="username"></q-input>
          </q-item-main>
        </q-item>
        <q-item tag="label">
          <q-item-side>密码　</q-item-side>
          <q-item-main>
            <q-input type="password" v-model="password"></q-input>
          </q-item-main>
        </q-item>
        <q-item tag="label">
          <q-item-side>记住我</q-item-side>
          <q-item-main>
            <q-checkbox v-model="remember"></q-checkbox>
          </q-item-main>
        </q-item>
      </q-list>
      <q-card-actions>
        <q-btn flat label="登录" @click="login"></q-btn>
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
  remember: boolean = false;

  async login () {
    try {
      let response = await Axios.post<UserInfo>("/login/", {
        username: this.username,
        password: this.password
      });
      if (response.data) {
        this.$q.notify({
          message: `登录成功`,
          type: "positive",
          position: "top"
        });
        this.$store.commit("updateUser", response.data);
        if (this.remember) {
          localStorage.setItem("remember", `${this.remember}`);
          localStorage.setItem("token", response.data.token);
        }
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

  cancel () {
    this.$router.back();
  }
}
</script>

<style>
</style>
