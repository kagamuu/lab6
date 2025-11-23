import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const isLoggedIn = ref(false)

    function setLoggedIn(value: boolean) {
        isLoggedIn.value = value
        localStorage.setItem('isLoggedIn', value.toString())
    }

    function checkAuth() {
        const stored = localStorage.getItem('isLoggedIn')
        isLoggedIn.value = stored === 'true'
    }

    return {
        isLoggedIn,
        setLoggedIn,
        checkAuth
    }
}, {
    persist: true
})