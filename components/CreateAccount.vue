<template>
  <div>
    <!-- register -->
    <div class="pages section">
      <div class="container">
        <div class="pages-head">
          <h3>REGISTER</h3>
        </div>
        <div class="register">
          <div class="row">
            <form class="col s12">
              <div class="input-field">
                <input
                  type="text"
                  class="validate"
                  placeholder="Name"
                  required
                  v-model="name"
                />
              </div>
              <div class="input-field">
                <input
                  type="email"
                  placeholder="Email"
                  class="validate"
                  required
                  v-model="email"
                />
              </div>
              <div class="input-field">
                <input
                  type="password"
                  placeholder="Password"
                  class="validate"
                  required
                  v-model="password"
                />
              </div>
              <div v-on:click="signup()" class="button-default">Register</div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- end register -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

const name = ref("");
const email = ref("");
const password = ref("");

function signup() {
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in
      updateProfile(auth.currentUser, {
        displayName: name.value,
      })
        .then(() => {
          // Profile updated!
          // ...
          console.log("done");
          window.location.href = "/";
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log(error);
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(error);
    });
}
</script>
