<template>
  <q-item class="non-selectable q-my-xs q-px-none" style="width: 80%;">
    <q-item-side>
      <q-item-tile avatar>
        <img :src="avatar" alt="">
      </q-item-tile>
    </q-item-side>
    <q-item-main>
      <q-item-tile label class="text-white">
        {{ owner }} 的博客空间
      </q-item-tile>
      <q-item-tile sublabel lines="1" class="text-white text-truncate text-no-wrap">
        {{ description }}
      </q-item-tile>
    </q-item-main>
    <q-item-side right>
      <q-btn-group flat>
        <q-btn flat label="注销" color="white" @click="logout" v-if="$store.state.userModule.token"></q-btn>
        <template v-else>
          <q-btn flat label="登录" color="white" @click="openLoginPage"></q-btn>
          <q-btn flat label="注册" color="white" @click="openRegisterPage"></q-btn>
        </template>
      </q-btn-group>
    </q-item-side>
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

  owner = this.$package.meta.owner;
  description = this.$package.meta.description;

  openLoginPage () {
    this.$router.push({
      name: "login"
    })
  }

  openRegisterPage () {
    this.$router.push({
      name: "register"
    })
  }

  avatar: string = "/login/avatar/avatar.jpg";

  // get avatar () {
  //   console.log(this.$store.state.userModule.avatar)
  //   if (this.$store.state.userModule.avatar) {
  //     return `/login/avatar/${this.$store.state.userModule.avatar}`
  //   } else {
  //     return "statics/quasar-logo.png";
  //   }
  // }

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
        this.$q.notify({
          message: `自动登录失败`,
          type: "negative",
          position: "top"
        });
        this.logout();
      }
    }
  }

  logout () {
    localStorage.setItem("remember", "false");
    localStorage.setItem("token", "");
    this.$store.commit("logout");
    this.$router.push({
      name: "refresh"
    })
  }

  async mounted () {
    await this.autoLogin();
  }
}
</script>

<style>
</style>
