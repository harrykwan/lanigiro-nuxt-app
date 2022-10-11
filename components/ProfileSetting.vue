<template>
  <div class="pages section">
    <div class="container">
      <div class="pages-head"></div>
      <div class="login">
        <div class="row">
          <div class="col s12" style="">
            <div class="center">
              <img
                style="width: 40%; height: 36vw; object-fit: cover"
                :src="propicurl"
              />
              <!-- <ThreejsLogo /> -->
            </div>
            <h2 style="width: 100%; text-align: center; margin-top: 20px">
              My Profile
            </h2>
            <div style="width: 100; text-align: center; margin-top: 10px">
              Hong Kong
            </div>
            <div class="row pl-5 pr-5 mt-5" style="text-align: center">
              <div
                class="col-6 text-muted"
                style="border-right: 1px solid white"
              >
                0
              </div>
              <div class="col-6 text-muted">0</div>
              <div class="col-6" style="border-right: 1px solid white">
                Follower
              </div>
              <div class="col-6">Following</div>
            </div>
            <!-- <div class="center">
              <a href="#" class="button-default">Buy more</a>
            </div> -->

            <div style="padding-top: 50px; border-top: 1px solid grey">
              <div class="row">
                <div
                  class="col-4"
                  v-for="(nft, ind) in mynftdata"
                  :key="ind"
                  style="height: 100px"
                >
                  <img
                    @click="setpropic(nft.image)"
                    style="width: 100%; height: 80px; object-fit: cover"
                    :src="nft.image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  doc,
  updateDoc,
  setDoc,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import axios from "axios";
const nowuser = useFirebaseAuth();
const firestoredb = getFirestore();
const walletid = useWallet();
const mynftdata = ref([]);

const propicurl = ref(
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
);

watch(nowuser, async () => {
  await startpage();
});

async function startpage() {
  //   const docRef = doc(firestoredb, "nftcache", nowuser.value.uid);
  //   const docSnap = await getDoc(docRef);
  //   if (docSnap.exists()) {
  //     let data = docSnap.data();
  //     console.log(data.nftdata);
  //     mynftdata.value = data.nftdata;
  //   } else {
  if (nowuser.value) {
    const linkedwalletid = await getwalletid();

    walletid.value = linkedwalletid;
    const nftdata = await getnftdata(linkedwalletid);
    mynftdata.value = nftdata;
    if (nftdata && linkedwalletid && nowuser.value.uid)
      await setDoc(doc(firestoredb, "nftcache", nowuser.value.uid), {
        walletid: linkedwalletid,
        nftdata: nftdata,
      });
    await getprofiledata();
  }
  //   }
}

async function getprofiledata() {
  const docRef = doc(firestoredb, "profile", walletid.value);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    let data = docSnap.data();
    if (data.propicurl) propicurl.value = data.propicurl;
  }
}

async function setpropic(url) {
  console.log(url);
  propicurl.value = url;
  await setDoc(doc(firestoredb, "profile", walletid.value), {
    propicurl: url,
  });
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
    let globalnftdata = [];
    axios
      // .get(
      //   "https://1tftnvgsji.execute-api.us-east-1.amazonaws.com/gettestnetnfts/" +
      //     mywalletid //0x3E1D44802321cce6E9E7557730433c2ab5838760
      // )
      .get(
        "https://1tftnvgsji.execute-api.us-east-1.amazonaws.com/getnfts/" +
          // "0x902f27c12B8e793FE49AAB11D4A0114F83fff44D"
          mywalletid
      ) //0x42c87fc41a23684fe07264b57a123f1954857cd2
      //   .get(
      //     "https://1tftnvgsji.execute-api.us-east-1.amazonaws.com/getnfts/" +
      //       "0x42c87fc41a23684fe07264b57a123f1954857cd2"
      //   )
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
</script>
<style scoped>
.pages {
  background: #061e36;
  color: #fff;
  background-image: linear-gradient(to bottom right, #0b2d50, #061e36, #041322);
}

.coinct {
  display: inline-block;
  color: rgba(4, 19, 34, 0.8);
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 5px;
  background: linear-gradient(
    to bottom right,
    #39bfef,
    white,
    #e186eb
  ) !important;
  margin-right: 5px;
  margin-top: 5px;
}
</style>
