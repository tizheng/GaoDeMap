<template>
  <div class="amap-page-container">
    <el-cascader :props="props"></el-cascader>
   <div id="search_wrap">
    <Search></Search>
   </div>
   <div id="map_wrap">
    <AMaMapContainerp ref="maps"></AMaMapContainerp>
  </div>
   </div>
</template>

<style></style>

<script>
import AMaMapContainerp from '@/components/MapContainer'
import Search from '@/components/search'
import { city } from '@/common/city.js'
export default {
  components: {
    AMaMapContainerp,
    Search
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
  mounted () {},
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
<style scoped>
.amap-page-container {
  height: 100%;
  width: 100%;
  position: relative;
}
#map_wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 60%;
  width: 60%;
}
#search_wrap {
  position: absolute;
  height: 60px;
  width: 400px;
  left: 50%;
}
</style>
