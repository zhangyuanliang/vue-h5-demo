<template>
  <div class="home">
    <input type="button" @click="out" value="退出登录">
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {Toast} from 'vant'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  methods: {
    out() {
      this.$store.dispatch('logOut')
      // this.$router.push('/home')
      Toast('token已清空')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';

input {
  @include wh(3.6rem, 1rem);
  margin-top: 2rem;
  background: #6e6ee4;
  border-radius: .2rem;
  line-height: 1rem;
}
</style>

