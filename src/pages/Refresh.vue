<template>
  <div class="fit flex-col"> 
    
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
export default class RefreshPage extends Vue {
  username: string = "";
  password: string = "";
  remember: boolean = false;

  mounted () {
    this.$router.back();
  }
}
</script>

<style>
</style>
