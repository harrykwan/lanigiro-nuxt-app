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
        v-for="n in nftdata.length / 2"
        :key="n"
        style="padding-bottom: 50px"
      >
        <div class="col s6">
          <div class="content">
            <img
              :src="nftdata[2 * n + 0] ? nftdata[2 * n + 0].image : ''"
              alt=""
            />
            <h5>
              <a href="">{{
                nftdata[2 * n + 0] ? nftdata[2 * n + 0].name : ""
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
        <div class="col s6">
          <div class="content">
            <img
              :src="nftdata[2 * n + 1] ? nftdata[2 * n + 1].image : ''"
              alt=""
            />
            <h5>
              <a href="">{{
                nftdata[2 * n + 1] ? nftdata[2 * n + 1].name : ""
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

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      nftdata: [],
    };
  },
  created: function () {
    var globalnftdata = this.nftdata;
    axios
      .get(
        "https://1tftnvgsji.execute-api.us-east-1.amazonaws.com/getnfts/0x42c87fc41a23684fe07264b57a123f1954857cd2"
      )
      .then(function (response) {
        // handle success
        // console.log(this.nftdata);
        console.log(response.data);
        for (var j = 0; j < response.data.length; j++) {
          response.data[j].image = response.data[j].image
            .split("gateway.pinata.cloud")
            .join("ipfs.io")
            .split("ipfs://")
            .join("https://ipfs.io/ipfs/")
            .split("rebelkidscats.mypinata.cloud")
            .join("ipfs.io");
          globalnftdata.push(response.data[j]);
        }
        // this.nftdata = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  },
};
</script>
