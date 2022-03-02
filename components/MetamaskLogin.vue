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
              <a href="#" class="button-default" v-on:click="signinmetamask()"
                >Connect</a
              >
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

const nowuser = useFirebaseAuth();
const walletid = useWallet();

async function signinmetamask() {
  // if (typeof window.ethereum !== "undefined") {
  //   console.log("MetaMask is installed!");
  // } else {
  //   // alert("pleaes install metamask");
  //   console.log("no meta mask");
  // }
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  const account = accounts[0];

  walletid.value = account;

  console.log(walletid.value);

  await savemetamask();
}

async function savemetamask() {
  return new Promise((resolve, reject) => {
    axios
      .post("https://wyqx4s5dw8.execute-api.us-east-1.amazonaws.com/users", {
        userId: nowuser.value.uid,
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
