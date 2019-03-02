<template>
  <q-list no-border :separator="separator">
    <div class="row">
      <q-list-header class="col">分类</q-list-header>
      <div class="flex-row vertical-center">
        <q-btn flat rounded dense :icon="editMode ? 'close' : 'edit'" color="primary" size="md" @click="editMode = !editMode" v-if="!edit && $store.state.userModule.canEdit"></q-btn>
      </div>
    </div>
    <q-item class="category-item" v-for="category in categories" :key="`post-category-${category.id}`" :link="linkable && !editMode" :to="categoryTo(category)">
      <q-item-main>
        <q-item-tile class="flex-row vertical-center">
          <div class="flex-item-fill">
            <span :class="{'category-highlight': category.id === highlightID}">{{category.name}}{{ category.postNums ? `（${category.postNums}）` : "" }}</span>
          </div>
          <div>
            <q-btn v-show="editMode" class="q-mr-xs" flat rounded dense icon="edit" color="primary" size="md" @click="editCategory(category.id, category.name)"></q-btn>
            <q-btn v-show="editMode" class="q-mr-xs" flat rounded dense icon="delete" color="negative" size="md" @click="deleteCategory(category.id)"></q-btn>
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
  @Prop(String) readonly postCategoryID: string;
  @Prop(Boolean) readonly link: boolean;
  @Prop(Boolean) readonly edit: boolean;
  @Prop(Boolean) readonly showSeparator: boolean;

  get separator (): boolean {
    return (typeof this.showSeparator == undefined) ? false : this.showSeparator
  }

  get linkable (): boolean { 
    return (typeof this.link == undefined) ? false : this.link
  }

  get editable (): boolean { 
    return (typeof this.edit == undefined) ? false : this.edit
  }

  editMode: boolean = this.editable;
  
  public get highlightID() : string {
    return `${this.postCategoryID}`;
  }
  
  get categoryTo () {
    return (category: Category) => {
      console.log("this.linkable, this.editMode", this.linkable, this.editMode);
      if (this.linkable && !this.editMode) {
        return {'name': 'posts', 'query': {'category': category.id}}
      } else {
        return undefined;
      }
    }
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

  async deleteCategory (id: string) {
    try {
      await this.$q.dialog({
        title: "确定删除分类？",
        message: "此操作不可恢复",
        cancel: true
      });
      await this.$store.dispatch("deleteCategory", id)
    } catch (error) {
    }
  }

  mounted () {
    this.$store.dispatch("getCategories");
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
