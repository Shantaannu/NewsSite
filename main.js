function openSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.display = "block";
}

function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.display = "none";
}

document.getElementById("menuButton").addEventListener("click", openSidebar);
document.getElementById("closeButton").addEventListener("click", closeSidebar);

// Ensure sidebar is closed on page load
window.onload = function() {
    closeSidebar();
};