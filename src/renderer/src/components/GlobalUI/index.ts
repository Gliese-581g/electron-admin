import DictOptions from './DictOptions.vue'
import DictTag from './DictTag.vue'
import DictRadio from './DictRadio.vue'

const components = {
  DictOptions,
  DictTag,
  DictRadio
}

export default {
  install(app) {
    for (const comp in components) {
      app.component(comp, components[comp])
    }
  }
}
