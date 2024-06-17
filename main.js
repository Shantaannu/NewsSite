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
window.onload = function () {
    closeSidebar();
};


// API work
const blogcontainer = document.getElementById("blog-container");
const APIKEY = "4e5b82a90505488ba61e64609920e4a9";
const BASEURL = "https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10";

async function news() {
    const URL = `${BASEURL}&apiKey=${APIKEY}`;

    try {
        const Response = await fetch(URL);
        if (!Response.ok) {
            throw new Error("Network issue");
        }
        else {
            const data = await Response.json();
            return data.articles;
        }
    }

    catch (error) {
        console.error("Unable to fetch info", error);
        return [];
    }
}

function displayBlogs(articles)
{
    blogcontainer.innerHTML = "";
    articles.forEach(articles => {
        const blogcard = document.createElement("div");
        blogcard.classList.add("blog_card");
        const img = document.createElement("img");
        img.src = articles.urlToImage;
        img.alt = articles.title;
        const title = document.createElement("h2");
        title.textContent = articles.title;
        const description = document.createElement("p");
        description.textContent = articles.description;

        blogcard.append(img)
        blogcard.append(title)
        blogcard.append(description)
        blogcontainer.appendChild(blogcard)
    });

}

// fetch news and display blogs 

news().then(articles => displayBlogs(articles));