<template>
  <div>
    <Table :data='tableData' :isData='reallyData'>
      <template v-slot:tag_slot='scope'>
        <el-tag :type="scope.row.tag === '学生' ? 'primary' : 'success'">
          {{scope.row.tag}}
        </el-tag>
      </template>
      <template v-slot:operate_slot='scope'>
        <el-button type='primary' @click="edit(scope.row)">编辑</el-button>
        <el-button type='danger' @click="del(scope.row)">删除</el-button>
      </template>
      <template v-slot:href_slot='scope'>
        <a :href="scope.row.href" target="_blank">百度</a>
      </template>
      <template v-slot:status_slot='scope'>
        {{ scope.row.status === '1' ? '已婚' : '未婚' }}
      </template>
    </Table>
    <Table :data='tableData1' :isData='reallyData'>
      <template v-slot:status_slot='scope'>
        <el-button @click="handleClick(scope.row)" type="text" size="small">
          {{ scope.row.status === '1' ? '已婚' : '未婚' }}
        </el-button>
      </template>
    </Table>
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
      <Table :data='tableData1' :isData='reallyData'>
      <template v-slot:status_slot='scope'>
        <el-button @click="handleClick(scope.row)" type="text" size="small">
          {{ scope.row.status === '1' ? '已婚' : '未婚' }}
        </el-button>
      </template>
    </Table>
    </el-dialog>
  </div>
</template>

<script>
import Table from '../../components/Table.vue'
export default {
  name: 'TableComp',
  data () {
    return {
      pageSize: 5,
      currentPage: 1,
      dialogTableVisible: false,
      tableData: {
        http: {
          url: '/api/blog/list'
        },
        columns: [
          {
            label: 'ID',
            prop: 'id',
            width: '80',
            hide: false
          },
          {
            label: '作者',
            prop: 'author',
            width: '80'
          },
          {
            label: '婚姻',
            prop: 'status',
            type: 'slot',
            slot_name: 'status_slot',
            width: '180'
          },
          {
            label: '标题',
            prop: 'title',
            width: '180'
          },
          {
            label: '文章内容',
            prop: 'content',
            width: '180'
          },
          {
            label: '创建时间',
            prop: 'createtime',
            width: '230'
          },
          {
            label: '标签',
            prop: 'tag',
            width: '180',
            type: 'slot',
            slot_name: 'tag_slot'
          },
          {
            label: '操作',
            prop: 'operate',
            width: '180',
            type: 'slot',
            slot_name: 'operate_slot'
          },
          {
            label: '链接',
            prop: 'href',
            width: '180',
            type: 'slot',
            slot_name: 'href_slot'
          }
        ]
      },
      tableData1: {
        columns: [
          {
            label: 'ID',
            prop: 'id',
            width: '80',
            hide: false
          },
          {
            label: '作者',
            prop: 'author',
            width: '80'
          },
          {
            label: '婚姻',
            prop: 'status',
            type: 'slot',
            slot_name: 'status_slot',
            width: '180'
          },
          {
            label: '标题',
            prop: 'title',
            width: '180'
          },
          {
            label: '文章内容',
            prop: 'content',
            width: '180'
          },
          {
            label: '创建时间',
            prop: 'createtime',
            width: '180'
          },
          {
            label: '操作',
            prop: 'operate',
            width: '',
            type: 'slot',
            slot_name: 'operate_slot'
          }
        ]
      },
      reallyData: []
    }
  },
  components: {
    Table
  },
  created () {
    this.getUserinfo()
  },
  methods: {
    edit (row) {
      console.log(row)
    },
    del (row) {
      console.log(row)
    },
    async getUserinfo () {
      const { data: { data: res } } = await this.$http.get('/api/blog/list')
      this.reallyData = res
    },
    handleClick (row) {
      console.log(row)
      this.dialogTableVisible = !this.dialogTableVisible
    }
  }
}
</script>

<style scoped>

</style>
