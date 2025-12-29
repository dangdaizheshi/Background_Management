<template>
  <el-form label-width="100px">
    <el-form-item label="SPU名称">
        <el-input placeholder="请输入SPU名称" v-model="spuParams.spuName"></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
        <el-select style="width: 240px">
            <el-option label="" v-for="(item, index) in allTradeMark" :key="index"></el-option>
        </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
        <el-input type="textarea" placeholder="请输入描述" v-model="spuParams.description"></el-input>
    </el-form-item>
    <el-form-item label="SPU图标">
        <el-upload
            v-model:file-list="fileList"
            action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
        >
            <el-icon><Plus /></el-icon>
        </el-upload>
        <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
        <el-select style="width: 240px; margin-right:10px;">
            <el-option label="华为"></el-option>
            <el-option label="iPhone"></el-option>
            <el-option label="OPPO"></el-option>
        </el-select>
        <el-button type="primary" icon="Plus">添加属性值</el-button>
        <el-table border style="margin: 15px 0;">
          <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
          <el-table-column label="属性名" width="120px"></el-table-column>
          <el-table-column label="属性值"></el-table-column>
          <el-table-column label="操作" width="120px">
            <template #default="scope">
              <el-button type="danger" icon="Delete" size="small" title="删除SPU"></el-button>
            </template>
          </el-table-column>
        </el-table>
    </el-form-item>
    <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('changeScene', 0)">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { SpuData, HasSpuResponseData, SaleAttrValueResponseData, AllSaleAttrResponseData } from '../../../../apis/product/spu/type'
import type { TradeMark, AllTradeMarkResponseData } from '../../../../apis/product/trademark/type'
import type { SkuImg, ImgResponse } from '../../../../apis/product/sku/type'
import { reqAllTrademark } from '../../../../apis/product/trademark/trademark'
import { reqSpuImageList } from '../../../../apis/product/sku/index'
import { reqSpuHasSaleAttr, reqAllSaleAttr } from '../../../../apis/product/spu/index'
const $emit = defineEmits(['changeScene'])
const allTradeMark = ref<TradeMark[]>([])
const allImgList = ref<SkuImg[]>([])
const saleAttr = ref<any>([])
const allSaleAttr = ref<any>([])
const spuParams = ref<SpuData>({})
const initSpuData = async(spu: SpuData) => {
  spuParams.value = spu
  // 获取已有的SPU数据
  const res1: AllTradeMarkResponseData = await reqAllTrademark()
  const res2: ImgResponse = await reqSpuImageList((spu.id as number))
  const res3: SaleAttrValueResponseData = await reqSpuHasSaleAttr((spu.id as number))
  const res4: AllSaleAttrResponseData = await reqAllSaleAttr()
  allTradeMark.value = res1.data
  allImgList.value = res2.data
  saleAttr.value = res3.data
  allSaleAttr.value = res4.data
}
defineExpose({ initSpuData })
</script>

<style lang="scss" scoped>

</style>