<template>
<img ref="draggableWrapper" class="linked-image" :id="id" :src="url" />
</template>
<script>
  import uniqueId from 'lodash.uniqueid';

  export default {
  name: "LinkedImage",
    props: {
      url: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        alive: true,
        id: uniqueId('linked-image-'),
        screenX: 0,
        screenY: 0
      }
    },
    mounted: function() {
        this.$emit('rendered-image', this.url);
    },
    methods: {
      },
  };
  
  
</script>

<style scoped>
</style>
