import api from '../../api/apiService'
import type { LoginResponse } from '../../types'

export async function login(username: string, password: string) {
    const response = await api.post<LoginResponse>('/auth/login', { username, password })
    return response.data
}

export async function logout() {
    const response = await api.post<LoginResponse>('/auth/logout')
    return response.data
}