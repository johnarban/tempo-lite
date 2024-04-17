
<template>
<div :id="id" class="colorbar-container">
  <div 
    :style="{'--background-color': backgroundColor}"
    class="colorbar">
  </div>
  <div class="colorbar-labels"> 
    <div><slot name="start">0%</slot></div>
    <div>
      <slot name="label">{{ label }}</slot>
    </div>
    <div><slot name="end">100%</slot></div>
  </div>
</div>
</template>



<script lang="ts">
import { defineComponent, PropType } from 'vue';

// type for a function that maps to either a  (color, opacity) pair or just a color
type ColorFunction = (x: number) => string;

export default defineComponent({
  name: 'ColorBar',
  props: {
    
    name: {
      type: String,
      default: null
    },
    
    nsteps: {
      type: Number,
      default: 20
    },
    label: {
      type: String,
      default: 'Colorbar'
    },
    
    cmap: {
      type: Function as PropType<ColorFunction>,
      default: (x: number) => `rgb(255,0,${x * 255})`
    },
    
    backgroundColor: {
      type: String,
      default: '#5c5229'
    },
    
    triangles: {
      type: Boolean,
      default: true
    }
    
  },
  
  
  mounted() {
    this.colorbarGradient();
  },
  
  computed: {
    id() {
      return this.name ? `colorbar-${this.name}` : `colorbar-${Math.random().toString(36).slice(2)}`;
    }
  },
  
  
  
  methods: {
    
    cssLinearGradientFromCmap() {
      const n = this.nsteps;
      const colors = Array.from({length: n+1}, (_, i) => {
        const co = this.cmap(i/n);
        const [color, _opacity] = Array.isArray(co) ? co : [co,1];
        return `${color} ${i*100/n}%`;
      });
      return `linear-gradient(to top, ${colors.join(', ')})`;
    },
    
    colorbarGradient() {
      const colorbar = document.querySelector('#' + this.id + '> .colorbar');
      if (!colorbar) {
        return;
      }
      // remove all the children of the colorbar
      while (colorbar.firstChild) {
        colorbar.removeChild(colorbar.firstChild);
      }
      const div = document.createElement('div');
      div.className = 'colorbar-chunk';
      div.style.background = this.cssLinearGradientFromCmap();
      div.style.height = '100%';
      
      
      // add the start and end triangles
      if (this.triangles) {
        const start = document.createElement('div');
        start.className = 'colorbar-start';
        const end = document.createElement('div');
        end.className = 'colorbar-end';
        colorbar.appendChild(end);
        colorbar.appendChild(div);
        colorbar.appendChild(start);
      
        if (start) {
          start.style.backgroundColor = this.cmap(0);
          this.styleDownTriangle(start as HTMLDivElement);
        }
        if (end) {
          end.style.backgroundColor = this.cmap(1);
          this.styleUpTriangle(end as HTMLDivElement);
        }
      } else {
        colorbar.appendChild(div);
      }
    },
    
    styleUpTriangle(div: HTMLDivElement) {
      const width = div.offsetWidth;
      let height = div.offsetHeight;
      const color = div.style.backgroundColor;
      height = Math.min(Math.max(height, 15), 0.86 * width);
      div.style.backgroundColor = 'transparent';
      div.style.borderLeft = `${width/2}px solid transparent`;
      div.style.borderRight = `${width/2}px solid transparent`;
      div.style.borderBottom = `${height}px solid ${color}`;
    },
    
    styleDownTriangle(div: HTMLDivElement) {
      const width = div.offsetWidth;
      let height = div.offsetHeight;
      const color = div.style.backgroundColor;
      height = Math.min(Math.max(height, 15), 0.86 * width);
      div.style.backgroundColor = 'transparent';
      div.style.borderLeft = `${width/2}px solid transparent`;
      div.style.borderRight = `${width/2}px solid transparent`;
      div.style.borderTop = `${height}px solid ${color}`;
    }
  },
  
  watch: {
    nsteps() {
      this.colorbarGradient();
    },
    cmap() {
      this.colorbarGradient();
    }
  }
  
});
</script>

<style scoped>
.colorbar-container {
  position: relative;
  display: inline-block;
  --width: 1.25em;
  width: fit-content;
  margin-left: 5px;
  margin-right: 1em;
  background: var(--background-color);
  user-select: none;
}

.colorbar {
  height: 100%;
  width: var(--width);
  margin-left: 5px;
  margin-right: 1em;
  background: var(--background-color);
  display:flex;
  flex-direction: column;
  filter: drop-shadow(0 0 0.1rem white);
}

/* make .colorbar-start and .colorbar-end triangles */
.colorbar-chunk {
  
  flex-shrink: 1;
  flex-grow:1;
}

.colorbar-start {
  flex-basis: min-content;
  flex-shrink: 0;
  flex-grow:1;
}

.colorbar-end {
  flex-basis: min-content;
  flex-shrink: 0;
  flex-grow: 1;
}



.colorbar-labels {
  position: absolute;
  width: max-content;
  height: 100%;
  top: 50%;
  /* right: -1.5ch; */
  transform-origin: top center;
  transform: rotate(180deg) translate(-150%,-50%);
  writing-mode: vertical-rl;
  
  display: flex;
  justify-content: space-between;
  }
</style>
