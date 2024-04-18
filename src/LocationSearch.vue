<template>
  <div class="forward-geocoding-container" :style="cssStyles">
    <v-combobox
      v-show="searchOpen"
      :class="['forward-geocoding-input', locationJustUpdated ? 'geocode-success' : '', small ? 'forward-geocoding-input-small' : '']"
      v-model="searchText"
      :items="searchResults ? searchResults.features : []"
      item-title="place_name"
      :label="locationJustUpdated ? 'Location Updated' : (searchErrorMessage ?? 'Enter a location')"
      bg-color="black"
      :density="small ? 'compact' : 'default'"
      hide-details
      solo
      :color="accentColor"
      @input="() => {}"
      @update:model-value="setLocationFromSearchFeature"
      @keydown.enter="performForwardGeocodingSearch"
      @keydown.esc="searchResults = null"
      :error-messages="searchErrorMessage"
      ref="searchInput"
    >
    <template v-slot:append>
      <font-awesome-icon
        class="geocoding-search-icon"
        icon="magnifying-glass"
        :size="searchOpen ? 'xl' : buttonSize"
        :color="!searchOpen || (searchText && searchText.length > 2) ? accentColor : 'gray'"
        @click="toggleSearch"
      ></font-awesome-icon>

      <slot name="append-icon" class="geocode-icon"></slot>

      <font-awesome-icon
        class="geocoding-close-icon"
        v-show="searchOpen && !stayOpen"
        icon="circle-xmark"
        :size="searchOpen ? 'xl' : '1x'"
        color="gray"
        @click="closeSearch"
      ></font-awesome-icon>
    </template>
  </v-combobox>
  <font-awesome-icon
      v-show="!searchOpen && !stayOpen"
      class="geocoding-search-icon"
      icon="magnifying-glass"
      :size="searchOpen ? 'xl' : buttonSize"
      :color="!searchOpen || (searchText && searchText.length > 2) ? accentColor : 'gray'"
      @click="toggleSearch"
    ></font-awesome-icon>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { MapBoxFeatureCollection, MapBoxFeature } from "./mapbox";

type SearchProvider = (searchText: string) => Promise<MapBoxFeatureCollection | null>;

export default defineComponent({
  name: 'LocationSearch',

  emits: ['update:modelValue', 'set-location', 'error', 'geolocate'],

  props: {
    searchProvider: {
      type: Function as PropType<SearchProvider>,
      default: () => {}
    },
    modelValue: {
      type: Boolean,
      default: true,
      required: false,
    },
    stayOpen: {
      type: Boolean,
      default: false,
    },
    accentColor: {
      type: String,
      default: 'white',
    },
    small: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: 'dark',
    },
    buttonSize: {
      type: String,
      default: '1x',
    },
  },
  
  
  

  
  data() {
    return {
      searchOpen: this.modelValue || this.stayOpen,
      searchText: null as string | null,
      searchResults: null as MapBoxFeatureCollection | null,
      searchErrorMessage: null as string | null,
      locationJustUpdated: false,
    };
  },

  computed: {
    cssStyles() {
      return {
        '--accent-color': this.accentColor,
        '--bg-color': 'black',
        '--fg-container-padding': this.searchOpen ? (this.small ? '0px 5px 0px 0px' : '5px 10px 12px 10px') : '0px',
        '--border-radius': this.searchOpen ? '7px' : '20px',
      };
    },
  },
  
  
  

  
  methods: {
    performForwardGeocodingSearch() {
      if (this.searchText === null || this.searchText.length < 3) {
        return;
      }
      this.searchProvider(this.searchText).then((info) => {
        if (info !== null && info.features?.length === 1) {
          this.setLocationFromSearchFeature(info.features[0]);
        } else if (info !== null && info.features?.length == 0) {
          this.searchErrorMessage = "No matching places were found";
          console.log('No matching places were found');
          this.$emit('error', this.searchErrorMessage);
        } else {
          this.searchResults = info;
        }
      });
    },
    
    blurCombobox() {
      console.log('blurring');
      const input = this.$refs.searchInput as HTMLInputElement;
      console.log(input);
      input.blur();
    },
    
    setLocationFromSearchFeature(feature: MapBoxFeature | string) {
      // if it's a  string do nothing
      console.log('setLocationFromSearchFeature', feature);
      if (typeof feature === 'string') {
        return;
      }
      console.log('setting location');
      // blur (defocus) the v-combobox
      this.blurCombobox();
      this.timedJustUpdatedLocation();
      this.clearSearchData();
      this.$emit('set-location', feature);
    },

    toggleSearch() {
      if (this.searchOpen) {
        this.performForwardGeocodingSearch();
      } else {
        this.searchOpen = true;
      }
    },

    closeSearch() {
      this.searchOpen = false;
      this.clearSearchData();
    },

    clearSearchData() {
      this.searchResults = null;
      this.searchText = null;
      this.searchErrorMessage = null;
    },
    
    timedJustUpdatedLocation() {
      this.locationJustUpdated = true;
      setTimeout(() => {
        this.locationJustUpdated = false;
      }, 5000);
    },
  },
  
  watch: {
    
    modelValue(value: boolean) {
      this.searchOpen = value;
    },
    
    searchOpen(value: boolean) {
      this.$emit('update:modelValue', value);
    },
    
    searchText(text: string | null) {
      if (this.searchErrorMessage) {
        this.searchErrorMessage = null;
      }
      if (!text || text.length === 0) {
        this.searchResults = null;
      }
    },
  }
  
});

</script>


<style lang="less">

// https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors
.forward-geocoding-container {
  --border-radius: 20px;
  position: relative;
  width: fit-content;
  color: var(--accent-color);
  background-color: var(--bg-color);
  border: 2px solid var(--accent-color);
  border-radius: var(--border-radius);
  padding: var(--fg-container-padding);


  .v-text-field {
    min-width: 150px;
    width: min(200px, 20vw);
  }
  
  .forward-geocoding-input > .v-input__control > .v-field {
    border-radius: var(--border-radius);
  }
  
  .forward-geocoding-input.geocode-success label {
    color: var(--accent-color);
    opacity: 1;
  }
  
  .forward-geocoding-input-small label {
    // .v-label sets default to 1rem
    font-size: 0.8rem;
  }

  .forward-geocoding-input-row {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    gap: 10px;
    align-items: center;
  }
  
  .geocoding-search-icon {
    padding-inline: calc(0.3 * var(--default-line-height));
    padding-block: calc(0.4 * var(--default-line-height));
  }

  .geocoding-search-icon:hover, #geocoding-close-icon:hover {
    cursor: pointer;
  }

  // For some reason setting width: 100% makes the search results 2px too small
  // It's probably some Vuetify styling thing
  // Maybe there's a better workaround, but this gets the job done for now
  .forward-geocoding-results {
    position: absolute;
    top: 42px;
    left: -1px;
    width: calc(100% + 2px);
    background: var(--bg-color);
    border: 2px solid var(--accent-color);
    border-top: 0px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 0px 10px;
    
    &.results-small {
      top: 37px;
      width: calc(100% + 4px);
      left: -2px;
    }

    .forward-geocoding-result {
      border-top: 1px solid var(--accent-color);
      font-size: 12pt;
      pointer-events: auto;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
