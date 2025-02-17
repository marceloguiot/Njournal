<template>
    <v-container class="fill-height d-flex justify-center align-center">
      <v-card elevation="5" class="pa-6">
        <v-card-title class="text-center text-h5">Iniciar Sesión</v-card-title>
        <v-card-text>
        <v-alert v-if="errorMessage" type="error" dense>{{ errorMessage }}</v-alert>

        <v-text-field v-model="email" label="Correo Electrónico" type="email" required></v-text-field>
        <v-text-field v-model="password" label="Contraseña" type="password" required></v-text-field>
      </v-card-text>
       
          
   

        <v-card-actions class="d-flex flex-column">
        <v-btn :loading="loading" :class="logItemClass" block @click="loginEmail">Iniciar sesión</v-btn>
        <v-divider class="my-3">O</v-divider>
        <v-btn :class="logItemClass" @click="login">
          <v-icon left>mdi-google</v-icon>Continuar con Google
        </v-btn>
      </v-card-actions>
      </v-card>
    </v-container>
  </template>
  <style scoped>
.login-item-dark {
  background-color: #7E57C2;
  
}
.login-item-dark:hover {
  background-color: #5E35B1; /* deep-purple-lighten-3 */
  cursor: pointer;
}

.login-item-light {
  background-color: #4DB6AC;
  color: white;
}
.login-item-light:hover {
  background-color: #26A69A; /* deep-purple-lighten-4 */
  cursor: pointer;
}</style>
  <script>
  import { ref, computed } from 'vue';
  import { signInWithGoogle,loginWithEmail } from "@/firebase";
  import { useRouter } from "vue-router";
  import { useTheme } from 'vuetify';


  
  export default {
    setup() {
      const router = useRouter();
      const theme = useTheme();
      const isDark = computed(() => theme.global.name.value === 'dark');
      const loading = ref(false);
      const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
      const login = async () => {
        const user = await signInWithGoogle();
        if (user) {
          router.push("/");
        }
      };

      const loginEmail = async () => {
      loading.value = true;
      errorMessage.value = "";
      try {
        const user = await loginWithEmail(email.value, password.value);
        if (user) {
          router.push("/");
        }
      } catch (error) {
        errorMessage.value = error;
        loading.value = false;
      } finally {
        loading.value = false;
      }
    };

      const logItemClass = computed(() => ({
      'login-item-dark': isDark.value,
      'login-item-light': !isDark.value,
    }));
  
      return { login, logItemClass, email, password, errorMessage, loginEmail, loading };
    },
  };
  </script>
  