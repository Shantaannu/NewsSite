function openSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "block";
}

function closeSidebar() {
    const sidebar = document.querySelector(".sidebar");
    sidebar.style.display = "none";
}


function search() {
    document.getElementById("srchdwn").classList.toggle("show");
  }