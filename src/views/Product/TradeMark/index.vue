<template>
  <div>
    <el-card>
      <el-button type="primary" icon="Plus" @click="addTrademark">添加品牌</el-button>
      <el-table border style="width: 100%; margin: 20px 0;" :data="trademarkList">
        <el-table-column label="序号" width="80px" align="center" type="index" index/>
        <el-table-column label="品牌名称" prop="tmName"/> 
        <el-table-column label="品牌LOGO">
          <template #default="scope">
            <img :src="scope.row.logoUrl" alt="没有图片" style="width: 100px; height: 100px;">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #default="scope">
            <el-button type="primary" icon="Edit" size="small" @click="updateTrademark(scope.row)"></el-button>
            <el-popconfirm title="您确定要删除该品牌吗?" width="200px" icon="Delete" @confirm="deleteTrademark(scope.row.id)">
              <template #reference>
                <el-button type="danger" icon="Delete" size="small" ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[1, 2, 3, 4, 5]"
        background
        layout="prev, pager, next, jumper, ->, sizes, total"
        @current-change="getTrademarkList"
        @size-change="getTrademarkList"
        :total="total"
      />
    </el-card>
    <el-dialog v-model="dialogFormVisable" :title="dialogTitle" >
      <el-form style="width: 80%; margin-top: 25px;" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="http://117.72.157.194:10086/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :headers="uploadHeaders"
          >
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogFormVisable = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, reactive } from 'vue'
import {reqTrademarkList, reqAddOrUpdateTrademark, reqUpdateTrademark, reqDeleteTrademark } from '../../../apis/product/trademark/trademark'
import type {TradeMark, TradeMarkResponseData} from '../../../apis/product/trademark/type'
import { ElMessage, type UploadProps } from 'element-plus'

let currentPage = ref<number>(1)
let pageSize = ref<number>(3)
let trademarkList = ref<TradeMark>([])
let total = ref<number>(0)
let dialogFormVisable = ref<boolean>(false)
let dialogTitle = ref<string>('添加品牌')
let trademarkParams = ref<TradeMark>({
  tmName: '',
  logoUrl: ''
})
const rules = reactive({
  tmName: [
    { required: true, message: '请输入品牌名称', trigger: 'blur' },
    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9_!@#$%^&*(),.?":{}|<>]+$/, message: '品牌名称只能包含数字、字母、标点符号和下划线', trigger: 'blur' },
    { validator: (rule: any, value: any, callback: any) => {
      if(value.length > 10) {
        callback(new Error('长度不能超过10个字符'))
      }
      else {
        callback()
      }
    }}
  ],
  logoUrl: [
    { required: true, message: '请上传品牌LOGO', trigger: 'blur' },
    { validator: (rule: any, value: any, callback: any) => {
      if(value.length > 300) {
        callback(new Error('长度不能超过300个字符'))
      }
      else {
        callback()
      }
    }}
  ]
})
const formRef = ref()
const getTrademarkList = async(pager: number = 1) => {
  currentPage.value = pager
  const res: TradeMarkResponseData = await reqTrademarkList(currentPage.value, pageSize.value)
  if(res.code === 200) {
    trademarkList.value = res.data.records
    total.value = res.data.total
  }
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type === 'image/jpeg' || rawFile.type === 'image/png' || rawFile.type === 'image/gif') {
    if (rawFile.size / 1024 / 1024 < 4) return true
    else {
      ElMessage.error('上传文件大小不能超过4M')
      return false
    }
  }
  else {
    ElMessage.error('上传文件类型务必是图片格式')
    return false
  }
}
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  trademarkParams.value.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}
const uploadHeaders = computed(() => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwidXNlcl9pZCI6MSwiZXhwIjoxNzk4MTc5MzE4LCJpc3MiOiJXdWtvbmcifQ.BkywkGT8M4pJr7bcRkuNZCkgtLqHDMiH4AIXLv2Xmdw'
  return {
    token: token
  }
})
onMounted(() => {
  getTrademarkList()
})
const addTrademark = () => {
  dialogTitle.value = '添加品牌'
  dialogFormVisable.value = true
  trademarkParams.value = {
    tmName: '',
    logoUrl: ''
  }
  formRef.value.clearValidate()
}
const updateTrademark = (row: TradeMark) => {
  dialogTitle.value = '修改品牌'
  dialogFormVisable.value = true
  Object.assign(trademarkParams.value, row)
  formRef.value.clearValidate()
}
const confirm = async() => { 
  await formRef.value.validate()
  dialogFormVisable.value = false
  if(dialogTitle.value === '添加品牌') {
    reqAddOrUpdateTrademark(trademarkParams.value).then(res => {
      ElMessage.success('添加成功')
      getTrademarkList()
    }).catch(err => {
      ElMessage.error('添加失败')
    })
  }
  else {
    reqUpdateTrademark(trademarkParams.value).then(res => {
      ElMessage.success('修改成功')
      getTrademarkList(currentPage.value)
    }).catch(err => {
      ElMessage.error('修改失败')
    })
  }
}
const deleteTrademark = (id: number) => { 
  reqDeleteTrademark(id).then(res => {
    ElMessage.success('删除成功')
    getTrademarkList(trademarkList.value.length > 1 ? currentPage.value : currentPage.value - 1)
  }).catch(err => {
    ElMessage.error('删除失败')
  })
}
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>