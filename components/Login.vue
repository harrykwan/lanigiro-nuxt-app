<template>
  <div class="pages section">
    <div class="container">
      <div class="pages-head">
        <h3>LOGIN</h3>
      </div>
      <div class="login">
        <div class="row">
          <form class="col s12">
            <div class="input-field">
              <input
                type="email"
                class="validate"
                placeholder="Email"
                required
                v-model="email"
              />
            </div>
            <div class="input-field">
              <input
                type="password"
                class="validate"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>

            <a href=""><h6>Create new Account</h6></a>
            <a href="#" class="button-default" v-on:click="login()">Login</a>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");

function login() {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      window.location.href = "/";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}
</script>
