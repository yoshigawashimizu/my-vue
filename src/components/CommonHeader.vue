<template>
  <el-header>
    <div class="l-content">
      <!-- 左-按钮 -->
      <el-button size="small" plain @click="handleCollapse">
        <!-- 按钮图标 -->
        <el-icon :size="20">
          <Menu />
        </el-icon>
      </el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/" class="bread">
        <!-- 首页 写死 -->
        <el-breadcrumb-item :to="{ path: '/' }">首页 </el-breadcrumb-item>
        <el-breadcrumb-item :to="current.path" v-if="current"
          >{{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="r-content">
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <!-- 用户头像 -->
          <img
            class="user-picture"
            :src="getImgSrc('userPicture')"
            alt="用户头像"
          />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout"
              >退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import { computed, defineComponent } from "vue-demi";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    let store = useStore();
    let router = useRouter();
    let getImgSrc = (userPicture) => {
      return new URL(`../assets/images/${userPicture}.png`, import.meta.url)
        .href;
    };
    let handleCollapse = () => {
      // 调用vuex中的mutations
      store.commit("updateIsCollapse");
    };
    // 计算属性

    const current = computed(() => {
      console.log("currentMenu的值:", store.state.currentMenu);
      return store.state.currentMenu;
    });
    const handleLogout = () => {
      store.commit("cleanMenu");
      router.push({
        name: "login",
      });
    };
    return {
      getImgSrc,
      handleCollapse,
      current,
      handleLogout,
      router,
    };
  },
};
</script>
<style lang='less' scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: #333;
}
.r-content {
  .user-picture {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
  h3 {
    color: #fff;
  }
}
/*
 .bread /deep/ span {
  color: #fff !important;
  cursor: pointer;

  /deep/写法已经改写成↓
} */
:deep(.bread span) {
  color: #fff !important;
  cursor: pointer;
}
</style>