import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: { customProperties: true },
    dark: false,
    themes: {
      light: {
        background: '#fdfdfd',
        primary: colors.blue.darken1, 
        secondary: colors.blue.lighten4,
        accent: colors.indigo.base,
      },
      dark: {
        background: "#000", 
        primary: colors.green.darken1,
        secondary: colors.green.lighten4,
        accent: colors.indigo.base,
      },
    },
  },
});
