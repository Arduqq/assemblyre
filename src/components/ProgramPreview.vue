<template>
<div id="program-preview">Preview
    {{program}}
</div>
</template>

<script>
  export default {
    name: "ProgramPreview",
    props: {
      program: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }


</style>