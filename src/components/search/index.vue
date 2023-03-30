<template>
  <div class="search_wraps">
    <el-input
      v-model="inputObj.userInput"
      placeholder="请输入地址"
      size="normal"
      clearable
      :id="inputObj.inputId"
    ></el-input>
    <el-button type="primary" size="default" @click="send">search</el-button >
  </div>
</template>
<script>
import bus from '@/eventBus/index.js'
export default {
  data () {
    return {
      inputObj: {
        userInput: '',
        inputId: 'test'
      }
    }
  },
  methods: {
    send () {
      bus.$emit('searchUserInput', this.inputObj)
    }
  },
  mounted () {
    this.send()
  }
}
</script>

<style scoped>
.search_wraps {
  width:300px;
  display: flex;
}

</style>
