let listOfVideo;

async function getVideos() {
  await fetch("https://api.freeapi.app/api/v1/public/youtube/videos")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      listOfVideo = data.data.data;
    })
    .catch((err) => {
      alert("Video Not Found");
    });
  setVideos(listOfVideo);
}

async function setVideos(listOfVideo) {
  const videoList = document.getElementById("video-list");

  listOfVideo.forEach((element) => {
    const videoCard = document.createElement("div");
    videoCard.className = "video";

    const videoId = element.items.id;

    videoCard.innerHTML = `
        <img class="thumbnail" alt="Video Thumbnail" src="${
          element.items.snippet.thumbnails.standard.url
        }">
        <div class="title">${element.items.snippet.title}</div>
        <div class="channel">${element.items.snippet.channelTitle}</div>
        <div class="state">
            <div class="view">${element.items.statistics.viewCount} Views</div>
            <div class="published-time">${element.items.snippet.publishedAt.substring(
              0,
              10
            )}</div>
        </div>
    `;

    videoCard.addEventListener("click", () => {
      window.open(`https://www.youtube.com/watch?v=${videoId}`);
    });
    videoList.appendChild(videoCard);
  });
}

const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("input", ()=>{
    searchVideo();
})

function searchVideo() {
  const input = document.querySelector(".search-btn").value.toLowerCase();
  const videoElements = document.querySelectorAll(".video");
  listOfVideo.forEach((video, index) => {

    const title = video.items.snippet.title.toLowerCase();

    const videoElement = videoElements[index];

    if (title.includes(input)) {
      videoElement.style.display = "block";
    } else {
      videoElement.style.display = "none";
    }
  });
}
getVideos();
