<template>
  <!-- product -->
  <div class="section product">
    <div class="container">
      <div class="section-head">
        <h4>Your NFTs</h4>
        <p></p>
      </div>

      <div
        class="row"
        v-for="n in nftdata.length"
        :key="n"
        style="padding-bottom: 50px"
      >
        <div class="col-12">
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

watch(nowuser, async () => {
  console.log(nowuser.value);
  if (nowuser.value) {
    const linkedwalletid = await getwalletid();
    await getnftdata(linkedwalletid);
  }
});

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
