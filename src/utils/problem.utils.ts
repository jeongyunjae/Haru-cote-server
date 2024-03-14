/**
    @description 배열을 쉼표 기준으로 하나의 문자열로 생성
    @example [123,1256,'abc'] -> '123,1256,abc'
   */
export function addCommaForArray(values: (string | number)[]) {
  const data = values.join(',')
  return data
}
