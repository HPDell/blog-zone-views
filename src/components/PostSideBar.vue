<template>
  <div>
    <my-post-category :postCategoryID="postCategoryID" :link="true"></my-post-category>
    <q-list no-border>
      <q-list-header>标签</q-list-header>
    </q-list>
    <q-list no-border>
      <q-list-header>目录</q-list-header>
      <q-item class="toc-container" v-if="toc">
        <q-list class="q-py-none" no-border>
          <template v-for="(h1, ih1) in toc.children">
            <q-item class="toc-item-content all-pointer-events" :key="h1.id" multiline link @click.native="tocItemClick(h1.id)">
              <q-item-side class="toc-item-side">{{ ih1 + 1 }}.</q-item-side>
              <q-item-main>
                <q-item-tile label>
                  {{ h1.text }}
                </q-item-tile>
              </q-item-main>
            </q-item>
            <q-item class="q-py-none q-pr-none" v-if="h1.children && h1.children.length" :key="`${h1.id}-children`">
              <q-item-side class="toc-item-side"></q-item-side>
              <q-item-main class="toc-item-children">
                <q-list class="q-py-none" no-border>
                  <template v-for="(h2, ih2) in h1.children">
                    <q-item class="toc-item-content all-pointer-events" :key="h2.id" multiline link @click.native="tocItemClick(h2.id)">
                      <q-item-side class="toc-item-side">{{ih1 + 1}}.{{ ih2 + 1 }}.</q-item-side>
                      <q-item-main>
                        <q-item-tile label>
                          {{ h2.text }}
                        </q-item-tile>
                      </q-item-main>
                    </q-item>
                    <q-item class="q-py-none q-pr-none" v-if="h2.children && h2.children.length" :key="`${h2.id}-children`">
                      <q-item-side class="toc-item-side"></q-item-side>
                      <q-item-main class="toc-item-children">
                        <q-list class="q-py-none" no-border>
                          <template v-for="(h3, ih3) in h2.children">
                            <q-item class="toc-item-content all-pointer-events" :key="h3.id" multiline link @click.native="tocItemClick(h3.id)">
                              <q-item-side class="toc-item-side">{{ih1 + 1}}.{{ih2 + 1}}.{{ ih3 + 1 }}.</q-item-side>
                              <q-item-main>
                                <q-item-tile label>
                                  {{ h3.text }}
                                </q-item-tile>
                              </q-item-main>
                            </q-item>
                          </template>
                        </q-list>
                      </q-item-main>
                    </q-item>
                  </template>
                </q-list>
              </q-item-main>
            </q-item>
          </template>
        </q-list>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';
import { PostMenuItem } from '../../typings/vue';
import PostCategoryComponent from './PostCategory.vue';
import { Category } from '../model/Category';

@Component({
  components: {
    "my-post-category": PostCategoryComponent
  }
})
export default class PostSideBarComponent extends Vue {
  @Prop(Object) readonly postTOC: PostMenuItem;
  @Prop(Object) readonly postCategory: Category = new Category();

  get postCategoryID () {
    return this.postCategory ? `${this.postCategory.id}` : "default";
  }

  public get toc() : PostMenuItem {
    return this.postTOC;
  }
  
  tocItemClick (id: string) {
    let element = document.getElementById(id);
    if (element) {
      let rect = element.offsetTop
      scrollTo(0, rect - 70);
    }
  }
}
</script>


<style lang="stylus">
@import '~variables'
.toc-item-side
  min-width 0.8rem
  color $primary

.toc-container
  padding 0px 16px

.toc-item-content
  font-size 0.9rem
  padding .2rem 0rem
  min-height auto

.toc-item-children
  margin-left 0px !important
</style>
