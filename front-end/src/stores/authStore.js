import { defineStore } from "pinia";
import httpService from "../http";
import router from "@/router";
import { computed, ref } from "vue";


export const userAuthStore = defineStore("authStore", () => {

    const user = ref(sessionStorage.getItem('user') ?? null)
    const token = ref(sessionStorage.getItem('token') ?? null)
    const cartShopping = ref(0)

    const isLoggin = computed(() => Boolean(token.value))
    function changeUser(name) {
        user.value = name
    }

    const clearToken = () => {
        token.value = null
        user.value = null
        sessionStorage.clear()
    }

    const saveToken = (newToken) => {
        token.value = newToken
        sessionStorage.setItem('token', newToken)
    }

    const getUser =() => {
        httpService.get('/v1/user').then(resp => {
            user.value = resp.data.user
            sessionStorage.setItem('user', JSON.stringify(user.value))
            
        }).then(err => console.log(err))
    }

    const getTotalCard = () => {
        // cartShopping.value ++
        httpService.get('/v1/checkCart')
        .then((resp) =>{
            cartShopping.value = resp.data.data
            
        })
        .catch(err => console.log(err))
    }
    // const token = ref(sessionStorage.getItem('token'))
    // const user = ref(JSON.parse(sessionStorage.getItem('user')))
    // const isAuth = ref(false)

    // function setToken(tokenValue) {
    //     sessionStorage.setItem('token', tokenValue)
    //     token.value = tokenValue
    // }

    // function setIsAuth(auth) {
    //     isAuth.value = auth
    // }

    // function setUser(userValue){        
    //     sessionStorage.setItem('user', JSON.stringify(userValue))
    //     user.value = userValue
    // }

    // async function checkToken() {
    //     try {
    //         const tokenAuth = 'Bearer '+token.value
    //         const { data } = await httpService.get('/v1/verifyToken', {
    //             headers: {
    //                 Authorization: tokenAuth
    //             }
    //         })
            
    //         return data
    //     } catch (error) {
    //         isAuth.value = false
    //         console.log(error);
    //     }
    // }

    // function logout() {
    //     sessionStorage.removeItem('token')
    //     sessionStorage.removeItem('user')
    //     token.value = ''
    //     user.value = ''
    //     isAuth.value = false
    //     router.push('/')
    // }

    return {
        user,
        isLoggin,
        changeUser,
        saveToken,
        token,
        getUser,
        clearToken,
        getTotalCard,
        cartShopping
    }
});
