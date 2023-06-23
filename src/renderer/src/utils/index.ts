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
