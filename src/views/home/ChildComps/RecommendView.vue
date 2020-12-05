<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.id" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: "",
    };
  },
  props: {
    recommends: {
      type: Array,
      required: true,
    },
  },
  methods: {},
};
</script>

<style scoped>
.recommend {
  display: flex;
}
.recommend-item {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #5a5a5a;
  padding: 15px 0 20px;
border-bottom: 8px solid #eee;
}
.recommend-item img {
  width: 68px;
  height: 68px;
  margin-bottom: 5px;
}
</style>
