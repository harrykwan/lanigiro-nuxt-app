<template>
  <!-- product -->
  <div class="section product" style="height: 100%">
    <div class="container">
      <div class="section-head" style="padding-bottom: 30px">
        <h4>
          <div v-if="nftdata.length == 0" class="lds-ripple">
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
          class="col-12"
          style="padding-bottom: 50px"
          v-for="n in nftdata.length"
          :key="n"
        >
          <div style="margin-bottom: 15px">
            <img
              style="
                width: 25px;
                height: 25px;
                object-fit: cover;
                border-radius: 50%;
                margin-right: 10px;
              "
              :src="
                nftdata[n - 1]
                  ? nftdata[n - 1].propicurl
                    ? nftdata[n - 1].propicurl
                    : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  : ''
              "
            />
            <a>{{
              nftdata[n - 1]
                ? nftdata[n - 1].username
                  ? nftdata[n - 1].username
                  : "unkown_user"
                : ""
            }}</a>
          </div>
          <div class="content nftitem" style="text-align: left">
            <!-- {{ n }}: {{ nftdata[n - 1] }} -->
            <div>
              <img
                style="border: 0px solid black; border-radius: 5px"
                v-on:click="gotoapp(nftdata[n - 1])"
                :src="nftdata[n - 1] ? nftdata[n - 1].image : ''"
                alt=""
              />
            </div>
            <div class="star" style="margin-top: 15px; margin-left: 10px">
              <span class="active"><i class="fa fa-thumbs-up"></i></span>
              <span class="" style="margin-left: 7px"
                ><i class="fa fa-comment"></i
              ></span>
            </div>
            <div style="opacity: 0.9; margin-top: 10px; margin-left: 10px">
              <a class="text-light" href="">
                <b>
                  {{
                    nftdata[n - 1]
                      ? nftdata[n - 1].username
                        ? nftdata[n - 1].username
                        : "unkown_user"
                      : ""
                  }}
                </b>
              </a>
              <a
                class="text-light"
                href=""
                style="margin-left: 10px; opacity: 0.7"
                >{{ nftdata[n - 1] ? nftdata[n - 1].name : "" }}</a
              >
            </div>
            <div
              style="
                opacity: 0.6;
                margin-top: 15px;
                margin-left: 10px;
                border-left: 1px solid grey;
                padding-left: 10px;
              "
            >
              <pre class="text-light" style="max-height: 15vh">{{
                nftdata[n - 1] ? nftdata[n - 1].description : ""
              }}</pre>
            </div>

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
  min-height: 90vh;
}

.nftitem {
  /* box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  padding: 15px;
  background: #0e3b68;
  border: 0px solid black;
  border-radius: 15px; */
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
import {
  doc,
  updateDoc,
  setDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import axios from "axios";
const nowuser = useFirebaseAuth();
const firestoredb = getFirestore();
const nftdata = ref([]);
const walletid = useWallet();
const geodata = ref({});

watch(nowuser, async () => {
  await startpage();
});

onMounted(async () => {
  await startpage();
  setInterval(async () => {
    await updatelocation();
  }, 30000);
  // const socket = io("https://socketio.lanigiro.io/", { secure: true });
  // socket.on("updatelocation", (msg) => {
  //   console.log(msg);
  // });
  // await sendgeodata(socket, walletid.value, geodata.value);
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

async function updatelocation() {
  try {
    const mygeodata = await getgeodata();
    geodata.value = {
      lat: mygeodata.latitude,
      long: mygeodata.longitude,
    };
    console.log(geodata.value);

    await setDoc(doc(firestoredb, "locationdata", nowuser.value.uid), {
      geodata: geodata.value,
      updatetime: Date.now(),
    });
  } catch (e) {
    console.log(e);
  }
}

async function querynearby() {
  const locationdatasRef = collection(firestoredb, "locationdata");
  const q = query(
    locationdatasRef,
    where("updatetime", ">=", 0) // Date.now() - 300000)
  );
  const querySnapshot = await getDocs(q);
  let allresult = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    if (doc.id != nowuser.value.uid)
      allresult.push({ ...doc.data(), id: doc.id });
  });
  return allresult;
}

async function startpage() {
  console.log(nowuser.value);
  if (nowuser.value) {
    await updatelocation();
    const nearbyresult = await querynearby();
    console.log(nearbyresult);
    for (var j = 0; j < nearbyresult.length; j++) {
      const linkedwalletid = await getwalletid(nearbyresult[j].id);
      await getnftdata(linkedwalletid);
    }
  }
}

async function getwalletid(uid) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        "https://wyqx4s5dw8.execute-api.us-east-1.amazonaws.com/users/" + uid //0x3E1D44802321cce6E9E7557730433c2ab5838760
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
      // .get(
      //   "https://1tftnvgsji.execute-api.us-east-1.amazonaws.com/gettestnetnfts/" +
      //     mywalletid //0x3E1D44802321cce6E9E7557730433c2ab5838760
      // )
      .get(
        "https://1tftnvgsji.execute-api.us-east-1.amazonaws.com/getnfts/" +
          mywalletid
      ) //0x42c87fc41a23684fe07264b57a123f1954857cd2
      .then(function (response) {
        // handle success
        // console.log(this.nftdata);
        console.log(response.data);
        for (var j = 0; j < response.data.length; j++) {
          if (response.data[j])
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
