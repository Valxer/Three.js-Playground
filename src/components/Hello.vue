<script setup>
</script>

<template>
  <div class="absolute text-white">
    <h1 class="name">Hi, I'm Kevin LE VAN PHUNG</h1>
    <div class="wrappper">
      <div class="typing typing1">A Web Developer</div>
      <div class="typing typing2">A Challenge-driven creator</div>
      <div class="typing typing3">An Ever-evolving coder</div>
    </div>
  </div>
</template>

<style lang ="scss">
.absolute {
  position: absolute;
}

.text-white {
  color: white;
}

.wrapper {
  height: 100vh;
  position: relative
}

.typing {
  position: absolute;
  width: 0;
  white-space: nowrap;
  overflow: hidden;
  border-right: none;
  font-family: monospace;
  font-size: 2em;
  &1 {
    animation: typing1 12s steps(15) infinite , blink .5s step-end infinite alternate;
  }
  &2 {
    animation: typing2 12s steps(26) infinite , blink .5s step-end infinite alternate;
  }
  &3 {
    animation: typing3 12s steps(22) infinite , blink .5s step-end infinite alternate;
  }
}

@keyframes typing1 {
  0% {
    border-right: 3px solid;
    width: 0;
  }
  0.5% {
    border-right: 3px solid;
    width: 0;
  }
  16.5% {
    width: 15ch;
    border-right: 3px solid;
  }
  22% {
    width: 15ch;
    border-right: 3px solid;
  }
  30% {
    width: 0;
    border-right: 3px solid;
  }
  33% {
    border-right: none;
  }
}
@keyframes typing2 {
  0% {
    width: 0;
  }
  30% {
    border-right: none;
  }
  36% {
    border-right: 3px solid;
    width: 0;
  }
  49.5% {
    border-right: 3px solid;
    width: 26ch;
  }
  55% {
    border-right: 3px solid;
    width: 26ch;
  }
  63% {
    border-right: 3px solid;
    width: 0;
  }
  66% {
    border-right: none;
  }
}
@keyframes typing3 {
  0% {
    width: 0;
  }
  63% {
    border-right: none;
  }
  69% {
    border-right: 3px solid;
    width: 0;
  }
  82.5%  {
    border-right: 3px solid;
    width: 22ch;
  }
  88.5% {
    border-right: 3px solid;
    width: 22ch;
  }
  97% {
    border-right: 3px solid;
    width: 0;
  }
  100% {
    border-right: none;
  }
}
    
@keyframes blink {
  50% {
    border-color: transparent
  }
}
</style>
