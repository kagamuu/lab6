import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import FeedView from '../views/FeedView.vue'
import AuthorProfileView from '../views/AuthorProfileView.vue'
import LoginView from '../views/LoginView.vue'
import AdminLayout from '../views/AdminLayout.vue'
import CreateAuthorView from '../views/CreateAuthorView.vue'
import CreatePostView from '../views/CreatePostView.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'feed',
            component: FeedView
        },
        {
            path: '/author/:id',
            name: 'author-profile',
            component: AuthorProfileView
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
        {
            path: '/admin',
            component: AdminLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: 'create-author',
                    name: 'create-author',
                    component: CreateAuthorView
                },
                {
                    path: 'create-post',
                    name: 'create-post',
                    component: CreatePostView
                }
            ]
        }
    ]
})

router.beforeEach((to, _from, next) => {
    const authStore = useAuthStore()

    if (to.meta.requiresAuth && !authStore.isLoggedIn) {
        next('/login')
    } else {
        next()
    }
})

export default router