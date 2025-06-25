// Theme effect
let lightTheme = document.querySelector(".theme-section");
let themeIcon = document.querySelector("#theme-icon");
let body = document.querySelector("body");
let card = document.querySelector(".card");

lightTheme.addEventListener("click", () => {
    body.classList.toggle("light-theme");
    if (themeIcon.getAttribute("src").includes("sun")) {
        document.querySelector(".theme-section p").innerText = "DARK";
        themeIcon.setAttribute("src", "icon-moon.svg");
    } else {
        document.querySelector(".theme-section p").innerText = "LIGHT";
        themeIcon.setAttribute("src", "icon-sun.svg");
    }
});

//Handling search 
const input = document.querySelector("input");
const searchBtn = document.querySelector("section button");

searchBtn.addEventListener("click", handleSearch);
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        handleSearch();
    }
});


// Card details to be displayed
const avatar = document.getElementById("avatar");
const nameField = document.getElementById("name");
const joiningDateField = document.getElementById("joiningDate");
const bioField = document.getElementById("bio");
const repoCount = document.getElementById("repos");
const followersCount = document.getElementById("followers");
const followingCount = document.getElementById("following");
const loc = document.getElementById("loc");
const twitterLink = document.getElementById("twitterLink");
const blog = document.getElementById("blog");
const gitLink = document.getElementById("gitLink");

async function handleSearch() {
    try {
        const username = input.value.trim().replace(/\s+/g, "");
        console.log(username);

        // API Call
        const url = `https://api.github.com/users/${username}`;

        const response = await fetch(url);
        console.log(response);

        if (!response.ok) {
            throw new Error("User not found...");
        }

        const data = await response.json();
        card.style.opacity = 1;
        console.log(data);
        nameField.innerText = data.name || data.login;
        bioField.innerText = data.bio || "This profile has no bio";
        avatar.src = data.avatar_url;
        repoCount.innerText = data.public_repos;
        followersCount.innerText = data.followers;
        followingCount.innerText = data.following;
        twitterLink.innerText = data.twitter_username || "Not Available";
        blog.innerText = data.blog ? "@blog" : "Not Available";
        blog.href = data.blog || "#";
        loc.innerText = data.location || "Not Available";
        gitLink.innerText = `@${data.login}`;
        gitLink.href = data.html_url || "#";
        

        let date = new Date(data.created_at);
        let formatted = date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });

        joiningDateField.innerText = `Joined ${formatted}`;

    } catch (err) {
        console.error("Error : ", err);
    }



};
