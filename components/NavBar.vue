<!-- https://codepen.io/shieldsma91/pen/zLpbLX -->

<template>
  <div>
    <div class="topcover"></div>
    <!-- navbar top -->
    <div class="navbar-top">
      <div class="side-nav-panel-left">
        <a href="#" v-on:click="openNav()" class="side-nav-left"
          ><i class="fa fa-bars"></i
        ></a>
      </div>
      <!-- site brand	 -->
      <div class="site-brand">
        <a href="/"><h1>LANIGIRO</h1></a>
      </div>
      <!-- end site brand	 -->
      <div class="side-nav-panel-right">
        <i v-on:click="signout()" class="fas fa-sign-in-alt"></i>

        <!-- <a href="cart.html" class="side-nav-right"
        ><i class="fa fa-shopping-basket"></i><span>2</span></a
      > -->
      </div>
    </div>
    <!-- end navbar top -->

    <div id="mySidebar" class="sidebar">
      <a href="javascript:void(0)" class="closebtn" v-on:click="closeNav()"
        >×</a
      >
      <div class="ml-5">
        <h3>{{ displayname }}</h3>
        <p style="opacity: 0.3">
          {{ walletid.substring(0, walletid.length / 2) }}<br />
          {{ walletid.substring(walletid.length / 2) }}
        </p>
      </div>

      <NuxtLink v-if="nowuser" to="/"><a href="/">Home</a></NuxtLink>
      <NuxtLink v-if="nowuser" to="/explore"><a href="/">Explore</a></NuxtLink>
      <NuxtLink v-if="nowuser" to="/profile"><a href="/">Profile</a></NuxtLink>
      <NuxtLink v-if="nowuser" to="/metamask"
        ><a href="#">MetaMask</a></NuxtLink
      >
      <NuxtLink v-if="nowuser" to="/earn"><a href="#">Earn</a></NuxtLink>
      <NuxtLink v-if="!nowuser" to="/login"><a href="#">Login</a></NuxtLink>
      <NuxtLink v-if="!nowuser" to="/createaccount"
        ><a href="#">Sign Up</a></NuxtLink
      >

      <!-- <a href="#">Contact Us</a> -->
    </div>
  </div>
  <!-- end side nav left-->
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";
// const walletid = ref("Please Login");

const navopen = ref(false);
const walletid = useWallet();
const router = useRouter();
const nowuser = useFirebaseAuth();
const displayname = computed(() => {
  // return "Please Login";
  if (nowuser.value) {
    return "Welcome " + nowuser.value.displayName;
  } else {
    return "Please Login";
  }
});

function signout() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      walletid.value = "";
      router.push("/login");
    })
    .catch((error) => {
      // An error happened.
    });
}

function openNav() {
  if (navopen.value) {
    closeNav();
    return;
  } else {
    document.getElementById("mySidebar").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
    navopen.value = true;
    return;
  }
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  // document.getElementById("main").style.marginLeft = "0";
  navopen.value = false;
  return;
}
</script>

<style scoped>
.navbar-top {
  background: #041322;
  color: white !important;
}

.topcover {
  background: #041322;
  width: 100%;
  height: 500px;
  position: fixed;
  top: -500px;
  z-index: 999;
}

h1,
i {
  color: white !important;
}

.sidebar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  /* background-color: #111; */
  /* background-color: rgba(255, 255, 255, 0.8); */
  background: #041322;
  color: white;
  opacity: 0.8;
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 100px;
  backdrop-filter: blur(200px);
}

.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  /* color: #d3d0d0; */
  display: block;
  transition: 0.3s;
  /* color: rgba(0, 0, 0, 0.8); */
  color: white;
}

.sidebar a:hover {
  color: #f1f1f1;
}

.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
}

.openbtn {
  font-size: 20px;
  cursor: pointer;
  background-color: #111;
  color: white;
  padding: 10px 15px;
  border: none;
}

.openbtn:hover {
  background-color: #444;
}

#main {
  transition: margin-left 0.5s;
  padding: 16px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar a {
    font-size: 18px;
  }
}
</style>
