<template>
  <v-dialog v-model="dialogVisible" max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
        <v-icon v-bind="activatorProps" style="margin-left: 1em;font-size: 1em;" elevation="1">mdi-help-circle</v-icon>

    </template>
    <v-card>
      <div class="info-button-close-icon">
        <v-icon class="info-button-close-icon__icon" @click="dialogVisible = false">mdi-close</v-icon>
      </div>
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
      required: false
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

.info-button-close-icon {
  position: relative;
  height: 0.5em;
}

.info-button-close-icon__icon {
  position:absolute;
  right:0;
  cursor:pointer;
  
  padding:1em;
  margin:-1em;
}

.info-button-close-icon__icon:hover {
  background-color: #f0f0f0;
  color: black;
  border-radius: 50%;
  padding: 0.5em;
  margin: -0.5em;
  transition: background-color 0.3s;
}

</style>