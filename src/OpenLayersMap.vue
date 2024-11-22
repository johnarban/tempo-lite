<template>
  <div>
  <div id="map"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, withDefaults, nextTick, defineEmits } from "vue";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import ImageLayer from "ol/layer/Image";
import { ImageStatic, XYZ } from "ol/source";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON } from "ol/format";
import { Style, Stroke } from "ol/style";
import { setUserProjection } from "ol/proj";

type Props = {
  imageUrl: string | null;
  projection: string | null;
  bounds: number[];
  geojson: object | null;
};
const props = withDefaults(defineProps<Props>(), {
  imageUrl: null,
  projection: null,
  bounds: () => [-180, -90, 180, 90],
  geojson: null,
});

const emit = defineEmits(["mapready"]);

const map = ref<Map | null>(null);
const imageLayer = ref<ImageLayer<ImageStatic> | null>(null);
const layers = ref([] as unknown[]);
  
function convertBoundsToExtent(bounds: number[]): number[] {
  if (props.projection === 'EPSG:4326') {
    return bounds;
  }
  const [minLon, minLat, maxLon, maxLat] = bounds;
  const bottomLeft = fromLonLat([minLon, minLat]);
  const topRight = fromLonLat([maxLon, maxLat]);
  return [...bottomLeft, ...topRight];
}

const updateImageLayer = () => {
  console.log('updateImageLayer');
  console.log(convertBoundsToExtent(props.bounds));
  if (props.imageUrl && props.projection && props.bounds?.length) {
    const source = new ImageStatic({
      url: props.imageUrl,
      projection: props.projection,
      imageExtent: convertBoundsToExtent(props.bounds),
      interpolate: false,
    });
    if (imageLayer.value) {
      imageLayer.value.setSource(source);
    }
  }
};

function addVectorLayerFromGeoJson(geojson: object) {
  console.log('addVectorFromGeoJson');
  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(geojson, {
      dataProjection: 'EPSG:4326', // projection of the geojson data
      featureProjection: 'EPSG:3857', // the display projection
    }),
  });
  const vectorLayer = new VectorLayer({
    source: vectorSource,
    zIndex: 100,
    style: new Style({
      stroke: new Stroke({
        color: "#000",
        width: 1.5,
      }),
    }),
  });
  if (map.value) {
    map.value.addLayer(vectorLayer);
    layers.value.push(vectorLayer);
  } else {
    console.error('map is not ready');
  }
}


onMounted(() => {
  setUserProjection('EPSG:3857');
  const baseLayer = new TileLayer({
    source: new XYZ({
      url: 'https://{a-c}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
      attributions: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }),
  });

  imageLayer.value = new ImageLayer({
    source: new ImageStatic({
      url: props.imageUrl || '',
      projection: props.projection || 'EPSG:3857',
      imageExtent: convertBoundsToExtent(props.bounds),
      interpolate: false,
    }),
  });
  
  layers.value = [baseLayer, imageLayer.value];
  map.value = new Map({
    target: "map",
    // @ts-expect-error - OpenLayers types are not up-to-date
    layers: [baseLayer, imageLayer.value],
    view: new View({
      center: fromLonLat([-98.789, 40.044]),
      zoom: 4,
      projection: props.projection || 'EPSG:3857',
    }),
  });

  if (props.geojson) {
    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(props.geojson),
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: new Style({
        stroke: new Stroke({
          color: "#000",
          width: 1.5,
        }),
      }),
    });
    map.value.addLayer(vectorLayer);
    layers.value.push(vectorLayer);
  }
  emit('mapready', map.value);
  // console.log("%cmap is ready", "color: green");
  // fetch("coastlines.geojson")
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     addVectorFromGeoJson(data);
  //   }
  //   );
});

// watch(() => props.imageUrl, updateImageLayer);
// watch(() => props.projection, updateImageLayer);
// watch(() => props.bounds, updateImageLayer);
watch([() => props.imageUrl, () => props.projection, () => props.bounds], () => {
  nextTick(() => {
    updateImageLayer();
  });
});
watch(() => props.geojson, addVectorLayerFromGeoJson);
</script>

<style>
/* #map {
  width: 100%;
  height: 500px;
} */
</style>