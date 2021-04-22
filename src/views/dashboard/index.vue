<template>
  <div class="dashboard-container">
    <div class="dashboard-text">住户总数 <el-progress :percentage="50"></el-progress></div>
     <div class="dashboard-text">员工共人数<el-progress :percentage="100" :format="format"></el-progress></div>
    <div class="dashboard-text">未处理申请数量  <el-progress :percentage="100" status="success"></el-progress></div>
    <div class="dashboard-text">未处理投诉数量 <el-progress :percentage="100" status="success"></el-progress></div>

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
    }
  };
</script>