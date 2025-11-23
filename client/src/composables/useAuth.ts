import { ref } from 'vue'
import { login as loginApi, logout as logoutApi } from '../controllers/User/user.api'

export function useAuth() {
    const isLoading = ref(false)

    async function login(username: string, password: string) {
        isLoading.value = true
        try {
            const result = await loginApi(username, password)
            return result
        } finally {
            isLoading.value = false
        }
    }

    async function logout() {
        isLoading.value = true
        try {
            const result = await logoutApi()
            return result
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        login,
        logout
    }
}