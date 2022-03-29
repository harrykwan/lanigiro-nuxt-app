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
              <div class="mt-2 mb-3" style="color: red">
                {{ showerror }}
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
const showerror = ref("");
const router = useRouter();

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
          //   window.location.href = "/";
          router.push("/metamask");
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
      showerror.value = error.message.split("/")[1].split(")")[0];
      console.log(error);
    });
}
</script>
<style scoped>
.pages {
  background: #061e36;
  color: #fff;
  background-image: linear-gradient(to bottom right, #0b2d50, #061e36, #041322);
}
</style>
