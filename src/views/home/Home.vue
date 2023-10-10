<template>
  <!-- 只有一行 -->
  <el-row class="home" :gutter="20">
    <!-- 左列 占三分之一 -->
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover">
        <div class="user">
          <img src="../../assets/images/userPicture.png" alt="" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>2022-7-11</span></p>
          <p>上次登录地点: <span>北京</span></p>
        </div>
      </el-card>
      <!-- 左下 -->
      <el-card shadow="hover" style="margin-top: 20px" height="450px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右列 占三分之二 -->
    <el-col :span="16" style="margin-top: 20px">
      <div class="num">
        <el-card
          :body-style="{ display: 'flex', padding: 0 }"
          v-for="item in countData"
          :key="item.name"
        >
          <component
            class="icons"
            :is="item.icon"
            :style="{ background: item.color }"
          ></component>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>

      <!-- 折线图 -->
      <el-card style="height: 280px">
        <div ref="echarts" style="height: 280px"></div>
      </el-card>

      <div class="graph">
        <!-- 柱状图 -->
        <el-card style="height: 260px">
          <div ref="userecharts" style="height: 240px"></div
        ></el-card>
        <!-- 饼状图 -->
        <el-card style="height: 260px"
          ><div ref="videoecharts" style="height: 240px"></div
        ></el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";
import * as echarts from "echarts";
export default defineComponent({
  setup() {
    const { proxy } = getCurrentInstance();
    let tableData = ref([
      /* {
        name: "oppo",
        todayBuy: 500,
        monthBuy: 3500,
        totalBuy: 22000,
      },
      {
        name: "vivo",
        todayBuy: 300,
        monthBuy: 3500,
        totalBuy: 22000,
      },
      {
        name: "苹果",
        todayBuy: 500,
        monthBuy: 3500,
        totalBuy: 22000,
      },
      {
        name: "小米",
        todayBuy: 500,
        monthBuy: 3500,
        totalBuy: 22000,
      },
      {
        name: "三星",
        todayBuy: 500,
        monthBuy: 3500,
        totalBuy: 22000,
      },
      {
        name: "魅族",
        todayBuy: 500,
        monthBuy: 3500,
        totalBuy: 22000,
      }, */
    ]);
    let countData = ref([]);
    const tableLabel = {
      name: "品牌",
      todayBuy: "今日购买",
      monthBuy: "本月购买",
      totalBuy: "总购买",
    };
    /* 本地mock 
    const getTableList = async () => {
      await axios.get("/home/getData").then((res) => {
        console.log(res.data.data);
        tableData.value = res.data.data.tableData;
        
      });
    }; */
    /* 在线mock */
    const getTableList = async () => {
      // await axios
      //   .get("https://yapi.pro/mock/127934/api/home/getData")
      //   .then((res) => {
      //     console.log("res数据", res);
      //     if (res.data.code === 200) {
      //       console.log("数据获取成功");
      //       tableData.value = res.data.data.tableData;
      //     }
      //   });
      let res = await proxy.$api.getTableData();
      console.log("表格数据res", res);
      tableData.value = res.tableData;
    };

    // 获取右上数据
    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      console.log("获取到的右上数据", res);
      countData.value = res;
    };
    onMounted(() => {
      getTableList();
      getCountData();
      // 获取echarts表格数据
      getChartData();
    });

    // echarts表格的渲染部分
    let xOptions = reactive({
      textStyle: {
        color: "#333",
      },
      grid: {
        left: "20%",
      },

      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", //类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "ffb980", "d87a80", "#8d98b3"],
      series: [
        /* {
          name: "新增用户",
          type: "bar",
          data: userData.map((item) => item.new),
        },
        {
          name: "活跃用户",
          type: "bar",
          data: userData.map((item) => item.active),
        }, */
      ],
    });
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      /* label: {
        show: false,
        position: "center",
      }, */
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [],
    });
    let orderData = reactive({
      xData: [],
      series: [],
    });
    let userData = reactive({
      xData: [],
      series: [],
    });
    let videoData = reactive({
      series: [],
    });

    // 获取Echarts数据
    const getChartData = async () => {
      let result = await proxy.$api.getChartData();
      console.log("获取Echarts数据 result:", result);
      let res = result.orderData;
      let userRes = result.userData;
      let videoRes = result.videoData;
      orderData.xData = res.date;
      const keyArray = Object.keys(res.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: res.data.map((item) => item[key]),
          type: "line",
        });
      });
      orderData.series = series;
      xOptions.xAxis.data = orderData.xData;
      xOptions.series = orderData.series;
      let hEcharts = echarts.init(proxy.$refs["echarts"]);
      hEcharts.setOption(xOptions);

      // 柱状图进行渲染
      userData.xData = userRes.map((item) => item.date);
      userData.series = [
        {
          name: "新增用户",
          data: userRes.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: userRes.map((item) => item.active),
          type: "bar",
        },
      ];
      xOptions.xAxis.data = userData.xData;
      xOptions.series = userData.series;
      let uEcharts = echarts.init(proxy.$refs["userecharts"]);
      uEcharts.setOption(xOptions);

      // 饼状图
      videoData.series = [
        {
          data: videoRes,
          type: "pie",
        },
      ];
      pieOptions.series = videoData.series;
      let vEcharts = echarts.init(proxy.$refs["videoecharts"]);
      vEcharts.setOption(pieOptions);
    };
    return {
      tableData,
      tableLabel,
      countData,
    };
  },
});
</script>

<style lang="less">
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
  }
  .login-info {
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .num {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 32%;
      margin-bottom: 20px;
    }
    .icons {
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #fff;
    }
    .detail {
      margin-left: 15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .price {
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt {
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 48%;
    }
  }
}
</style>