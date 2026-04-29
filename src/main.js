import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'

// 스타일 임포트
import './styles/variables.css'
import './styles/reset.css'

const app = createApp(App)

// Pinia (상태 관리) 설정
app.use(createPinia())

// Vue Router 설정
app.use(router)

// 애플리케이션 마운트
app.mount('#app')
