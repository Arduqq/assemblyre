<template>
<div id="program-preview" :style="previewStyle">Preview
    <div class="text-field" v-for="field in program.chords" :key="field.id" :style="previewFieldStyle(field)" >{{field.style.text.content}}</div>
</div>
</template>

<script>
  export default {
    name: "ProgramPreview",
    props: {
      program: {
        type: Object,
        required: true
      },
      width: {
        type: Number,
        required: true
      },
      height: {
        type: Number,
        required: true
      }
    },
    methods: {
      previewFieldStyle(field) {
        return {
          '--field-text-color': field.style.text.textColor,
          '--field-text-size': field.style.text.textSize + "%",
          '--field-border-color': field.style.border.borderColor,
          '--field-border-style': field.style.border.borderStyle,
          '--field-border-size': field.style.border.borderSize + "px",
          '--field-border-radius': field.style.border.borderRadius + "px",
          '--field-text-alignment': field.style.text.textAlignment,
          '--field-shadow-displacement': field.style.shadow.shadowDisplacement + "px",
          '--field-shadow-size': field.style.shadow.shadowSize + "px",
          '--field-shadow-color': field.style.shadow.shadowColor,
          '--field-background-color': field.style.background.backgroundColor,
          '--field-background-image': 'url(@/../assets/' + field.style.background.backgroundImage + '.jpg)',
          '--field-background-size': field.style.background.backgroundSize + '%',
          '--field-x': field.x + 'px',
          '--field-y': field.y + 'px',
          '--field-width': field.w + 'px'
        }
      },
      previewStyle() {
        return {
          '--preview-width': this.width,
          '--preview-height': this.height
        }
      }
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
  }
#program-preview {
  width: var(--preview-width);
  height: var(--preview-height);
}
.text-field {
    display: block;
    flex: 1 1 100%;
    width: var(--field-width);
    min-height: 30px;
    background-color: var(--field-bg-color);
    color: var(--field-text-color);
    border-color: var(--field-border-color);
    border-width: var(--field-border-size);
    border-style: var(--field-border-style);
    border-radius: var(--field-border-radius);
    font-size: var(--field-text-size);
    color: var(--field-text-color);
    text-align: var(--field-text-alignment);
    box-shadow: var(--field-shadow-displacement) var(--field-shadow-displacement) 0 var(--field-shadow-size) var(--field-shadow-color);
    background-color: var(--field-background-color);
    background-image: var(--field-background-image);
    background-size: var(--field-background-size);
    line-height: auto;
    overflow-wrap: break-word;
    padding: 10px;
    margin: 0;
    font-family: "Steps Mono", "Courier New", monospace;
    transform: translate(var(--field-x), var(--field-y));
  }

</style>

