<template>
  <div>
    <div class="text-center carregando">
      <div class="blur">
        <div>
          <b-spinner variant="primary" label="Spinning"></b-spinner>
          <p class="pl-4">carregando</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Spinner",
};
</script>

<style lang="scss" scoped>
.carregando {
  .blur {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;

    div {
      display: flex;
    }
  }
  p {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--light);
  }
}
</style>
