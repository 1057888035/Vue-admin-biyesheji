<template>
  <div class="dashboard-container">
    <div class="dashboard-text">住户总数 <el-progress :percentage="50"></el-progress></div>
     <div class="dashboard-text">员工共人数<el-progress :percentage="100" :format="format"></el-progress></div>
    <div class="dashboard-text">未处理申请数量  <el-progress :percentage="100" status="success"></el-progress></div>
    <div class="dashboard-text">已解决投诉 <br> <el-progress type="circle" :percentage="25"></el-progress></div>
<div class="dashboard-text">计划  
  <el-timeline :reverse="reverse">
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :timestamp="activity.timestamp">
      {{activity.content}}
    </el-timeline-item>
  </el-timeline></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}

</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
<script>
  export default {
    methods: {
      format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
      }
    },

       data() {
          return {
            reverse: true,
            activities: [{
              content: '活动按期开始',
              timestamp: '2021-04-27'
            }, {
              content: '通过审核',
              timestamp: '2021-04-27'
            }, {
              content: '创建成功',
              timestamp: '2021-04-27'
            }]
      };
    }
  };

  
</script>