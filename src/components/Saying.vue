<template>
  <q-item multiline>
    <q-item-side>
      <q-item-tile avatar>
        <img src="statics/quasar-logo.png" alt="">
      </q-item-tile>
    </q-item-side>
    <q-item-main>
      <q-item-tile sublabel class="q-mb-sm non-selectable">
        <span class="q-mr-md">HPDell</span>
        <span>2019年2月3日</span>
      </q-item-tile>
      <q-item-tile>
        想把你写成一首歌，想养一只猫。想要回到每个场景，拨慢每只表。
        我们在小孩和大人的转角盖一座城堡。
        我们好好，好到疯掉，想找回失散多年双胞。
        生命再长不过烟火落下了眼角，世界再大不过你我凝视的微笑。
      </q-item-tile>
      <q-item-tile>
        <my-saying-comment></my-saying-comment>
      </q-item-tile>
    </q-item-main>
    <q-item-side right>
      <div class="row">
        <q-btn flat icon="thumb_up" size="lg"></q-btn>
      </div>
      <div class="row">      
        <q-btn flat icon="comment" size="lg"></q-btn>
      </div>
    </q-item-side>
  </q-item>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component } from "vue-property-decorator";
import SayingCommentComponent from './SayingComment.vue';

@Component({
  components: {
    "my-saying-comment": SayingCommentComponent
  }
})
export default class SayingComponent extends Vue {

}
</script>


<style>
</style>
