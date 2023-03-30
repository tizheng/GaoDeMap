export function getPoint (e) {
  return {
    lnglat: e.lnglat.getLng(),
    lat: e.lnglat.getLat(),
    value: e.lnglat.getLng() + ',' + e.lnglat.getLat()
  }
}
