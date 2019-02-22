<template>
  <q-item class="non-selectable q-my-xs q-px-none">
    <q-item-side>
      <q-item-tile avatar>
        <img src="statics/quasar-logo.png" alt="">
      </q-item-tile>
    </q-item-side>
    <q-item-main>
      <q-item-tile label class="text-white">
        HPDell
      </q-item-tile>
      <q-item-tile sublabel class="text-white text-no-wrap">
        我们在小孩和大人的转角盖一座城堡
      </q-item-tile>
    </q-item-main>
    <q-item-side right>
      <q-btn flat label="注销" color="white" @click="logout" v-if="$store.state.userModule.token"></q-btn>
      <q-btn flat label="登陆" color="white" @click="openLoginDialog" v-else></q-btn>
    </q-item-side>
    <q-modal v-model="loginModelOpened" position="top">
      <q-card>
        <q-card-title>登陆</q-card-title>
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
          <q-btn flat label="取消" @click="closeLoginDialog"></q-btn>
        </q-card-actions>
      </q-card>
    </q-modal>
  </q-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import Axios from 'axios';
import { UserInfo } from "../model/UserInfo";

@Component
export default class UserComponent extends Vue {
  loginModelOpened: boolean = false;

  username: string = "";
  password: string = "";
  remember: boolean = false;

  openLoginDialog () {
    this.loginModelOpened = true;
  }
  closeLoginDialog () {
    this.loginModelOpened = false;
  }

  async login () {
    try {
      let response = await Axios.post<UserInfo>("/login/", {
        username: this.username,
        password: this.password
      });
      if (response.data) {
        this.$store.commit("updateUser", response.data);
        if (this.remember) {
          localStorage.setItem("remember", `${this.remember}`);
          localStorage.setItem("token", response.data.token);
        }
        this.closeLoginDialog();
      }
    } catch (error) {
      console.log("登陆失败");
      this.closeLoginDialog();
    }
  }

  async autoLogin () {
    if (localStorage.getItem("remember") === "true") {
      try {
        let response = await Axios.post<UserInfo>("/login/auto/", {
          token: localStorage.getItem("token")
        });
        if (response.data) {
          this.$store.commit("updateUser", response.data);
        }
      } catch (error) {
        console.log("登陆失败");
      }
    }
  }

  logout () {
    localStorage.removeItem("remember");
    localStorage.removeItem("token");
    this.$store.commit("logout");
  }

  mounted () {
    this.autoLogin();
  }
}
</script>

<style>
</style>
