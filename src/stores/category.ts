import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {reqCategory1List , reqCategory2List , reqCategory3List} from '../apis/product/attr/attr'
import type { CategoryObj, ResponseData } from '../apis/product/attr/type'

export const useCategoryStore = defineStore('category', () => {
  const c1List = ref<CategoryObj[]>([])
  const c2List = ref<CategoryObj[]>([])
  const c3List = ref<CategoryObj[]>([])
  const c1id = ref<number | string>('')
  const c2id = ref<number | string>('')
  const c3id = ref<number | string>('')
  const getC1 = async() => { 
    const res: ResponseData = await reqCategory1List()
    c1List.value = res.data
  }
  const getC2 = async() => { 
    const res: ResponseData = await reqCategory2List(c1id.value)
    c2List.value = res.data
  }
  const getC3 = async() => { 
    const res: ResponseData = await reqCategory3List(c2id.value)
    c3List.value = res.data
  }
  return { c1List, c2List, c3List, c1id, c2id, c3id, getC1, getC2, getC3 }
})
