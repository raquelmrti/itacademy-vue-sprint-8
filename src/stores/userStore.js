import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

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
    () => userEmail.value === localStorage.getItem('userEmail') &&
      userPassword.value === localStorage.getItem('userPassword')
  )

  function authUser() {
    if (userCredentialsAreCorrect.value) {
      console.log('Logged in!')
      userIsLoggedIn.value = true
    } else {
      console.log('Incorrect email or password.')
      userIsLoggedIn.value = false
    }

    userEmail.value = ''
    userPassword.value = ''
  }

  function handleSuccessfulAuth() {
    alert('Welcome!')
    userEmail.value = ''
    userPassword.value = ''
  }

  return {
    newUserEmail,
    newUserPassword,
    userEmail,
    userPassword,
    registerUser,
    authUser,
    handleSuccessfulAuth,
    userIsLoggedIn
  }
})
