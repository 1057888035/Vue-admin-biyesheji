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
      <el-table-column align="center" label="用户ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>

      <el-table-column label="业主姓名">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>

      <el-table-column label="出生日期" width="110" align="center">
        <template slot-scope="scope">
           <i class="el-icon-time" />
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>

      <el-table-column label="电话号码" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="身份证号码" width="110" align="center">
        <template slot-scope="scope">
          {{scope.$table}}
        </template>
      </el-table-column>

      <el-table-column align="center" prop="created_at" label="籍贯" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>

           <el-table-column align="center" prop="created_at" label="状态" width="100">
        <template slot-scope="scope">
           <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>


           <el-table-column align="center" prop="created_at" label="操作" width="130">
        <template>
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
           <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div>
         <el-pagination
          background
          layout="prev, pager, next"
          :total="10">
        </el-pagination>
    </div>
  </div>
  
  
</template>

<script>
import { getList } from '@/api/table'

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
      listLoading: true
    }
  },
  created() {
    this.fetchData()
    
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
