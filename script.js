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
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  console.log(data);
}

form.addEventListener("submit", submitValue);

async function getLyrics(artist, songTitle) {
  console.log("jai maata di");

  const res = await fetch(`${URL}/v1/${artist}/${songTitle}`);

  const data = await res.json();
  console.log(data);

  const data1 = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br/>");
  console.log(data1);

  results.innerHTML = `<h2> <strong>${artist}</strong>  -  <span>${songTitle}</span></h2>
    <p>
    ${data1}
    
    </p>
    `;

    more.innerHTML=``
}

results.addEventListener("click", (e) => {
  const clickedEl = e.target;
  console.log(clickedEl);

  if (clickedEl.tagName === "BUTTON") {
    console.log("button clicked");
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-title");

    getLyrics(artist, songTitle);
  }
});
