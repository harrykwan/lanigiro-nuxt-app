<template>
  <div>
    <Meta charset="UTF-8" />
    <Title>Lanigiro</Title>
    <Meta
      name="viewport"
      content="width=device-width, initial-scale=1  maximum-scale=1 user-scalable=no"
    />
    <Meta name="mobile-web-app-capable" content="yes" />
    <Meta name="apple-mobile-web-app-capable" content="yes" />
    <Meta name="apple-touch-fullscreen" content="yes" />
    <Meta name="HandheldFriendly" content="True" />

    <Link rel="stylesheet" href="css/materialize.css" />
    <Link rel="stylesheet" href="font-awesome/css/font-awesome.min.css" />
    <Link rel="stylesheet" href="css/normalize.css" />
    <Link rel="stylesheet" href="css/owl.carousel.css" />
    <Link rel="stylesheet" href="css/owl.theme.css" />
    <Link rel="stylesheet" href="css/owl.transitions.css" />
    <Link rel="stylesheet" href="css/fakeLoader.css" />
    <!-- <link rel="stylesheet" href="css/magnific-popup.css"> -->
    <Link rel="stylesheet" href="css/style.css" />

    <!-- <Link rel="shortcut icon" href="img/" /> -->
    <Link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
      integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
      crossorigin="anonymous"
    />
    <Link
      rel="stylesheet"
      href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
      integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
      crossorigin="anonymous"
    />
    <Script
      src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"
    ></Script>
    <Link
      rel="stylesheet"
      type="text/css"
      href="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.css"
    />
    <Script
      type="text/javascript"
      src="https://cdnjs.cloudflare.com/ajax/libs/malihu-custom-scrollbar-plugin/3.1.5/jquery.mCustomScrollbar.min.js"
    ></Script>
    <Script
      src="https://cdn.socket.io/4.4.1/socket.io.min.js"
      integrity="sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H"
      crossorigin="anonymous"
    ></Script>

    <NuxtLayout></NuxtLayout>

    <Script src="js/jquery.min.js"></Script>
    <!-- <Script src="js/fakeLoader.min.js"></Script> -->
    <!-- <Script src="js/materialize.min.js" defer></Script> -->
    <!-- <Script src="js/owl.carousel.min.js" defer></Script> -->

    <!-- <Script src="js/main.js" defer></Script> -->
  </div>
</template>

<script setup>
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore, doc, onSnapshot } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv3dYpsNsTOMseHTqOVRyJnVGOLkqgiz0",
  authDomain: "lani-9deed.firebaseapp.com",
  projectId: "lani-9deed",
  storageBucket: "lani-9deed.appspot.com",
  messagingSenderId: "1088966942325",
  appId: "1:1088966942325:web:a6ec92c5205f304af9223c",
  measurementId: "G-30NXYC5E3G",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = useFirebaseDb();
const auth = getAuth();
const firestoredb = getFirestore();
// const messaging = getMessaging();
const nowuser = useFirebaseAuth();
const router = useRouter();

onMounted(() => {
  // getToken(messaging, {
  //   vapidKey:
  //     "BGGMWzuQvmKeloNj5SctsZUmp9LK_XXSvEFF-nLrat_TbZHakGbYFwxkJTdteMR6IQQflTKyHfeFwCi6SzwqaFE",
  // })
  //   .then((currentToken) => {
  //     if (currentToken) {
  //       // Send the token to your server and update the UI if necessary
  //       // ...
  //       console.log(currentToken);
  //     } else {
  //       // Show permission request UI
  //       console.log(
  //         "No registration token available. Request permission to generate one."
  //       );
  //       // ...
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("An error occurred while retrieving token. ", err);
  //     // ...
  //   });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    // ...
    console.log(uid);
    onSnapshot(doc(firestoredb, "locationdata", uid), (doc) => {
      console.log("Current data: ", doc.data());
      // db.value = doc.data();
    });
    onSnapshot(doc(firestoredb, "nftcache", uid), (doc) => {
      console.log("Current data: ", doc.data());
      // db.value = doc.data();
    });

    // router.push("/");
  } else {
    // User is signed out
    // ...
    console.log("logout");
    if (
      window.location.href.indexOf("login") == -1 &&
      window.location.href.indexOf("metamaskmobile") == -1 &&
      window.location.href.indexOf("createaccount") == -1
    )
      router.push("/login");
  }
  nowuser.value = user;
});

// console.log(app);
</script>

<style>
body,
html {
  background: #041322;
  height: 100vh;
  color: white;
}
input {
  background: #041322 !important;
  border: 0px solid black !important;
  border-radius: 10px !important;
}

.button-default {
  background: linear-gradient(
    to bottom right,
    #e186eb,
    #0b2d50,
    #061e36,
    #39bfef
  ) !important;
  padding: 5px 18px;
  margin-left: 5px;
  border: 0px solid black;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19) !important;
  border-radius: 10px;
}
</style>
