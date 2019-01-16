<template>
  <div class="login-wrap">
    <div class="content">
      <div class="item phone">
        <img src="../../assets/images/login/phone-icon@2x.png" alt="">
        <input type="number" placeholder="请输入手机号码" v-model="phone">
      </div>
      <div v-if="loginByPwd" class="item">
        <img class="pwd" src="../../assets/images/login/pwd-btn@2x.png" alt="">
        <input v-if="hidePwd" type="password" v-model="pwdInput" placeholder="请输入密码">
        <input v-else type="text" v-model="pwdInput" placeholder="请输入密码">
        <img v-if="!hidePwd" @click="hidePwd=!hidePwd" class="hide-icon" src="../../assets/images/login/hide-pwd@2x.png"
             alt="">
        <img v-else @click="hidePwd=!hidePwd" class="show-icon" src="../../assets/images/login/show-pwd@2x.png" alt="">
      </div>
      <div v-else class="item">
        <img class="verif-icon" src="../../assets/images/login/verification-icon2x.png" alt="">
        <input type="text" v-model="verifInput" placeholder="请输入验证码">
        <!-- <span class="send-msg" @click="getSmsCodeByPhone">点击获取</span> -->
        <SendMsgBtn
          :disabled="disabled"
          :innerText="text"
          @send="getSmsCodeByPhone"
        ></SendMsgBtn>
      </div>
      <div class="btns">
        <div class="btn" @click="toLogin"></div>
      </div>
      <div class="others">
        <div>
          还没有账号？<span @click="toRegister">立即注册</span>
        </div>
        <span v-if="loginByPwd" @click="loginByPwd=!loginByPwd">验证码登录</span>
        <span v-else @click="loginByPwd=!loginByPwd">密码登录</span>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from '@/api/axios.config'
  import {BASE_URL, test_token} from '@/utils/constants'
  import {Toast} from 'vant'
  import {mapActions} from 'vuex'
  import SendMsgBtn from './components/sendMsgBtn'

  export default {
    data() {
      return {
        hidePwd: true,
        pwdInput: '',
        phone: '15194100217',
        loginByPwd: true,
        verifInput: '',
        disabled: false,
        second: 60,
        time: 0
      }
    },
    computed: {
      text: function() {
        return this.time > 0 ? this.time + 's' : '点击获取'
      }
    },
    components: {
      SendMsgBtn
    },
    methods: {
      ...mapActions([
        'login'
      ]),
      run: function() {
        this.time = this.second
        this.timer()
      },
      stop: function() {
        this.time = 0
        this.disabled = false
      },
      timer: function() {
        if (this.time > 0) {
          this.time--
          setTimeout(this.timer, 1000)
        } else {
          this.stop()
        }
      },
      validate() {
        var result = {
          success: false,
          msg: ''
        }
        if (!this.phone) {
          result.msg = "请输入手机号码！"
          return result
        }
        if (this.loginByPwd && !this.pwdInput) {
          result.msg = "请输密码！"
          return result
        }
        if (!this.loginByPwd && !this.verifInput) {
          result.msg = "请输入验证码！"
          return result
        }
        result.success = true
        return result
      },
      toLogin: function () {
        var result = this.validate()
        if (!result.success) {
          Toast(result.msg)
          return false
        }
        var data = {
          loginType: this.loginByPwd ? 0 : 1, // 0表示帐号密码登录，1表示短信登录
          phone: this.phone,
          password: this.pwdInput,
          code: this.verifInput
        }
        // test
        this.$store.dispatch('login', test_token)
        this.$router.push('/home')
        
        /* var that = this
        $.post(BASE_URL + '/register/canLogin', data)
          .then(function(res) {
            var res = res.data.data
            if (res.result) {
              that.$store.dispatch('login', res.token)
              that.$router.push('/home')
            } else {
              Toast("登录失败！")
            }
          }).catch(function() {
            console.log('登录失败')
          }) */
      },
      getSmsCodeByPhone: function() {
        var that = this
        if (!this.phone) {
          Toast("请输入手机号码！")
          return
        }
        that.disabled = true
        that.run()
        /* $.get(BASE_URL + '/register/getSmsCodeByPhone?phone=' + this.phone)
          .then(function(res) {
            Toast('发送成功！')
            that.run()
          }).catch(function () {
            console.log('获取验证码失败！')
          }) */
      },
      toRegister: function () {
        Toast('register')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/mixin.scss';

  .login-wrap {
    @include wh(100%, 100%);
    @include bis('../../assets/images/login/loginByPwdBg@2x.png');
    .content {
      padding: 10.86rem .86rem 0 .86rem;
      .item {
        height: 2.3rem;
        border-bottom: 1px solid #69A4FE;
        margin-top: .56rem;
        display: flex;
        align-items: center;
        img {
          @include wh(.69rem, 1.05rem);
          margin-right: .51rem;
          &.pwd {
            @include wh(.75rem, .86rem);
          }
          &.verif-icon {
            @include wh(.82rem, .88rem);
          }
          &.hide-icon {
            @include wh(.94rem, .43rem);
            margin-left: .4rem;
          }
          &.show-icon {
            @include wh(.94rem, .62rem);
            margin-left: .4rem;
          }
        }
        input {
          flex-grow: 1
        }
      }
      .btns {
        @include fj(center);
        margin: 1.39rem 0 .66rem 0;
        .btn {
          @include wh(14.27rem, 1.89rem);
          @include bis('../../assets/images/login/sure-btn@2x.png')
        }
      }
      .others {
        @include fj(space-between);
        span {
          color: #3784FB;
        }
      }
    }
  }
</style>

