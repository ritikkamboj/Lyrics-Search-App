const express = require("express");
const cors = require("cors");
const app = express();

// Use CORS middleware
app.use(cors());

// Define your routes
app.get("http://127.0.0.1:5500/index.html", (req, res) => {
  res.json({ message: "CORS is enabled for this route" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const form = document.getElementById("form");

const search = document.getElementById("search");

const results = document.getElementById("results");

const more = document.getElementById("more");

let URL = `https://api.lyrics.ovh`;

function submitValue(e) {
  e.preventDefault();
  let searchVal = search.value.trim();
  console.log(searchVal);
  if (!searchVal) {
    alert("Enter a valid value");
  } else {
    fetchValue(searchVal);
  }
}

async function fetchValue(searchVal) {
  const res = await fetch(`${URL}/suggest/${searchVal}`);
  const data = await res.json();
  console.log(data);

  showInDom(data);
}

function showInDom(data) {
  console.log(data.data);
  //   let str = ``;

  //   data.data.forEach((item) => {
  //     str += `<li>

  //         <span><strong>${item.artist.name}</strong> - ${item.title}</span>
  //     <button class="btn" data-artist="${item.artist.name}" data-title="${item.title}"> Get Lyrics </button>

  //         </li>`;
  //   });

  //   console.log(str);
  //   results.innerHTML = `<ul class="songs">${str}</ul>`;

  results.innerHTML = `<ul class='songs'>
  ${data.data
    .map(
      (item) =>
        `<li>
        
        <span><strong>${item.artist.name}</strong> - ${item.title}</span>
    <button class="btn" data-artist="${item.artist.name}" data-title="${item.title}"> Get Lyrics </button>
        
        </li>`
    )
    .join("")};
  
  </ul>`;

  if (data.next || data.prev) {
    // console.log("ismein hai agke pichle ka lafda");

    more.innerHTML = `
     ${
       data.next
         ? `<button class="btn" onClick="getMoreSongs('${data.next}')">Next</button>`
         : ""
     }
     ${
       data.prev
         ? ` <button class="btn" onClick="getMoreSongs('${data.prev}')">Prev</button>`
         : ""
     }
     `;
  } else {
    more.innerHTML = ``;
  }
}

async function getMoreSongs(url) {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // You can use other CORS proxies as well
  const res = await fetch(proxyUrl + url);
  const data = await res.json();
  console.log(data);
}

form.addEventListener("submit", submitValue);
