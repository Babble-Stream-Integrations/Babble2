let redirect_uri =
  "http://127.0.0.1:5500/functions/services/spotifyRedirectTest.html";

let client_id = "";
let client_secret = "";

const AUTHORIZE = "https://accounts.spotify.com/authorize";

function requestAuthorization() {
  client_id = document.getElementById("clientId").value as HTMLInputElement | null;
  client_secret = document.getElementById("clientSecret").value;
  localStorage.setItem("client_id", client_id);
  localStorage.setItem("client_secret", client_secret);

  let url = AUTHORIZE;
  url += "?client_id=" + client_id;
  url += "&response_type=code";
  url += "&redirect_uri=" + encodeURI(redirect_uri);
  url += "&show_dialog=true";
  url +=
    "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
  window.location.href = url; // Show Spotify's authorization screen
}

function getCode() {
  let code = null;
  const queryString = window.location.search;
  if (queryString.length > 0) {
    const urlParams = new URLSearchParams(queryString);
    code = urlParams.get("code");
  }
  return code;
}

async function getToken() {
  const code = getCode();

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
        "grant_type": "authorization_code",
        "code": code,
        "redirect_uri": "http://127.0.0.1:5500/functions/services/spotifyRedirectTest.html",
        "client_id": "f817d73abc5c47e9b9af069bca544631",
        "client_secret": "a32e61b0576d4cf691c90eaf3f3d2016"
      }),
  })
    .then((res) => res.json())
    .then((res) => {
      localStorage.setItem("access_token", res.access_token)
    });
}

async function requestCurrentSong() {
  const access_token = localStorage.getItem("access_token")

  fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      method: "GET",
      headers: { Authorization: "Bearer " + access_token },
    })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.item.name)
  });
}

async function recentlyPlayed() {
  const access_token = localStorage.getItem("access_token")

  fetch("https://api.spotify.com/v1/me/player/recently-played", {
    method: "GET",
    headers: { Authorization: "Bearer " + access_token },
  })
  .then((res) => res.json())
  .then((res) => {
    console.log(res)
    // console.log(res.items[0].track.name)
  });
}