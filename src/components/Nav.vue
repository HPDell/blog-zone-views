<template>
  <q-list link>
    <q-item>
      <q-item-side icon="comment"></q-item-side>
      <q-item-main>
        <q-item-tile label>动态</q-item-tile>
      </q-item-main>
    </q-item>
    <q-item :to="{'name': 'sayings'}">
      <q-item-side icon="comment"></q-item-side>
      <q-item-main>
        <q-item-tile label>微文</q-item-tile>
      </q-item-main>
    </q-item>
    <q-item :to="{'name': 'posts'}">
      <q-item-side icon="comment"></q-item-side>
      <q-item-main>
        <q-item-tile label>博文</q-item-tile>
      </q-item-main>
    </q-item>
    <q-item>
      <q-item-side icon="comment"></q-item-side>
      <q-item-main>
        <q-item-tile label>相册</q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {}
  }
}
</script>

<style>
</style>
