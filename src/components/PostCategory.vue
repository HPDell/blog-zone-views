<template>
  <q-list no-border>
    <div class="row">
      <q-list-header class="col">分类</q-list-header>
      <div class="flex-row vertical-center">
        <q-btn flat round dense :icon="editMode ? 'close' : 'edit'" color="primary" size="sm" @click="editMode = !editMode"></q-btn>
      </div>
    </div>
    <q-item class="category-item" v-for="category in categories" :key="`post-category-${category.id}`" :link="!editMode">
      <q-item-main>
        <q-item-tile class="flex-row vertical-center">
          <div class="flex-item-fill">
            <span :class="{'category-highlight': category.id === highlightID}">{{category.name}}</span>
          </div>
          <div>
            <q-btn v-show="editMode" flat round dense icon="edit" color="primary" size="sm" @click="editCategory(category.id, category.name)"></q-btn>
            <q-btn v-show="editMode" flat round dense icon="delete" color="negative" size="sm" @click="deleteCategory(category.id)"></q-btn>
          </div>
        </q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { Category } from '../model/Category';

@Component
export default class PostCategoryComponent extends Vue {
  @Prop(String) readonly postCategoryID: string = "";
  editMode: boolean = false;
  
  public get highlightID() : string {
    console.log(this.postCategoryID);
    return `${this.postCategoryID}`;
  }
  

  get categories (): Category[] {
    return this.$store.state.categories;
  }

  async editCategory (id: string, oldName: string) {
    let name = await this.$q.dialog({
      title: "添加分类",
      message: "请输入分类名称",
      prompt: {
        model: oldName,
        type: "text"
      }
    });
    this.$store.dispatch("editCategory", {id, name});
  }

  deleteCategory (id: string) {
    this.$store.dispatch("deleteCategory", id)
  }

}
</script>

<style lang="stylus">
@import '~variables'
.category-item
  font-size 0.9rem
  padding-bottom 0.2rem
  padding-top 0.2rem
  padding-right 0rem
  min-height 36px

.category-highlight
  color $primary
</style>
