<template>
  <!-- product -->
  <div class="section product" style="height: 100%">
    <div class="container">
      <div class="section-head" style="padding-bottom: 30px">
        <h4>
          <div class="lds-ripple">
            <div></div>
            <div></div>
          </div>
        </h4>
        <p></p>
      </div>

      <!-- <div class="section-head">
        <p>{{ walletid }}</p>
      </div> -->

      <!-- <div style="opacity: 0.5">{{ geodata }}</div> -->

      <div class="row" style="padding-bottom: 50px">
        <div
          class="col-6"
          style="padding-bottom: 50px"
          v-for="n in nftdata.length"
          :key="n"
        >
          <div class="content nftitem">
            <!-- {{ n }}: {{ nftdata[n - 1] }} -->
            <div>
              <img
                style="
                  width: 35vw;
                  height: 35vw;
                  object-fit: cover;
                  border: 0px solid black;
                  border-radius: 10px;
                "
                v-on:click="gotoapp(nftdata[n - 1])"
                :src="nftdata[n - 1] ? nftdata[n - 1].image : ''"
                alt=""
              />
            </div>
            <h5 style="opacity: 0.8; margin-top: 15px">
              <a class="text-light" href="">{{
                nftdata[n - 1] ? nftdata[n - 1].name : ""
              }}</a>
            </h5>
            <!-- <div class="star">
              <span class="active"><i class="fa fa-star"></i></span>
              <span class="active"><i class="fa fa-star"></i></span>
              <span class="active"><i class="fa fa-star"></i></span>
              <span class="active"><i class="fa fa-star"></i></span>
              <span class="active"><i class="fa fa-star"></i></span>
            </div> -->
            <!-- <h6 class="price">$40</h6> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end product -->
</template>

<style scoped>
.product {
  background: #061e36;
  color: #fff;
  background-image: linear-gradient(to bottom right, #0b2d50, #061e36, #041322);
}

.nftitem {
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  padding: 15px;
  background: #0e3b68;
  border: 0px solid black;
  border-radius: 15px;
}

.lds-ripple {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid #fff;
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 72px;
    height: 72px;
    opacity: 0;
  }
}
</style>

<script setup>
import axios from "axios";
const nowuser = useFirebaseAuth();
const nftdata = ref([]);
const walletid = useWallet();
const geodata = ref({});

watch(nowuser, async () => {
  await startpage();
});

onMounted(async () => {
  await startpage();
});

async function getgeodata() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        resolve(position.coords);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  });
}

async function sendgeodata(socket, mywalletid, mygeodata) {
  socket.emit("updatelocation", {
    walletid: mywalletid,
    geo: mygeodata,
  });
}

function geodistance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1).toRad(); // Javascript functions in radians
  var dLon = (lon2 - lon1).toRad();
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1.toRad()) *
      Math.cos(lat2.toRad()) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

async function startpage() {
  console.log(nowuser.value);
  if (nowuser.value) {
    const socket = io("https://13.229.79.196/", { secure: true });
    socket.on("updatelocation", (msg) => {
      console.log(msg);
    });
    const linkedwalletid = await getwalletid();
    walletid.value = linkedwalletid;
    await getnftdata(linkedwalletid);
    const mygeodata = await getgeodata();
    geodata.value = {
      lat: mygeodata.latitude,
      long: mygeodata.longitude,
    };
    await sendgeodata(socket, walletid.value, geodata.value);
  }
}

async function getwalletid() {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://wyqx4s5dw8.execute-api.us-east-1.amazonaws.com/users/" +
          nowuser.value.uid //0x3E1D44802321cce6E9E7557730433c2ab5838760
      )
      .then(function (response) {
        console.log(response.data.metamaskId);
        resolve(response.data.metamaskId);
      })
      .catch(function (error) {
        console.log(error);
        resolve(error);
      });
  });
}

async function getnftdata(mywalletid) {
  return new Promise((resolve, reject) => {
    const globalnftdata = nftdata.value;
    axios
      .get(
        "https://1tftnvgsji.execute-api.us-east-1.amazonaws.com/gettestnetnfts/" +
          mywalletid //0x3E1D44802321cce6E9E7557730433c2ab5838760
      )
      // .get(
      //   "https://1tftnvgsji.execute-api.us-east-1.amazonaws.com/getnfts/0x42c87fc41a23684fe07264b57a123f1954857cd2"
      // )
      .then(function (response) {
        // handle success
        // console.log(this.nftdata);
        console.log(response.data);
        for (var j = 0; j < response.data.length; j++) {
          if (response.data[j].image) {
            response.data[j].image = response.data[j].image
              .split("gateway.pinata.cloud")
              .join("ipfs.io")
              .split("ipfs://")
              .join("https://ipfs.io/ipfs/")
              .split("rebelkidscats.mypinata.cloud")
              .join("ipfs.io");
            globalnftdata.push(response.data[j]);
          }
        }
        console.log(globalnftdata);
        resolve(globalnftdata);
        // this.nftdata = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        resolve(error);
      });
  });
}

function gotoapp(data) {
  if (data) {
    let imageurl = data.image;
    imageurl = encodeURIComponent(imageurl);
    const url = "uniwebview://showcase?imageurl=" + imageurl;
    console.log(url);
    window.location.href = url;
  }
}
</script>
