export function getCode (address, map) {
  // 高德地图将地址转化为经纬度
  var geocoder = new AMap.Geocoder()
  return geocoder.getLocation(address, function (status, result) {
    if (status === 'complete' && result.geocodes.length) {
      const lat = result.geocodes[0].location.lat
      const lng = result.geocodes[0].location.lng
      map.setCenter([lng, lat])
    }
  })
}
