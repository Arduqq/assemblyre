<template>
<img ref="draggableWrapper" class="linked-image" :id="id" :src="url" />
</template>
<script>

  export default {
  name: "LinkedImage",
    props: {
      id: {
        type: Number,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        alive: true,
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
