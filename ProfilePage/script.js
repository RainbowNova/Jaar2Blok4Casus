document.addEventListener("DOMContentLoaded", function () {
    var points = localStorage.getItem("points");
    if (points !== null) {
      var level = Math.floor(points / 100) + 1;
      document.getElementById("points").textContent = "Points: " + points;
      document.getElementById("level").textContent = "Level: " + level;
    }
  });