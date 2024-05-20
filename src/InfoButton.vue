<template>
  <v-dialog v-model="dialogVisible" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
        <v-icon v-bind="activatorProps" style="margin-left: 1em;font-size: 1em;" elevation="1">mdi-help-circle</v-icon>

    </template>
    <v-card>
      <div class="v-card-info-text ma-3">
        <slot>{{ helpText }}</slot>
      </div>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InfoButton',
  props: {
    helpText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false
    };
  }
});
</script>

<style>
.v-card-info-text {
  font-size: 1em;
  line-height: 1.5em;
  
}

.v-card-info-text > p {
  margin-bottom: 1em;
}
</style>