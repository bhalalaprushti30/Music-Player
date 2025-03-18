const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeControl = document.getElementById("volume");
const artist = document.getElementById("artist");
const playIcon = playBtn.querySelector("i");

const songs = [
    { src: "songs/song1.mp3", title: "Maar Udi", artist: "Manoj Muntashir, G.V. Prakash Kumar, Yadu Krishnan, Sugandh Shekar, Haston Rodrigues, Abhijith Rao", cover: "Image/image1.jpg" },
    { src: "songs/song2.mp3", title: "Ishq Mein", artist: "Sachin-Jigar, Sachet Tandon, Asees Kaur, Amitabh Bhattacharya", cover: "Image/image2.jpg" },
    { src: "songs/song3.mp3", title: "Gori Hai Kalaiyan", artist: "Badshah, Akshay And IP, Kanika Kapoor", cover: "Image/image3.jpg" },
    { src: "songs/song4.mp3", title: "Bhool Bhulaiyaa 3", artist: "Pitbull, Diljit Dosanjh, Tanishk Bagch, Pritam, Neeraj Shridhar, Dhrruv Yogi, Sameer, Tanishk Bagchi", cover: "Image/image4.jpg" },
    { src: "songs/song5.mp3", title: "Jaane Tu", artist: "A.R. Rahman, Arijit Singh, Irshad Kamil", cover: "Image/image5.jpg" },
    { src: "songs/song6.mp3", title: "Khudaya", artist: "Manoj Muntashir, Suhit Abhyankar, Sagar Bhatia, Neeti Mohan", cover: "Image/image6.jpg" }
];

let songIndex = 0;

function loadSong(index) {
    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    cover.src = songs[index].cover;
}

function playPauseSong() {
    if (audio.paused) {
        audio.play();
        playIcon.classList.replace("fa-play", "fa-pause");
    } else {
        audio.pause();
        playIcon.classList.replace("fa-pause", "fa-play");
    }
}

playBtn.addEventListener("click", playPauseSong);

prevBtn.addEventListener("click", () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
    playIcon.classList.replace("fa-play", "fa-pause");
});

nextBtn.addEventListener("click", () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
    playIcon.classList.replace("fa-play", "fa-pause");
});

audio.addEventListener("timeupdate", () => {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    progress.value = (currentTime / duration) * 100;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

loadSong(songIndex);
