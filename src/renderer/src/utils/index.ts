//arrayBuffer转base64的data:url 返回一个Promise
export function abToDataUrl(
  arrayBuffer: ArrayBuffer,
  mimeType: string
): Promise<FileReader['result']> {
  const blob = new Blob([new Uint8Array(arrayBuffer)], { type: mimeType })
  const reader = new FileReader()
  reader.readAsDataURL(blob)
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = () => {
      reject(reader.error)
    }
  })
}
//arrayBuffer转base64的data:url
export function abToDataUrl2(arrayBuffer: ArrayBuffer, mimeType: string): string {
  return (
    `data:${mimeType};base64,` +
    //将ArrayBuffer转换为base64-编码的字符串
    btoa(new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), ''))
  )
}

//时间戳转'yyyy-MM-dd hh:mm:ss '格式 '2022-1-18 10:09:06'

export function getDate(n) {
  const now = new Date(n),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate()
  return (
    y +
    '-' +
    (m < 10 ? '0' + m : m) +
    '-' +
    (d < 10 ? '0' + d : d) +
    ' ' +
    now.toTimeString().substring(0, 8)
  )
}
// 阿拉伯数字字符串转化星期字符串
export function convertToChineseWeekday(str) {
  const weekdays = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']

  return str.replace(/\d+/g, (match) => {
    const index = parseInt(match) - 1
    return weekdays[index]
  })
}
// Date对象转化为'yyyy-MM-dd'
export function dateToStr(date: Date) {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const formattedDate = `${year}-${month}-${day}`
  return formattedDate
}
// 'yyyy-MM-dd'转化为Date对象
export function strToDate(dateString: string) {
  const dateArray = dateString.split('-')
  const year = parseInt(dateArray[0])
  const month = parseInt(dateArray[1]) - 1
  const day = parseInt(dateArray[2])
  const reversedDate = new Date(year, month, day)
  return reversedDate
}
