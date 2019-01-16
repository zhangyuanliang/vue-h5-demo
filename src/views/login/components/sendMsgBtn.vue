<template>
  <span :class="['send-msg', {'disabled': disabled}]" @click="sendMsg">{{innerText}}</span>
</template>

<script>
export default {
  props: {
    innerText: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    sendMsg: function() {
      if (!this.disabled) {
        this.$emit('send')
      }
    }
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.send-msg {
  width: 3.47rem;
  height: 1.14rem;
  border: 1px solid #69a4fe;
  border-radius: .21rem;
  color: #69A4FE;
  text-align: center;
  line-height: 1.14rem;
}
.disabled {
  border: 1px solid #8c8c8d;
  color: #8c8c8d;
}
</style>

