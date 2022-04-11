<template>
  <div class="pages section">
    <div class="container">
      <div class="pages-head">
        <h3>Connect to MetaMask</h3>
      </div>
      <div class="login">
        <div class="row">
          <div class="col s12" style="">
            <div class="center">
              <img style="width: 60%" src="~/assets/metamask.png" />
            </div>

            <div class="center" v-if="!walletid">
              <a
                href="#"
                class="button-default"
                v-on:click="signinmetamask()"
                v-if="metamaskbrowser"
                >Connect
              </a>
              <a
                href="https://metamask.app.link/dapp/lanigiro.netlify.app"
                class="button-default"
                v-on:click="signinmetamask()"
                v-if="!metamaskbrowser"
                >Connect Mobile
              </a>
            </div>
            <div class="center" v-if="walletid">
              {{ walletid }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const route = useRoute();
const userid = ref(route.query.userid ? route.query.userid : "");
// const nowuser = useFirebaseAuth();
const walletid = useWallet();
const metamaskbrowser = ref(true);

onMounted(() => {
  console.log(userid.value);
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask is installed!");
    metamaskbrowser.value = true;
  } else {
    // alert("pleaes install metamask");
    console.log("no meta mask");
    metamaskbrowser.value = false;
  }
});

async function signinmetamask() {
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = accounts[0];

  walletid.value = account;

  console.log(walletid.value);

  await savemetamask();

  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });

  window.location.href = "unitydl://app.lanigiro.io";
}

async function savemetamask() {
  return new Promise((resolve, reject) => {
    axios
      .post("https://wyqx4s5dw8.execute-api.us-east-1.amazonaws.com/users", {
        userId: userid.value,
        metamaskId: walletid.value,
      })
      .then(function (response) {
        console.log(response);
        resolve(response);
      })
      .catch(function (error) {
        console.log(error);
        resolve(error);
      });
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
