<!-- https://codepen.io/shieldsma91/pen/zLpbLX -->

<template>
  <div>
    <!-- navbar top -->
    <div class="navbar-top">
      <div class="side-nav-panel-left">
        <a href="#" data-activates="slide-out-left" class="side-nav-left"
          ><i class="fa fa-bars"></i
        ></a>
      </div>
      <!-- site brand	 -->
      <div class="site-brand">
        <a href="#"><h1>LANIGIRO</h1></a>
      </div>
      <!-- end site brand	 -->
      <div class="side-nav-panel-right">
        <i v-on:click="signinmetamask()" class="fas fa-sign-in-alt"></i>

        <!-- <a href="cart.html" class="side-nav-right"
        ><i class="fa fa-shopping-basket"></i><span>2</span></a
      > -->
      </div>
    </div>
    <!-- end navbar top -->

    <!-- side nav left-->
    <div class="side-nav-panel-left">
      <ul id="slide-out-left" class="side-nav side-nav-panel collapsible">
        <li class="profil">
          <!-- <img src="img/profile.jpg" alt="" />
        <h2>John Doe</h2>
        <h6>Mobile Developer</h6> -->
          <h2>Wallet</h2>

          <h6>{{ walletid.substring(0, walletid.length / 2) }}</h6>
          <h6>{{ walletid.substring(walletid.length / 2) }}</h6>
        </li>
        <li class="li-top">
          <a href=""><i class="fa fa-home"></i>Home</a>
        </li>
        <li>
          <a href=""><i class="fa fa-shopping-basket"></i>Product List</a>
        </li>
        <li>
          <a href=""><i class="fa fa-shopping-cart"></i>Shopping Cart</a>
        </li>
        <li>
          <a href=""><i class="fa fa-send"></i>Checkout</a>
        </li>
        <li>
          <a href=""><i class="fa fa-bold"></i>Blog</a>
        </li>

        <li>
          <a href=""><i class="fa fa-user"></i>About Us</a>
        </li>
        <li>
          <a href=""><i class="fa fa-envelope-o"></i>Contact Us</a>
        </li>
        <!-- <li>
        <a href="login.html"><i class="fa fa-sign-in"></i>Login</a>
      </li>
      <li>
        <a href="register.html"><i class="fa fa-user-plus"></i>Register</a>
      </li> -->
      </ul>
    </div>
  </div>
  <!-- end side nav left-->
</template>

<script setup>
import { ref } from "vue";
if (typeof window.ethereum !== "undefined") {
  console.log("MetaMask is installed!");
} else {
  // alert("pleaes install metamask");
  console.log("no meta mask");
}

const walletid = ref("Please Login");
// let walletid = useWallet();

async function signinmetamask() {
  console.log("login");
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = accounts[0];

  this.walletid = account;

  console.log(this.walletid);
}
</script>

<style scoped></style>
