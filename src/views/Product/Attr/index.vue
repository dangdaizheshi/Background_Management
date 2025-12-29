<template>
  <TopCategory />
  <div class="attr_ody">
    <el-card style="margin: 10px 0;">
      <div class="card_1" v-show="scene === 0">
        <el-button type="primary" icon="Plus" @click="addAttr" :disabled="categoryStore.c3id ? false : true">添加属性</el-button>
        <el-table border style="margin: 10px 0;" :data="attrList">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性名称" align="center" width="120px" prop="attrName"></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #default="scope">
              <el-tag v-for="(item, index) in scope.row.attrValueList" :key="item.id" style="margin: 5px;" :type="tagType[index % 4]">{{ item.valueName }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="140px">
            <template #default="scope">
              <el-button type="warning" icon="Edit" size="small" @click="updateTable(scope.row)"></el-button>
              <el-popconfirm title="您确定要删除该品牌吗?" width="200px" icon="Delete" @confirm="deleteAttr(scope.row.id)">
                <template #reference>
                  <el-button type="danger" icon="Delete" size="small"></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="card_2" v-show="scene === 1">
        <el-form inline>
          <el-form-item label="属性名称">
            <el-input placeholder="请输入属性名称" v-model="attrParams.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="Plus" :disabled="attrParams.attrName ? false : true" @click="addAttrValue">添加属性值</el-button>
        <el-button @click="cancelAdd()">取消</el-button>
        <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
          <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
          <el-table-column label="属性值名称" align="center">
            <template #default="scope">
              <el-input :ref="(vc: any) => inputArr[scope.$index] = vc" v-if="scope.row.flag" @blur="tolook(scope.row, scope.$index)" size="small" placeholder="请输入属性值名称" v-model="scope.row.valueName"></el-input>
              <div v-else @dblclick="showInput(scope.row, scope.$index)">{{scope.row.valueName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="120px"></el-table-column>
        </el-table>
        <el-button type="primary" @click="saveAttr" :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
        <el-button @click="cancelAdd()">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import TopCategory from '../../../components/TopCategory.vue';
import { ref, watch, reactive, onBeforeUnmount, nextTick } from 'vue';
import { useCategoryStore } from '../../../stores/category';
import {reqAttrList, reqAddOrUpdateAttr, reqDeleteAttr} from '../../../apis/product/attr/attr'
import { ElMessage } from 'element-plus';
import type { Attr, AttrResponseData, AttrValue } from '../../../apis/product/attr/type'
const categoryStore = useCategoryStore()
let scene = ref<number>(0)
let inputArr = ref<any[]>([])
const tagType: string[] = ['primary', 'success', 'warning', 'danger']
const attrList = ref<Attr[]>([])
let attrParams = reactive<Attr>({
  attrName: '',
  categoryLevel: 3,
  categoryId: '',
  attrValueList: []
})

watch(() => categoryStore.c3id, () => {
  attrList.value = []
  if(!categoryStore.c3id) return
  getAttrList()
})
const getAttrList = () => { 
  const {c1id, c2id, c3id} = categoryStore
  reqAttrList(c1id, c2id, c3id).then(res => {
    attrList.value = res.data
  }).catch(err => {ElMessage.error('获取属性列表失败')})
}
const addAttr = () => {
  Object.assign(attrParams, {
    attrName: '',
    categoryLevel: 3,
    categoryId: categoryStore.c3id,
    attrValueList: []
  })
  scene.value = 1
}
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true
  })
  nextTick(() => { 
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
const saveAttr = async() => { 
  const res = await reqAddOrUpdateAttr(attrParams)
  if(res.code === 200) {
    ElMessage.success('添加属性成功')
    scene.value = 0
    getAttrList()
  } else {
    ElMessage.error('添加属性失败')
  }
}
const tolook = (row: AttrValue, $index: number) => { 
  // 非法情况一：属性值名称为空
  if (row.valueName.trim() === '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage.warning('请输入属性值名称')
    return
  }
  // 非法情况二：属性值名称重复
  let repeat = attrParams.attrValueList.find((item) => {
    if(item != row) return item.valueName === row.valueName
  })
  if (repeat) {
    attrParams.attrValueList.splice($index, 1)
    ElMessage.warning('属性值名称重复')
    return
  }
  row.flag = false
}
const showInput = (row: AttrValue, id: number) => { 
  row.flag = true
  nextTick(() => { 
    inputArr.value[id].focus()
  })
}
const updateTable = (row: Attr) => {
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  scene.value = 1
}
const cancelAdd = () => {
  scene.value = 0
}
const deleteAttr = async(id: number) => {
  const res: any = await reqDeleteAttr(id)
  if(res.code === 200) {
    ElMessage.success('删除成功')
    getAttrList()
  } else {
    ElMessage.error('删除失败')
  }
}
// 组件销毁时时清空 pinia 的数据
onBeforeUnmount(() => { 
  categoryStore.$reset()
})
</script>

<style lang="scss" scoped>

</style>