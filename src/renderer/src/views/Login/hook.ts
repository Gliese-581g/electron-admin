import { computed, ref } from 'vue'
import { Encrypt, Decrypt } from '@utils/aes'

export function useMemoPassword() {
  const checked = localStorage.getItem('memoPassword') === 'true' ? true : false

  const checkedMemo = ref(checked)
  function handlerMemoChange(newVal) {
    localStorage.setItem('memoPassword', newVal.toString())
  }

  const memoData = computed(() => {
    const userPwd = localStorage.getItem('user-pwd')
    if (userPwd) {
      const { username, password } = JSON.parse(userPwd)
      return { username: Decrypt(username), password: Decrypt(password) }
    } else
      return {
        username: '',
        password: ''
      }
  })

  function setMemoPassword(username: string, password: string) {
    if (checkedMemo.value) {
      localStorage.setItem(
        'user-pwd',
        JSON.stringify({
          username: Encrypt(username),
          password: Encrypt(password)
        })
      )
    } else localStorage.removeItem('user-pwd')
  }

  return { checkedMemo, handlerMemoChange, memoData, setMemoPassword }
}
