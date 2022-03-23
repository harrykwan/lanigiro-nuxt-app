<template>
  <!-- product -->
  <div class="section product">
    <div class="container">
      <div class="section-head">
        <h4>Your NFTs</h4>
        <p></p>
      </div>

      <!-- <div class="section-head">
        <p>{{ walletid }}</p>
      </div> -->

      <div class="row" style="padding-bottom: 50px">
        <div
          class="col-6"
          style="padding-bottom: 50px"
          v-for="n in nftdata.length"
          :key="n"
        >
          <div class="content">
            <!-- {{ n }}: {{ nftdata[n - 1] }} -->
            <img
              v-on:click="gotoapp(nftdata[n - 1])"
              :src="nftdata[n - 1] ? nftdata[n - 1].image : ''"
              alt=""
            />
            <h5>
              <a href="">{{ nftdata[n - 1] ? nftdata[n - 1].name : "" }}</a>
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

<script setup>
import axios from "axios";
const nowuser = useFirebaseAuth();
const nftdata = ref([]);
const walletid = useWallet();

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
    geo: {
      lat: mygeodata.latitude,
      long: mygeodata.longitude,
    },
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
    const socket = io("http://13.229.79.196/");
    socket.on("updatelocation", (msg) => {
      console.log(msg);
    });
    const linkedwalletid = await getwalletid();
    walletid.value = linkedwalletid;
    await getnftdata(linkedwalletid);
    const mygeodata = await getgeodata();
    await sendgeodata(socket, walletid.value, mygeodata);
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
