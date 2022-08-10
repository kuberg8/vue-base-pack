<template>
  <div class="loader__small">
    <div class="loader__circle"></div>
    <div class="loader__circle"></div>
    <div class="loader__circle"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.loader__small {
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 50px;
  justify-content: center;
  align-items: center;
}

.loader__circle {
  display: flex;
  min-width: 11px;
  min-height: 11px;
  border-radius: 50%;
  background: $dark-blue;
  -webkit-animation: scale 1s infinite 0s;
  animation: scale 1s infinite;
  animation-timing-function: ease;
  margin: 0 6px;
  -webkit-transform: scale(0);
  transform: scale(0);

  &:nth-child(2) {
    animation-delay: 100ms;
  }

  &:nth-child(3) {
    animation-delay: 200ms;
  }

  &:nth-child(4) {
    animation-delay: 300ms;
  }

  &:nth-child(5) {
    animation-delay: 300ms;
  }
}

@-webkit-keyframes scale {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}

@keyframes scale {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  50% {
    -webkit-transform: scale(1.5);
    transform: scale(1.5);
  }
  100% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
}
</style>
