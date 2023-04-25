import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    themes: {
      light: {
        background: '#fdfdfd',
       // background: colors.indigo.darken2, 
        primary: colors.indigo.lighten2, 
        secondary: colors.indigo.lighten4,
        accent: colors.indigo.base,
        lightGrey: colors.grey.lighten1
      },
      dark: {
        background: "#000", 
        primary: colors.green.darken1,
        secondary: colors.green.lighten4,
        accent: colors.indigo.base,
        lightGrey: "#000"
      },
    },
  },
});
