// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          background: '#F5F5F5',
          surface: '#FFFFFF',
          error: '#D32F2F',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#90CAF9',
          secondary: '#B0BEC5',
          background: '#121212',
          surface: '#1E1E1E',
          error: '#EF9A9A',
        },
      },
    },
  },
});