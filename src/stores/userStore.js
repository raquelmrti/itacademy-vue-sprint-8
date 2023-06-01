import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('userStore', () => {
  // sign up
  const newUserEmail = ref('')
  const newUserPassword = ref('')

  function registerUser() {
    localStorage.setItem('userEmail', newUserEmail.value)
    localStorage.setItem('userPassword', newUserPassword.value)
    console.log('New user registered.')
    console.log(
      `Email: ${localStorage.getItem('userEmail')},
       Password: ${localStorage.getItem('userPassword')}`
    )
    newUserEmail.value = ''
    newUserPassword.value = ''
  }

  // log in
  const userEmail = ref('')
  const userPassword = ref('')
  const userIsLoggedIn = ref(false)

  const userCredentialsAreCorrect = computed(
    () =>
      userEmail.value === localStorage.getItem('userEmail') &&
      userPassword.value === localStorage.getItem('userPassword')
  )

  const router = useRouter()

  function authUser() {
    if (userCredentialsAreCorrect.value) {
      console.log('Logged in!')
      userIsLoggedIn.value = true

      if (attemptedRoute.value) {
        router.push(attemptedRoute.value)
        attemptedRoute.value = null
      }
    } else {
      console.log('Incorrect email or password.')
      userIsLoggedIn.value = false
    }

    userEmail.value = ''
    userPassword.value = ''
  }

  // modals
  const showModalLogIn = ref(false)
  const showModalSignUp = ref(false)

  const attemptedRoute = ref(null)

  return {
    newUserEmail,
    newUserPassword,
    userEmail,
    userPassword,
    registerUser,
    authUser,
    userIsLoggedIn,
    showModalLogIn,
    showModalSignUp,
    attemptedRoute
  }
})
