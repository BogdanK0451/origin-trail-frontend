import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import 'vuetify/styles'

const vuetify = createVuetify({
  defaults: {
    VTextField: {
      variant: 'outlined',
      baseColor: 'primary',
      itemColor: 'primary',
      color: 'primary',
      density: 'compact',
    },
    VBtn: {
      class: 'font-weight-bold',
    },
    VDataTable: {
      hideNoData: true,
    },
    VDataTableVirtual: {
      hideNoData: true,
    },
  },
  components,
  directives,
})

export default vuetify
