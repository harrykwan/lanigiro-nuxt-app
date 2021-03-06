$(function () {
  "use-strict";

  // side nav left
  $(".side-nav-left").sideNav({
    edge: "left",
    closeOnClick: true,
  });

  // slider
  $(".slider").slider({
    full_width: true,
  });

  // testimonial
  $("#owl-testimonial").owlCarousel({
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true,
  });

  // loader
  $("#fakeLoader").fakeLoader({
    zIndex: 999,
    spinner: "spinner1",
    bgColor: "#ffffff",
  });

  // collapsible
  $(".collapsible").collapsible({
    accordion: false,
  });

  // select
  $("select").material_select();
});
