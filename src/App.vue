<script>
import { ref, computed, onMounted } from 'vue';
import { useTheme } from 'vuetify';
import { auth, onAuthStateChanged, signOut } from "@/firebase";
import { useRouter } from "vue-router";
import Login from "@/views/Login.vue"; // Importamos la vista de login

export default {
  components: { Login },
  setup() {
    const drawer = ref(false);
    const theme = useTheme();
    const isDark = computed(() => theme.global.name.value === 'dark');
    const router = useRouter();
    const isAuthenticated = ref(null);

    const toggleTheme = () => {
      theme.global.name.value = isDark.value ? 'light' : 'dark';
    };

    // Clase dinámica para el hover del menú
    const menuItemClass = computed(() => ({
      'menu-item-dark': isDark.value,
      'menu-item-light': !isDark.value,
    }));

    const appBarColor = computed(() => (isDark.value ? 'deep-purple-darken-3' : 'teal-darken-2'));

    const menuItems = [
      { title: 'Inicio', route: '/' },
      { title: 'Hábitos', route: '/habitos' },
      { title: 'Trading', route: '/trading' },
      { title: 'Bitácora', route: '/bitacora' },
      { title: 'Cartera', route: '/cartera' },
      { title: 'Sesiones', route: '/sesiones' },
      { title: 'Alertas', route: '/alertas' },
      { title: 'Calendario', route: '/calendario' },
      { title: 'Calendario Trading', route: '/calendario-trading' },
      { title: 'Métricas', route: '/metricas' },
    ];

    // Cerrar sesión
    const logout = async () => {
      try {
        await signOut(auth);
        isAuthenticated.value = false;
        router.push("/login");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    // Verifica si el usuario está autenticado
    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        isAuthenticated.value = user ? true : false;
      });
    });

    return { 
      drawer, isDark, toggleTheme, appBarColor, menuItems, 
      menuItemClass, isAuthenticated, logout 
    };
  },
};
</script>

<template>
  <v-app v-if="isAuthenticated !== null">
    <!-- Si el usuario NO está autenticado, muestra el login con el botón de cambiar tema -->
    <template v-if="!isAuthenticated">
      <v-container class="login-container">
        <v-btn icon @click="toggleTheme" class="theme-toggle">
          <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>
        <Login />
      </v-container>
    </template>

    <!-- Si está autenticado, muestra toda la app -->
    <template v-else>
      <v-app-bar :color="appBarColor" dark>
        <v-btn icon @click="drawer = !drawer">
          <v-icon>{{ drawer ? 'mdi-menu-open' : 'mdi-menu' }}</v-icon>
        </v-btn>
        <v-toolbar-title>Trading Journal</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="toggleTheme">
          <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
        </v-btn>
      </v-app-bar>

      <!-- Menú lateral compacto -->
      <v-navigation-drawer v-model="drawer" app :permanent="drawer" :width="drawer ? 200 : 60">
        <v-list dense>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.route"
            :class="menuItemClass"
          >
            <v-list-item-title>{{ drawer ? item.title : '' }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-list dense>
          <v-list-item @click="logout" class="logout-item">
            <v-list-item-title v-if="drawer">Cerrar Sesión</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>
    </template>
  </v-app>
</template>

<style scoped>
/* Estilos para el botón de cambiar tema en la pantalla de login */
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.theme-toggle {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
}

/* Estilos del menú */
.menu-item-dark {
  transition: background-color 0.3s;
}
.menu-item-dark:hover {
  background-color: #7E57C2; /* deep-purple-lighten-3 */
  cursor: pointer;
}

.menu-item-light {
  transition: background-color 0.3s;
}
.menu-item-light:hover {
  background-color: #4DB6AC; /* deep-purple-lighten-4 */
  cursor: pointer;
}
.logout-item {
  color: red;
  cursor: pointer;
}
.logout-item:hover {
  background-color: #ffebee; /* Fondo rojo claro */
}
</style>
