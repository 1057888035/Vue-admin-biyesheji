<template>
<div class="app-container">


  <el-table
    v-loading="listLoading"
    :data="list"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row
    >

    <el-table-column align="center" label="车辆" width="80">
      <template slot-scope="scope">
        {{ scope.row.cid }}
      </template>
    </el-table-column>

    <el-table-column label="车牌号" width="115">
      <template slot-scope="scope">
        {{ scope.row.cnum }}
      </template>
    </el-table-column>

    <el-table-column label="车主姓名" width="150" align="center">
      <template slot-scope="scope">
        {{scope.row.cname}}
      </template>
    </el-table-column>

    <el-table-column label="电话号码" width="110" align="center">
      <template slot-scope="scope">
        {{ scope.row.cphone }}
      </template>
    </el-table-column>

    <el-table-column align="center" prop="created_at" label="注册时间" width="180">
      <template slot-scope="scope">
        <i class="el-icon-time" />
        <span>{{ getYearMonth(dateFormat(scope.row.cregist)) }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" prop="created_at" label="操作" width="130">
      <template  slot-scope="scope">
        
        <el-button @click="deleteOwner(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
      </template>
    </el-table-column>

  </el-table>

    <div>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="pageModel.page"
        layout="total, prev, pager, next"
        :total="pageModel.total"
        >
      </el-pagination>
    </div>
</div>
  
  
</template>

<script>
import {getAllCar, deleteCarForId ,updateCar  } from '@/api/car'


export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },

  data() {
    return {
      list: null,
      listLoading: true,
      input: '',
      addForm:{
        
      },
      inputofPhone:"",
      title:"",
      dialogAddgsVisible: false,
      // 对话框显示与否
      dialogVisible: false,
      dataloading: false,
      pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
      },
      value1: '',
      value2: '',
      value: '' ,
      pageModel: {
                page: 1,//默认当前页码
                total: 0//返回的总记录数（未分页）
            }

     
      
    }
    
  },

  created() {
    this.fetchData(1)
  },

  methods: {
      fetchData(pn){
        this.listLoading = true
        getAllCar(pn).then(response => {
          this.list = response.data.records
          this.listLoading = false
          this.pageModel.total = response.data.total
          this.pageModel.page = response.data.current
        })
      },

      //时间转换工具
      dateFormat:function(time) {
          var date=new Date(time);
          var year=date.getFullYear();
          /* 在日期格式中，月份是从0开始的，因此要加0
          * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
          * */
          var month= date.getMonth()+1<10 ? "0"+(date.getMonth()+1) : date.getMonth()+1;
          var day=date.getDate()<10 ? "0"+date.getDate() : date.getDate();
          var hours=date.getHours()<10 ? "0"+date.getHours() : date.getHours();
          var minutes=date.getMinutes()<10 ? "0"+date.getMinutes() : date.getMinutes();
          var seconds=date.getSeconds()<10 ? "0"+date.getSeconds() : date.getSeconds();
          // 拼接
          return year+"-"+month+"-"+day+" "+hours+":"+minutes+":"+seconds;
      },

      getYearMonth(date){
          date = (date + '').slice(0, 10);
          return date;
       },
        //页码改变时操作函数
      handleCurrentChange(currentpage) {
        //重新调用getList()向后台发出请求，获取最新分页的数据
        this.pageModel.page = currentpage
        this.fetchData( this.pageModel.page)
       },

      deleteOwner(car){
        this.$confirm('此操作将永久删除'+car.cname+' 这个用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteCarForId(car.cid).then(response => {
            this.fetchData( this.pageModel.page)
            this.$message({
             type: 'success',
             message: '删除成功!'
             });
          }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
           });          
         });
        })
       
       },




  }
}

 
</script>
