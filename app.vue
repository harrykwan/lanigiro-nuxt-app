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

const auth = getAuth();

const nowuser = useFirebaseAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;

    // ...
    console.log(uid);
  } else {
    // User is signed out
    // ...
    console.log("logout");
  }
  nowuser.value = user;
});

// console.log(app);
</script>
