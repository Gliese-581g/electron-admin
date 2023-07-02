import { defineStore } from 'pinia'
import * as dictItemApi from '@api/system/dictItem'

export const useDictStore = defineStore('dict', {
  state: () => {
    return {
      dictMap: new Map<string, any>()
    }
  },
  actions: {
    getDictOptions(dictType: string): Promise<any> {
      if (!this.dictMap.has(dictType)) {
        console.log('yes')
        this.setDictOptions(dictType)
      }
      return this.dictMap.get(dictType)
    },
    setDictOptions(dictType: string) {
      this.dictMap.set(dictType, dictItemApi.getDictOptions(dictType))
    }
  }
})
