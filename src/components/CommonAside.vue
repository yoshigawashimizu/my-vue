<template>
  <el-aside :width="$store.state.isCollapse ? '64px' : '180px'">
    <!-- Aside菜单区 -->
    <el-menu
      class="el-menu-vertical-demo"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
      :collapse="$store.state.isCollapse"
      :collapse-transition="false"
    >
      <h3 v-show="$store.state.isCollapse">后台</h3>
      <h3 v-show="!$store.state.isCollapse">后台管理</h3>
      <el-menu-item
        v-for="item in noChildren()"
        :index="item.path"
        :key="item.path"
        @click="clickMenu(item)"
      >
        <!-- 菜单图标 -->
        <component class="icons" :is="item.icon"></component>
        <span>{{ item.label }}</span>
      </el-menu-item>

      <!-- 二级菜单 -->
      <el-sub-menu
        v-for="item in hasChildren()"
        :index="item.path"
        :key="item.path"
      >
        <template #title>
          <!-- 菜单图标 -->
          <component class="icons" :is="item.icon"></component>
          <span>{{ item.label }}</span>
        </template>

        <el-menu-item-group>
          <el-menu-item
            v-for="(subItem, subIndex) in item.children"
            :index="subItem.path"
            :key="subItem.path"
            @click="clickMenu(subItem)"
          >
            <component class="subIcons" :is="subItem.icon"></component>
            <span>
              {{ subItem.label }}
            </span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  setup() {
    // 路由对象
    const router = useRouter();
    const store = useStore();
    

    // 菜单数据 死数据
    /*     const list = [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "House",
        url: "Home",
      },
      {
        path: "/mall",
        name: "mall",
        label: "商品管理",
        icon: "video-play",
        url: "Mall",
      },
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        url: "User",
      },
      {
        label: "其他",
        icon: "location",
        children: [
          {
            path: "/page1",
            name: "page1",
            label: "页面1",
            icon: "setting",
            url: "other/Page1",
          },
          {
            path: "/page2",
            name: "page2",
            label: "页面2",
            icon: "setting",
            url: "other/Page2",
          },
        ],
      },
    ]; */
    // 菜单数据 从后端获取到的
    const asyncList = store.state.menu;
    console.log(asyncList);

    // 无二级菜单
    const noChildren = () => {
      return asyncList.filter((item) => {
        console.log(!item.children);
        return !item.children;
      });
    };
    // 有二级菜单
    const hasChildren = () => {
      return asyncList.filter((item) => {
        console.log(item.children);
        return item.children;
      });
    };
    // 获取菜单名称
    const clickMenu = (item) => {
      router.push({
        name: item.name,
      });
      store.commit("selectMenu", item);
    };
    return {
      noChildren,
      hasChildren,
      clickMenu,
    };
  },
};
</script>

<style lang="less">
.el-menu-vertical-demo {
  border-right: none;

  h3 {
    line-height: 48px;
    color: #fff;
    text-align: center;
  }
  .icons {
    width: 28px;
    height: 28px;
  }
  .subIcons {
    width: 28px;
    height: 28px;
  }
}
</style>