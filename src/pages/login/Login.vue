<script lang="ts">
import loginApi from '@/service/api/login';

// defineProps<{ msg: string }>();

// const count = ref(0);
export default {
  name: 'LoginPage',
  methods: {
    login() {
      loginApi.login({ userName: '', passWord: '' });
    },
  },
};
</script>

<template>
  <div @click="login">login</div>
</template>
