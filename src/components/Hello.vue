<script setup>
</script>

<template>
  <div class="instructions">
    <h1 class="name">Try Dragging me around, zooming in and out and playing with the settings</h1>
  </div>
</template>
  top:50%;

<style lang ="scss">
$textheight: 20%;
$textwidth: 75%;
.instructions{
  pointer-events: none;
  position: absolute;
  width: $textwidth;
  height: $textheight;
  top: calc(50% - $textheight / 2);
  left: calc(50% - $textwidth / 2);
  text-align: center;
  color: white;
}
</style>
