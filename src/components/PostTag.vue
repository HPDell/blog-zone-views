<template>
  <q-list no-border :separator="separator">
    <div class="row">
      <q-list-header class="col">标签</q-list-header>
      <div class="flex-row vertical-center">
        <q-btn flat rounded dense :icon="editMode ? 'close' : 'edit'" color="primary" size="md" @click="editMode = !editMode" v-if="!edit && $store.state.userModule.canEdit"></q-btn>
      </div>
    </div>
    <q-item class="tag-item" v-for="tag in tags" :key="`post-tag-${tag.id}`" :link="linkable && !editMode" :to="tagTo(tag)">
      <q-item-main>
        <q-item-tile class="flex-row vertical-center">
          <div class="flex-item-fill">
            <span :class="{'tag-highlight': isTagHighlight(tag)}">{{tag.name}}{{ tag.postNums ? `（${tag.postNums}）` : "" }}</span>
          </div>
          <div>
            <q-btn v-show="editMode" class="q-mr-xs" flat rounded dense icon="edit" color="primary" size="md" @click="editTag(tag.id, tag.name)"></q-btn>
            <q-btn v-show="editMode" class="q-mr-xs" flat rounded dense icon="delete" color="negative" size="md" @click="deleteTag(tag.id)"></q-btn>
          </div>
        </q-item-tile>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { Tag } from '../model/Tag';

@Component
export default class PostTagComponent extends Vue {
  @Prop(Array) readonly postTagIDs: string[];
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
  
  public get highlightID() : string[] {
    return this.postTagIDs ? [...this.postTagIDs] : [];
  }
  
  get tagTo () {
    return (tag: Tag) => {
      console.log("this.linkable, this.editMode", this.linkable, this.editMode);
      if (this.linkable && !this.editMode) {
        return {'name': 'posts', 'query': {'tag': tag.name}}
      } else {
        return undefined;
      }
    }
  }

  get tags (): Tag[] {
    return this.$store.state.tags;
  }

  get isTagHighlight () {
    return (tag: Tag) => {
      return this.highlightID.findIndex(i => tag.id === i) > -1;
    }
  }

  async editTag (id: string, oldName: string) {
    let name = await this.$q.dialog({
      title: "添加分类",
      message: "请输入分类名称",
      prompt: {
        model: oldName,
        type: "text"
      }
    });
    this.$store.dispatch("editTag", {id, name});
  }

  async deleteTag (id: string) {
    try {
      await this.$q.dialog({
        title: "确定删除标签？",
        message: "此操作不可恢复",
        cancel: true
      });
      await this.$store.dispatch("deleteTag", id)
    } catch (error) {
      
    }
  }

  mounted () {
    this.$store.dispatch("getTags");
  }

}
</script>

<style lang="stylus">
@import '~variables'
.tag-item
  font-size 0.9rem
  padding-bottom 0.2rem
  padding-top 0.2rem
  padding-right 0rem
  min-height 36px

.tag-highlight
  color $primary
</style>
