<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-card elevation="3" class="pa-4 text-center">
          <v-card-title>Total Transacciones</v-card-title>
          <v-card-text class="text-h5 font-weight-bold">{{ totalTransacciones }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card elevation="3" class="pa-4 text-center">
          <v-card-title>PnL Total</v-card-title>
          <v-card-text class="text-h5 font-weight-bold">{{ pnlTotal.toFixed(2) }} USD</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card elevation="3" class="pa-4 text-center">
          <v-card-title>PnL Promedio</v-card-title>
          <v-card-text class="text-h5 font-weight-bold">{{ pnlPromedio.toFixed(2) }} USD</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="3">
        <v-card elevation="3" class="pa-4 text-center">
          <v-card-title>Factor de Beneficio</v-card-title>
          <v-card-text class="text-h5 font-weight-bold">{{ factorBeneficio.toFixed(2) }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card elevation="3" class="pa-4">
          <v-card-title>PnL Acumulado</v-card-title>
          <v-card-text>
            <p class="text-h5 font-weight-bold">{{ pnlAcumulado.toFixed(2) }} USD</p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="3" class="pa-4">
          <v-card-title>Ratio de Operaciones</v-card-title>
          <v-card-text>
            <p class="text-h5 font-weight-bold">{{ ganadoras }} / {{ perdedoras }}</p>
            <p class="text-subtitle-1">
              {{ ((ganadoras / (ganadoras + perdedoras || 1)) * 100).toFixed(2) }}% ganadoras
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card elevation="3" class="pa-4">
          <v-card-title>Operaciones Largo vs Corto</v-card-title>
          <v-card-text>
            <apexchart width="100%" type="pie" :options="operacionesOptions" :series="[largo, corto]" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/firebase';

export default {
  setup() {
    const {user} = useAuth();
    const userData = ref(user);
    const operationsList = ref([]);
    const totalTransacciones = ref(0);
    const pnlTotal = ref(0);
    const pnlPromedio = ref(0);
    const ganadoras = ref(0);
    const perdedoras = ref(0);
    const largo = ref(0);
    const corto = ref(0);
    const pnlAcumulado = ref(0);
    const factorBeneficio = ref(0);

    const fetchOperations = async () => {
  
      if (!user.value) return;
      const docRef = doc(collection(db, 'operations_data'), user.value.uid);
      const docSnap = await getDoc(docRef);
      console.log(user.uid);
      if (docSnap.exists()) {
        operationsList.value = docSnap.data().values.operations || [];
        
        calculateMetrics();
      }
    };
    console.log(userData);
    const calculateMetrics = () => {
      totalTransacciones.value = operationsList.value.length;
      pnlTotal.value = operationsList.value.reduce((sum, op) => sum + (op.PNL || 0), 0);
      pnlPromedio.value = pnlTotal.value / (totalTransacciones.value || 1);
      ganadoras.value = operationsList.value.filter(op => op.Resultado === 'Ganadora').length;
      perdedoras.value = operationsList.value.filter(op => op.Resultado === 'Perdedora').length;
      largo.value = operationsList.value.filter(op => op.address === 'Largo').length;
      corto.value = operationsList.value.filter(op => op.address === 'Corto').length;
      pnlAcumulado.value = pnlTotal.value;
      factorBeneficio.value = ganadoras.value > 0 ? (pnlTotal.value / (perdedoras.value || 1)) : 0;
    };

    onMounted(fetchOperations);

    const operacionesOptions = {
      chart: { type: 'pie' },
      labels: ['Largo', 'Corto'],
      colors: ['#1E88E5', '#FFC107'],
    };

    return {
      totalTransacciones,
      pnlTotal,
      pnlPromedio,
      ganadoras,
      perdedoras,
      largo,
      corto,
      pnlAcumulado,
      factorBeneficio,
      operacionesOptions,
    };
  },
};
</script>