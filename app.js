var header = document.querySelector(".pageheader");
var menuButton = document.createElement("div");
// var closeButton = document.createElement('div');
var linkwrapper = document.querySelector(".link-wrapper");
menuButton.innerHTML = "<i class = 'fas fa-bars'></i>";
// closeButton.innerHTML = "<i class = 'fas fa-cross'></i>";
// closeButton.classList.add('Bar-button');
// closeButton.classList.add('menu-close');
menuButton.classList.add("Bar-button");

function myFunction(x) {
  if (x.matches) {
    header.appendChild(menuButton);
    linkwrapper.style.position = "fixed";
  } else {
    if (header.contains(menuButton)) {
      header.removeChild(menuButton);
    }
    linkwrapper.style.position = "initial";
  }
}
var x = window.matchMedia("(max-width: 540px)");
myFunction(x); // Call listener function at run time
x.addEventListener("change", myFunction);

menuButton.addEventListener("click", () => {
  console.log("clicked");
  if (linkwrapper.classList.contains("closed")) {
    linkwrapper.style.left = "0";
    linkwrapper.classList.remove("closed");
    menuButton.innerHTML = "<i class = 'fas fa-times'></i>";
    menuButton.style.transform = "translatex(25%)";
  } else if (!linkwrapper.classList.contains("closed")) {
    linkwrapper.classList.add("closed");
    linkwrapper.style.left = "-100%";
    menuButton.innerHTML = "<i class = 'fas fa-bars'></i>";
    menuButton.style.transform = "none";
  }
});

var taskDesc = document.querySelectorAll(".task-desc");
var revealBtn = document.querySelectorAll(".reveal-task");


 function revealer(a){
   var btn = document.getElementById(a);
    if (
      btn.parentElement.parentElement.children[1].classList.contains("showDesc")
    ) {
      btn.style.transform = "rotate(0deg)";
      btn.parentElement.parentElement.children[1].classList.remove("showDesc");
    } else {
      btn.style.transform = "rotate(-180deg)";
      btn.parentElement.parentElement.children[1].classList.add("showDesc");
    }
 }