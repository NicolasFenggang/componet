<template>
  <div>
    <el-table :data='isData' style='width: 100%'>
      <template v-for='(col, key) in table.columns'>
        <el-table-column
          :key='key'
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          v-if='col.type=="slot"'>
          <template slot-scope="scope">
            <slot :name='col.slot_name' :row='scope.row'></slot>
          </template>
        </el-table-column>
        <el-table-column
          :key='key'
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          v-else-if='!col.hide'>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="table.pageNum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="table.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="table.total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'MyTable',
  props: {
    data: Object,
    isData: Array
  },
  watch: {
    data: {
      handler (newVal) {
        this.init(newVal)
      },
      immediate: true,
      deep: true
    }
  },
  data () {
    return {
      table: {
        columns: [],
        pageNum: 1,
        pageSize: 5,
        total: 0,
        http: {
          url: ''
        }
      }
    }
  },
  methods: {
    init (val) {
      for (const key in val) {
        const isReally = Object.keys(this.table).includes(key)
        if (isReally) {
          this.table[key] = val[key]
        }
      }
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>

</style>
