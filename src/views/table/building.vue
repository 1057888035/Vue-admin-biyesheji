<template>
<div class="app-container">


  <el-input v-model="inputofPhone" placeholder="请输入要查询的房间号"  maxlength="11"  style="width:300px"></el-input>
  <el-button type="primary" icon="el-icon-search" @click="searchStaff(inputofPhone)">搜索</el-button>
  <el-button  type="success" @click="dialogVisibleforAdd = true" icon="el-icon-edit" style="margin:2px">从Excel导入数据</el-button>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisibleforAdd"
        width="30%"
        :before-close="handleClose"
      >
       
        <el-upload
         class="upload-demo"
         action="http://localhost:8088/pro/building/import"
         accept=application/*
         :on-preview="handlePreview"
         :on-remove="handleRemove"
        :before-remove="beforeRemove"
         multiple=false
         :on-exceed="handleExceed"
         :file-list="fileList">
        
         <el-button size="small" type="primary">点击上传</el-button>
         <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleforAdd = false">关闭</el-button>
        </span>
    </el-dialog>







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
          <el-select v-model="addForm.sType" placeholder="请选择" v-if="title == '增加员工'" >
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
import { getList , deletes ,updates,getByCode,uploads } from '@/api/buding'



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
      dialogVisibleforAdd: false,
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
      value: '' ,
      pageModel: {
                page: 1,//默认当前页码
                total: 0//返回的总记录数（未分页）
            },
     fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
     
    
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
       *点击修改按钮弹出模态框 
       */
      update(ssss){
        this.dialogAddgsVisible = true;
        this.title="修改房屋信息"
        this.nowUserss = ssss
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
           updates(this.addForm).then(response =>{
            this.closeDialogAddgsVisible()
            this.fetchData(this.pageModel.page)

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

       /**
        * excel导入数据
        */
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

      deleteStaff(user){
        this.$confirm('此操作将永久删除'+user.bcode+'号房间, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deletes(user.bid).then(response => {
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
        * 搜索功能
        */
      searchStaff(code){
        if(code !=""){
        this.listLoading = true
        getByCode(code).then(response => {
          this.list = response.data.records
          this.listLoading = false
          this.pageModel.total = response.data.total
          this.pageModel.page = response.data.current
         })
         }else{this.fetchData(1)}
       },

     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
        this.beforeRemove(file)
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }

  }
}

 
</script>
