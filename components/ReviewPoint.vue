<template>
  <form>
    <span
      v-for="star in 5"
      :key="star"
      @click="rate(star)"
      :class="{ rated: star <= currentRating }"
      >&#9733;</span
    >
  </form>
</template>

<script>
export default {
  data() {
    return {
      currentRating: 0,
    };
  },
  methods: {
    rate(rating) {
      this.currentRating = rating;
      this.$emit("rated", rating); // emit sự kiện để thông báo về component cha
    },
  },
};
</script>

<style scoped>
span {
  cursor: pointer;
  font-size: 24px;
  transition: color 0.3s;
}

span:hover {
  color: gold;
}

.rated {
  color: gold;
}
</style>
