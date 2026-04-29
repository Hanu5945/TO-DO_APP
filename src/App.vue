<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
// App.vue는 라우터 아웃렛만 포함
// 실제 페이지 컨텐츠는 router-view에서 렌더링됨
</script>

<style>
html {
  color-scheme: light;
}

body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}
</style>
