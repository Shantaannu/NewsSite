// Sidebar functions
function openSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.display = "block";
}

function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.style.display = "none";
}

// Event listeners for sidebar
document.getElementById("menuButton").addEventListener("click", openSidebar);
document.getElementById("closeButton").addEventListener("click", closeSidebar);

// Ensure sidebar is closed on page load
window.onload = function () {
    closeSidebar();
};

// API work
const blogContainer = document.getElementById("blog-container");
const API_KEY = "4e5b82a90505488ba61e64609920e4a9";
const BASE_URL = "https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10";

async function fetchNews() {
    const URL = `${BASE_URL}&apiKey=${API_KEY}`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        } else {
            const data = await response.json();
            return data.articles;
        }
    } catch (error) {
        console.error("Unable to fetch news:", error);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach(article => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog_card");

        const img = document.createElement("img");
        img.src = article.urlToImage || 'placeholder.jpg'; // Placeholder image if urlToImage is not available
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncate = article.title.length > 30
        ? article.title.slice(0,30) + "..."
        : article.title;
        title.textContent = truncate;

        const description = document.createElement("p");
        const truncateDesc = article.description.length > 30
        ? article.description.slice(0,100) + "..."
        : article.description;
        title.textContent = truncate;
        description.textContent = truncateDesc; 

        blogCard.append(img, title, description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

// Function to fetch news by query
async function fetchNewsQuery(query) {
    try {
        const encodedQuery = encodeURIComponent(query);
        const URL = `https://newsapi.org/v2/everything?q=${encodedQuery}&pageSize=10&apiKey=${API_KEY}`;
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        } else {
            const data = await response.json();
            return data.articles;
        }
    } catch (error) {
        console.error("Error fetching news by query:", error);
        return [];
    }
}

// Search functionality
const searchField = document.getElementById("input-val");
const searchBtn = document.getElementById("btn-srch");

searchBtn.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.log("Error fetching news by query:", error);
        }
    }
});

// Initial fetch and display of news
fetchNews().then(articles => displayBlogs(articles));
