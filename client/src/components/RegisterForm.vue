<template>
  <div>
    <input type="email" name="email" placeholder="Email" v-model="email" />
    <input
      type="password"
      name="password"
      placeholder="Password"
      v-model="password"
    />
    <button @click="register">Register</button>
  </div>
</template>

<script>
import AuthenticationSevice from '@/services/AuthenticationSevice';
export default {
  name: 'RegisterForm',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  watch: {
    email(value) {
      console.log(`Email has change to ${value}`);
    },
  },
  methods: {
    async register() {
      await AuthenticationSevice.register({
        email: this.email,
        password: this.password,
      });
    },
  },
  mounted() {
    setTimeout(() => {
      this.email = 'Hello world';
    }, 2000);
  },
};
</script>
