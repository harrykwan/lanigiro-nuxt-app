<template>
  <div class="pages section">
    <div class="container">
      <div class="pages-head">
        <h3>GIRO EARN</h3>
      </div>
      <div class="login">
        <div class="row">
          <div class="col s12" style="">
            <div class="center">
              <img style="width: 40%" src="~/assets/boticon.png" />
              <!-- <ThreejsLogo /> -->
            </div>
            <div class="row pl-5 pr-5 mt-5">
              <div class="col-6 text-muted">YOUR INTEREST</div>
              <div class="col-6 text-muted">YOUR WALLET</div>
              <div class="col-6"><span class="coinct">0</span> GIRO</div>
              <div class="col-6"><span class="coinct">0</span> GIRO</div>
            </div>
            <div class="center">
              <a href="#" class="button-default">Buy more</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
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
