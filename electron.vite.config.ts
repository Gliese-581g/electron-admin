import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
// 自动导入Element Plus
import AutoImport from 'unplugin-auto-import/vite' //自动导入函数
import Components from 'unplugin-vue-components/vite' // 自动导入组件
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// 自动导入图标
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'

const publicDir = resolve('resources')
const envDir = resolve('build')
// const pathSrc = path.resolve(__dirname, 'src/renderer/src')

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    publicDir,
    envDir,
    envPrefix: 'RENDERER_',
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@components': resolve('src/renderer/src/components'),
        '@views': resolve('src/renderer/src/views'),
        '@layout': resolve('src/renderer/src/layout'),
        '@store': resolve('src/renderer/src/store'),
        '@utils': resolve('src/renderer/src/utils'),
        '@api': resolve('src/renderer/src/api'),
        '@config': resolve('src/renderer/src/config')
      }
    },
    server: {
      proxy: {
        '/api': {
          // target: 'http://demo.open.xuexiluxian.cn',
          target: 'http://uat.crm.xuexiluxian.cn',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        // imports: ['vue'],

        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver({})
        ]
        // dts: path.resolve(pathSrc, 'auto-imports.d.ts')
      }),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            prefix: 'icon',
            alias: {
              park: 'icon-park',
              parks: 'icon-park-solid',
              parko: 'icon-park-outline'
            }
          }),
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ]
        // dts: path.resolve(pathSrc, 'components.d.ts')
      }),
      Icons({
        autoInstall: true
      })
    ]
  }
})
