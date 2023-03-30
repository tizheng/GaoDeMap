<template>
  <div class="amap-page-container">
    <el-cascader :props="props"></el-cascader>
    <!-- <AMap ref="maps"></AMap> -->
    <div id="map_wrap">
    <AMaMapContainerp></AMaMapContainerp>
  </div>
  </div>
</template>

<style></style>

<script>
// import AMap from '@/views/amap'
import { city } from '@/common/city.js'
export default {
  components: {
    // AMap
  },
  data: function () {
    const _this = this
    return {
      address: [],
      props: {
        lazy: true,
        lazyLoad (node, resolve) {
          const { level } = node
          // 真实接口处理
          // const jsonType = {
          //   0: { type: 'province' },
          //   1: { type: 'city', code: 'province_code' },
          //   2: { type: 'area', code: 'city_code' }
          // }
          // const request = {}
          // request.type = jsonType[level].type
          // request[jsonType[level]?.code] = node.value
          // // 发送接口
          // const GetCity = ''
          // GetCity(request).then((res) => {
          //   const type = jsonType[level].type
          //   res.data.map(item => {
          //     item.value = item[type + '_code']
          //     item.value = item[type + '_Name']
          //   })
          // })
          // 假数据处理
          if (level === 0) {
            const data = city.map((item) => {
              return {
                value: item.code,
                label: item.province
              }
            })
            resolve(data)
          }
          if (level === 1) {
            let arr = []
            city.map((item) => {
              if (item.province === node.label) {
                arr = item.cities.map((item) => {
                  return {
                    value: item.code,
                    label: item.name
                  }
                })
              }
            })
            resolve(arr)
          }
          if (level === 2) {
            const arr = []
            city.map((item) => {
              item.cities.map((item) => {
                if (item.name === node.label) {
                  // console.log(item)
                }
              })
            })
            resolve(arr)
          }
          if (node.level !== 0) {
            _this.getAddress(node)
          }
        }
      }
    }
  },
  methods: {
    getAddress (node) {
      const { level } = node
      this.address[level - 1] = node.label
      this.setLocation(this.address.join(''))
    },
    setLocation (value) {
      this.$refs.maps.setLocationEls(value)
    }
  }
}
</script>
