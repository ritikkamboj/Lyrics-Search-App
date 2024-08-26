const form = document.getElementById("form");

const search = document.getElementById("search");

const results = document.getElementById("results");

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
    .map((item) => 
      `<li>
        
        <span><strong>${item.artist.name}</strong> - ${item.title}</span>
    <button class="btn" data-artist="${item.artist.name}" data-title="${item.title}"> Get Lyrics </button>
        
        </li>`
    )
    .join("")};
  
  </ul>`;
}

form.addEventListener("submit", submitValue);
