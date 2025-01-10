
<template>
  <use-clipboard v-slot="{ copy }" :source="source">
    <v-snackbar 
      v-if="tooltipDisabled || alert"
      class="share-button-snackbar"   
      timeout="3500" 
      location="top" 
      activator="#share-button"
      text="Share link copied to clipboard. Paste to share this view!"
      color="success"
      variant="flat"
      min-height="0px"
      min-width="0px"
      transition="slide-y-transition"
      close-on-content-click
      >
    </v-snackbar>
    <v-tooltip :disabled="tooltipDisabled" text="Share selected view">
      <template v-slot:activator="{ props }">
        <v-btn
          id="share-button"
          aria-label="Get link to share selected view"
          class="share-button"
          icon
          @click="copy(source)"
          @keyup.enter="copy(source)"
          v-bind="props"
          :color="buttonColor"
          :elevation="elevation"
          :size="size"
          :rounded="rounded"
        > 
          <v-icon :color="iconColor">mdi-share-variant</v-icon>
        </v-btn>
      </template>
    </v-tooltip>
  </use-clipboard>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    source: {
      type: String,
      required: true,
    },
    buttonColor: {
      type: String,
      default: "#ffffff66",
    },
    iconColor: {
      type: String,
      default: "#333",
    },
    elevation: {
      type: [String, Number],
      default: "0",
    },
    size: {
      type: String,
      default: "small",
    },
    rounded: {
      type: [String, Number],
      default: "1",
    },
    tooltipDisabled: {
      type: Boolean,
      default: false,
    },
    alert: {
      type: Boolean,
      default: false,
    },
    
  },
  
  data() {
    return {
      snackbar: false,
    };
  },
});
</script>

<style>
.share-button {
  z-index: 1000;
  background-color: rgb(255 255 255);
  border: 1px solid black;
  backdrop-filter: blur(5px);
  padding-inline: 5px;
  border-radius: 10px;
}

.share-button-snackbar .v-snackbar__wrapper > .v-snackbar__content {
  padding: 0.75em 1em;
}

</style>