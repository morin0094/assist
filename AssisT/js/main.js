(function () {
  var slider = tns({
    container: '.homeSlider',
    items: 4,
    gutter: 24,
    loop: false,
    speed: 700,
    slideBy: 'page',
    controlsText: ["", ""],
    responsive: {
      1735: {
        items: 4
      },
      768: {
        items: 3
      },
      320: {
        items: 1,
        gutter: 12
      },
    }
  });

  var slider2 = tns({
    container: '.homeImages',
    loop: false,
    mode: 'gallery',
    speed: 700
  });

  document.querySelectorAll('.homeSlider a').forEach((slide, i) => {
    slide.addEventListener("mouseover", function () {
      slider2.goTo(i);
    });
  });

  document.querySelectorAll('#bigMenu .category, #bigMenu .subCategory').forEach((category, i) => {
    category.addEventListener("click", function () {
      category.classList.contains("open") ? category.classList.remove("open") : category.classList.add("open");
    });
  });

  function updateProgressbar() {
    var sliderInfo = slider.getInfo();
    var barWidth = Math.round(100 / sliderInfo.slideCount) * (sliderInfo.items * (sliderInfo.navCurrentIndex + 1));
    if (barWidth > 100) {
      barWidth = 100;
    }
    document.querySelector(".progress .bar").setAttribute("style", "width:" + barWidth + "%")
  }

  slider.events.on("transitionStart", updateProgressbar);

  updateProgressbar();

  document.onreadystatechange = () => {
    if (document.readyState === 'complete') {
      document.getElementById("loading").classList.add("loaded");
      document.getElementById("app").classList.add("loaded");
      document.getElementById("home").classList.add("open");
      document.getElementById("home").classList.add("loaded");
      document.querySelectorAll(".easein").forEach(visual => {
        visual.classList.add("loaded");
      });
    }
  };
})();

function openBigMenu() {
  document.getElementById("bigMenu").classList.add("open");
}

function closeBigMenu() {
  document.getElementById("bigMenu").classList.remove("open");
}

function openContactPanel() {
  document.getElementById("contactPanel").classList.add("open");
}

function closeContactPanel() {
  document.getElementById("contactPanel").classList.remove("open");
}

function openBulletinPanel() {
  document.getElementById("bulletinPanel").classList.add("open");
}

function closeBulletinPanel() {
  document.getElementById("bulletinPanel").classList.remove("open");
}

function showDetails(section) {
  document.getElementById("home").classList.remove("open");
  document.getElementById("home").classList.remove("loaded");
  document.getElementById("details").classList.add("open");
  let selectedMenu = document.querySelector(".leftMenu .selected");
  let roundedMenu = document.querySelector(".leftMenu .rounded");
  if (selectedMenu) {
    selectedMenu.classList.remove("selected");
  }
  if (roundedMenu) {
    roundedMenu.classList.remove("rounded");
  }
  let selectedSection = document.querySelector(".wrapSection.open");
  if (selectedSection) {
    selectedSection.classList.remove("open");
  }
  let imgSection = document.querySelector(".detailsImgs .open");
  if (imgSection) {
    imgSection.classList.remove("open");
  }
  document.getElementById("menu_" + section).classList.add("selected");
  document.getElementById("img_" + section).classList.add("open");
  if (document.getElementById("menu_" + section).previousElementSibling) {
    document.getElementById("menu_" + section).previousElementSibling.classList.add("rounded");
  }
  document.getElementById(section).classList.add("open");
}

function mainScreen() {
  document.getElementById("home").classList.add("open");
  document.getElementById("details").classList.remove("open");
}

function switchDetails(section) {
  let selectedMenu = document.querySelector(".leftMenu .selected");
  let roundedMenu = document.querySelector(".leftMenu .rounded");
  if (selectedMenu) {
    selectedMenu.classList.remove("selected");
  }
  if (roundedMenu) {
    roundedMenu.classList.remove("rounded");
  }
  let selectedSection = document.querySelector(".wrapSection.open");
  let fadeOutSection = document.querySelector(".wrapSection.fadeOut");
  if (selectedSection) {
    selectedSection.classList.remove("open");
    selectedSection.classList.add("fadeOut");
    setTimeout(function () {
      selectedSection.classList.remove("fadeOut");
    }, 1200);
  }
  document.getElementById("menu_" + section).classList.add("selected");
  if (document.getElementById("menu_" + section).previousElementSibling) {
    document.getElementById("menu_" + section).previousElementSibling.classList.add("rounded");
  }
  let imgSection = document.querySelector(".detailsImgs .open");
  if (imgSection) {
    imgSection.classList.remove("open");
  }
  document.getElementById("img_" + section).classList.add("open");
  document.getElementById(section).classList.add("fadeIn");
  setTimeout(function () {
    document.getElementById(section).classList.add("open");
  }, 10);
  setTimeout(function () {
    document.getElementById(section).classList.remove("fadeIn");
  }, 1200);
}

function menuNavigation(section) {
  closeBigMenu()
  if (document.getElementById("home").classList.contains("open")) {
    showDetails(section);
  } else {
    switchDetails(section);
  }
}