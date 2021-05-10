<template>
<div class="app-container">

  <el-button  type="success" @click="addStaffForm()" icon="el-icon-edit" style="margin:2px">增加员工</el-button>
    <el-dialog
      :title="title"
      width="30%"
      :visible.sync="dialogAddgsVisible"
      @close="closeDialogAddgsVisible"
      :modal-append-to-body="false"
      >
      <el-form :model="addForm"  ref="addForm" label-width="100px">


        <el-form-item label="员工手机号" prop="sPhone">
          <el-input style="width: 75%" v-model="addForm.sPhone" v-if="title == '增加员工'"></el-input>
           <el-input style="width: 75%" 
           v-model="addForm.sPhone" 
           v-if="title == '修改员工'" 
           :disabled="true" 
           :placeholder = nowUserss.sphone
           ></el-input>
        </el-form-item>

        <el-form-item label="输入密码" prop="sPassword">
          <el-input style="width: 75%" v-model="addForm.sPassword"    placeholder = '为空表示不修改'></el-input>
        </el-form-item>

        <el-form-item label="员工姓名" prop="sName">
          <el-input style="width: 75%" v-model="addForm.sName" v-if="title == '增加员工'"></el-input>
          <el-input style="width: 75%" 
           v-model="addForm.sName" 
           v-if="title == '修改员工'" 
           :disabled="true" 
           :placeholder = nowUserss.sname
           ></el-input>
        </el-form-item>

        <el-form-item label="员工出生日期" prop="sBirthday">
          <div class="block">
            <el-date-picker
             v-model="addForm.date"
             type="date"
             placeholder="选择日期"
             v-if="title == '增加员工'"
            >
            </el-date-picker>
            <el-date-picker
             v-model="addForm.date"
             type="date"
             placeholder="出生日期不可修改日期"
             v-if="title == '修改员工'"
             :disabled="true" 
            >
            </el-date-picker>
           </div>
        </el-form-item>

        <el-form-item label="家庭住址" prop="sAddress">
          <el-input style="width: 75%" v-model="addForm.sAddress"   v-if="title == '增加员工'" ></el-input>
          <el-input style="width: 75%" 
           v-model="addForm.sAddress" 
           v-if="title == '修改员工'" 
           :disabled="false" 
           :placeholder = nowUserss.saddress
           ></el-input>
        </el-form-item>

        <el-form-item label="员工所属部门" prop="sDepartmentId">
          <el-select v-model="addForm.sDepartmentId" placeholder="请选择"  v-if="title == '增加员工'" >
            <el-option
             v-for="item in departmentId"
             :key="item.dpId"
             :label="item.dpName"
             :value="item.dpId"
             >
            </el-option>
          </el-select>

          <el-select v-model="addForm.sDepartmentId" :placeholder= getNameForId(nowUserss.sdepartmentId)  v-if="title == '修改员工'" >
            <el-option
             v-for="item in departmentId"
             :key="item.dpId"
             :label="item.dpName"
             :value="item.dpId"
             >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="员工类型" prop="sType">
          <el-select v-model="addForm.sType" :placeholder="请选择" v-if="title == '增加员工'" >
            <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
            </el-option>
          </el-select>

          <el-select v-model="addForm.sType" :placeholder= getstypeName(nowUserss.stype) v-if="title == '修改员工'" >
            <el-option
             v-for="item in options"
             :key="item.value"
             :label="item.label"
             :value="item.value">
            </el-option>
          </el-select>
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

    <el-table-column align="center" label="用户ID" width="80">
      <template slot-scope="scope">
        {{ scope.row.sid }}
      </template>
    </el-table-column>

    <el-table-column label="业主姓名" width="115">
      <template slot-scope="scope">
        {{ scope.row.sname }}
      </template>
    </el-table-column>

    <el-table-column label="出生日期" width="150" align="center">
      <template slot-scope="scope">
        <i class="el-icon-time" />
        <span>{{ getYearMonth(dateFormat(scope.row.sbirthday)) }}</span>
      </template>
    </el-table-column>

    <el-table-column label="电话号码" width="110" align="center">
      <template slot-scope="scope">
        {{ scope.row.sphone }}
      </template>
    </el-table-column>

    <el-table-column align="center" prop="created_at" label="所属部门" width="180">
      <template slot-scope="scope">
       <el-tag :type="scope.row.sdepartmentId | statusFilter">
          {{getNameForId(scope.row.sdepartmentId) }}
        </el-tag>
      </template>
    </el-table-column>


    <el-table-column align="center" prop="created_at" label="家庭住址" width="400">
      <template slot-scope="scope">
        <span>{{ scope.row.saddress }}</span>
      </template>
    </el-table-column>

    <el-table-column align="center" prop="created_at" label="状态" width="100">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | statusFilter">
          <div v-if=" scope.row.sstate ==0 " >空闲</div>
          <div v-else-if=" scope.row.sstate ==1 " >在岗</div>
          <div v-else-if=" scope.row.sstate ==2 " >休息</div>
          <div v-else-if="scope.row.sstate ==null">已入职</div>
          <div v-else-if="scope.row.sstate ==-1">离职</div>
        </el-tag>
      </template>
    </el-table-column>


    <el-table-column align="center" prop="created_at" label="操作" width="130">
      <template  slot-scope="scope">
        <el-button @click="updateStaffForm(scope.row)" type="primary" icon="el-icon-edit" circle></el-button>
        <el-button @click="deleteStaff(scope.row)" type="danger" icon="el-icon-delete" circle></el-button>
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
import { getList } from '@/api/table'
import { saveStaff } from '@/api/table'
import { deleteStaffById } from '@/api/table'
import { getDepartment } from '@/api/table'
import { updateStaffById } from '@/api/table'


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
          sPhone:"",
          sPassword:"",
          sName:"",
          sBirthday:"",
          sAddress:"",
          sType:"",
          sId:"",


      },
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
      departmentId:'',
      nowUserss:'',
      options: [{
          value: '0',
          label: '系统管理员'
        }, {
          value: '1',
          label: '普通员工'
        }],
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
      addStaffForm(){
        this.dialogAddgsVisible = true;
        this.title="增加员工"
        getDepartment().then(response => {
            this.departmentId = response.data
        })
      },

      /**
       *点击修改按钮弹出模态框 
       */
      updateStaffForm(ssss){
        this.dialogAddgsVisible = true;
        this.title="修改员工"
        this.nowUserss = ssss
        getDepartment().then(response => {
            this.departmentId = response.data
        })
      },

      /**
       *关闭或取消模态框，清空值
       * @param
       */
      closeDialogAddgsVisible(){
        this.$refs.addForm.resetFields();//element封装的方法,清空模态框的值
        this.title="" //初始化title的值
         this.addForm={//初始化addForm中的值
          sPhone:"",
          sPassword:"",
          sName:"",
          sBirthday:"",
          sAddress:"",
          sType:"",
        }
        this.dialogAddgsVisible=false
      },

      /**
       *确定新增数据
       * @param
       */
      saveAddForm(){
        if(this.title == "增加员工"){
          saveStaff(this.addForm).then(response => {
            location. reload()
          })
        }else if(this.title == "修改员工"){
            this.addForm.sPhone = this.nowUserss.sphone
            this.addForm.sId =  this.nowUserss.sid
            delete this.addForm.sName
            delete this.addForm.sBirthday
            if(this.addForm.sAddress == ""){
               delete this.addForm.sAddress
            }
            if(this.addForm.sPassword == ""){
               delete this.addForm.sPassword
            }
            if(this.addForm.sType == ""){
               delete this.addForm.sType
            }

           updateStaffById(this.addForm).then(response =>{
            this.closeDialogAddgsVisible()
            this.fetchData(this.pageModel.page)
            
           }

           )
        }
    
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

      deleteStaff(staff){
        this.$confirm('此操作将永久删除'+staff.sName+'用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteStaffById(staff.sId).then(response => {
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

        /**
        根据dpid获取名称
        */

      getNameForId(dpid){
        if(dpid == 1){
          return "管理部";
          }else if(dpid == 2){
            return "操作部";
          }else if(dpid == 3){
            return "售后部";
          }else{
            return "待分配";
          }
        
      },

      getstypeName(stype){
        if(stype == 0){
          return "系统管理员";
          }else if(stype == 1){
            return "普通员工";
          }else{
            return  "未知类型";
          }
      }

  }
}

 
</script>
