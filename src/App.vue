<script>
import { ref, computed } from 'vue';
import { useTheme } from 'vuetify';

export default {
  setup() {
    const drawer = ref(false);
    const theme = useTheme();
    const isDark = computed(() => theme.global.name.value === 'dark');

    const toggleTheme = () => {
      theme.global.name.value = isDark.value ? 'light' : 'dark';
    };
    const menuItems = [
      'Inicio',
      'Hábitos',
      'Trading',
      'Bitácora',
      'Cartera',
      'Sesiones',
      'Alertas',
      'Calendario',
      'Calendario Trading',
      'Métricas',
    ];
    return { drawer, isDark, toggleTheme, menuItems };
  },
};
</script>
<template>
  <v-app>
    <v-app-bar color="indigo-darken-1" dark>
      <v-btn icon @click="drawer = !drawer">
        <v-icon>{{ drawer ? 'mdi-menu-open' : 'mdi-menu' }}</v-icon>
      </v-btn>
      <v-toolbar-title>Trading Journal</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleTheme">
        <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app :permanent="drawer" :width="drawer ? 200 : 60">
      <v-list dense>
        <v-list-item
          v-for="item in menuItems"
          :key="item"
          class="menu-item"
        >
          <v-list-item-title>{{ drawer ? item : '' }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-card>
          <v-card-title>Bienvenido al Trading Journal</v-card-title>
          <v-card-text>
            Registro de Operaciones y análisis de desempeño
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>
<style scoped>
.menu-item {
  transition: background-color 0.3s;
}
.menu-item:hover {
  background-color: #7E57C2;
  cursor: pointer;
  ; /* deep-purple-lighten-3 */
}
</style>