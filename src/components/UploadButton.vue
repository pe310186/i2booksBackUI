<template>
  <v-btn dark class="btn--dark-flat-focused jbtn-file"> {{ title }}<input
    type="file" accept="accept"  v-on:change="fileSelected"></v-btn>
</template>

<script>
  export default {
    name: 'upload-button',
    props: {
      accept: String,
      selectedCallback: Function,
      title: String,
      name: String,
    },
    methods: {
      fileSelected(e) {
        if (this.selectedCallback) {
          console.log(e)
          if (e.target.files[0]) {
            this.selectedCallback(this.name, e.target.files[0], e.target.value);
          } else {
            this.selectedCallback(null);
          }
        }
      }
    }
  }
</script>

<style scoped>
  .jbtn-file {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-left: 5px;
  }

  .jbtn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
  }
</style>