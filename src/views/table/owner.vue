<template>
<div class="app-container">


  <el-input v-model="inputofPhone" placeholder="请输入要查询的手机号"  maxlength="11"  style="width:300px"></el-input>
  <el-button type="primary" icon="el-icon-search" @click="searchOwner(inputofPhone)">搜索</el-button>
  <el-button  type="success" @click="addOwnerForm()" icon="el-icon-edit" style="margin:2px">增加业主</el-button>
    <el-dialog
      :title="title"
      width="30%"
      :visible.sync="dialogAddgsVisible"
      @close="closeDialogAddgsVisible"
      :modal-append-to-body="false"
      >
      <el-form :model="addForm"  ref="addForm" label-width="100px">
        <el-form-item label="用户名" prop="oUser">
          <el-input style="width: 75%" v-model="addForm.oUser"></el-input>
        </el-form-item>
      

        <el-form-item label="用户密码" prop="oPassword">
          <el-input style="width: 75%" v-model="addForm.oPassword"></el-input>
        </el-form-item>

        <el-form-item label="业主姓名" prop="oName">
          <el-input style="width: 75%" v-model="addForm.oName"></el-input>
        </el-form-item>

         <el-form-item label="手机号码" prop="oPhone">
          <el-input style="width: 75%" v-model="addForm.oPhone" maxlength="11"></el-input>
        </el-form-item>

        <el-form-item label="出生日期" prop="oBirthday">
          <div class="block">
            <el-date-picker
             v-model="addForm.oBirthday"
             type="date"
             placeholder="选择日期"
            >
            </el-date-picker>
          </div>
        </el-form-item>

        <el-form-item label="籍贯" prop="oHometown">
          <el-input style="width: 75%" v-model="addForm.oHometown"></el-input>
        </el-form-item>

        <el-form-item label="身份证号码" prop="oIdcar">
          <el-input style="width: 75%" v-model="addForm.oIdcar"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddgsVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAddForm()">确 定</el-button>
      </span>

    </el-dialog>

  <el-table
    v-loading="listLoading"
    :data="list"
    element-loading-text="Loading"
    border
    fit
    highlight-current-row
    >

    <el-table-column align="center" label="业主ID" width="80">
      <template slot-scope="scope">
        {{ scope.row.oid }}
      </template>
    </el-table-column>

    <el-table-column label="业主姓名" width="115">
      <template slot-scope="scope">
        {{ scope.row.oname }}
      </template>
    </el-table-column>

    <el-table-column label="出生日期" width="150" align="center">
      <template slot-scope="scope">
        <i class="el-icon-time" />
        <span>{{ getYearMonth(dateFormat(scope.row.obirthday)) }}</span>
      </template>
    </el-table-column>

    <el-table-column label="电话号码" width="110" align="center">
      <template slot-scope="scope">
        {{ scope.row.ophone }}
      </template>
    </el-table-column>

    <el-table-column align="center" prop="created_at" label="身份证号" width="180">
      <template slot-scope="scope">
        {{scope.row.oidcar}}
      </template>
    </el-table-column>


    <el-table-column align="center" prop="created_at" label="籍贯" width="400">
      <template slot-scope="scope">
        <span>{{ scope.row.ohometown }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" prop="created_at" label="状态" width="100">
      <template slot-scope="scope">
        <el-tag :type="scope.row.ostate | statusFilter">
            {{getStatus(scope.row.ostate) }}
        </el-tag>
      </template>
    </el-table-column>


    <el-table-column align="center" prop="created_at" label="操作" width="130">
      <template  slot-scope="scope">
        <el-switch
          v-model="scope.row.ostate"
          :active-value="0"
          :inactive-value="1"
          active-color="#ff4949"
          inactive-color="#13ce66"
          @change="changeSwitch($event,scope.row,scope.$index)"
          >
        </el-switch>
        &nbsp;
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
import { getList, saveOwner ,deleteOwnerById,updateOwnerById,getOwnerByPhone  } from '@/api/owner'


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
        oIdcar:'',
        oUser:'',
        oPassword:'',
        oName:'',
        oBirthday:'',
        oPhone:'',
        oHometown:''
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
      nowUserss:'',
      value: '' ,
      pageModel: {
                page: 1,//默认当前页码
                total: 0//返回的总记录数（未分页）
            },
      changeSwitchtables:{
        oId:'',
        oState:''
      }
     
      
    }
    
  },

  created() {
    this.fetchData(1)
  },

  methods: {
      fetchData(pn){
        this.listLoading = true
        getList(pn).then(response => {
          this.list = response.data.records
          this.listLoading = false
          this.pageModel.total = response.data.total
          this.pageModel.page = response.data.current
        })
      },
    /**
       *点击新增按钮，弹出新增模态框
       * @param
       */
      addOwnerForm(){
        this.dialogAddgsVisible = true;
        this.title="增加业主"
      },

  

      /**
       *关闭或取消模态框，清空值
       * @param
       */
      closeDialogAddgsVisible(){
        this.$refs.addForm.resetFields();//element封装的方法,清空模态框的值
        this.title="" //初始化title的值
        this.dialogAddgsVisible=false
      },

      /**
       *确定新增数据
       * @param
       */
      saveAddForm(){
        this.addForm.oBirthday=this.dateFormat(this.addForm.oBirthday);
          saveOwner(this.addForm).then(response => {
            location. reload()
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

      deleteOwner(owner){
        this.$confirm('此操作将永久删除'+owner.oname+' 这个用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteOwnerById(owner.oid).then(response => {
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

      

      getStatus(status){
        if(status == 0){
          return "禁用";
          }else if(status == 1){
            return "启用";
          }
        
      },

       /**
        * 搜索功能
        */
      searchOwner(phone){
        if(phone !=""){
        this.listLoading = true
        getOwnerByPhone(phone).then(response => {
          this.list = response.data.records
          this.listLoading = false
          this.pageModel.total = response.data.total
          this.pageModel.page = response.data.current
        })
        }else{this.fetchData(1)}
      },


      /**
       * 调整用户状态
       */
      changeSwitch(data,b,index){
        this.changeSwitchtables.oId = b.oid
        this.changeSwitchtables.oState = b.ostate
        updateOwnerById(this.changeSwitchtables).then(response => {

        })
      }

  }
}

 
</script>
