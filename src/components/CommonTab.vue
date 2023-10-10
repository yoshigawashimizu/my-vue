<template>
  <div class="tags">
    <el-tag
      v-for="(tag, index) in tags"
      :key="tags.name"
      :closable="tag.name !== 'home'"
      :disable-transitions="false"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>
<script>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const tags = store.state.tabsList;
    const changeMenu = (item) => {
      router.push({ name: item.name });
    };
    const handleClose = (tag, index) => {
      let length = tags.length - 1;
      // 处理vuex中的tabsList
      store.commit("closeTab", tag);
      // 判断:删除非当前页
      if (tag.name !== route.name) {
        return;
      }
      // 判断:删除最后页
      if (index == length) {
        router.push({
          name: tags[index - 1].name,
        });
      } else {
        // 判断:删除中间页
        router.push({
          name: tags[index].name,
        });
      }
    };
    return {
      tags,
      changeMenu,
      handleClose,
    };
  },
};
</script>

<style lang="less">
.tags {
  padding: 20px;
  width: 100%;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>