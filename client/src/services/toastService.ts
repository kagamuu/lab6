export type ToastType = 'success' | 'error' | 'info'

export function showToast(message: string, type: ToastType = 'info') {
    const toast = document.createElement('div')
    toast.className = `alert alert-${type} fixed top-4 right-4 w-96 z-50 shadow-lg`
    toast.textContent = message

    document.body.appendChild(toast)

    setTimeout(() => {
        toast.remove()
    }, 3000)
}