const container = document.querySelector(".container");
const image = document.querySelector("#music-image");
const audio = document.querySelector("#audio");
const musicDetails = document.querySelector("#music-details");
const title = document.querySelector("#title");
const singer = document.querySelector("#singer");
const controls = document.querySelector("#controls");
const prev = document.querySelector("#prev");
const play = document.querySelector("#play");
const next = document.querySelector("#next");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector("#progress-bar");
const volume = document.querySelector("#volume");
const volumeBar = document.querySelector("#volume-bar");

const player = new MusicPlayer(musicList);



window.addEventListener("load",()=>{
    let music = player.getMusic();
    displayMusic(music);
});

function displayMusic(music){
    title.innerHTML = music.getName()
    image.src = "img/"+music.img ;
    audio.src = "mp3/"+music.file;
}

play.addEventListener("click", ()=>{
    let isPlay = container.classList.contains("playing");
    isPlay ? pauseMusic() : playMusic();
})

function pauseMusic(){
    container.classList.remove("playing");
    play.classList= "fa-solid fa-play";
    audio.pause();
}

function playMusic(){
    container.classList.add("playing");
    play.classList= "fa-solid fa-pause"
    audio.play();
}

next.addEventListener("click", ()=>{
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
});

prev.addEventListener("click", ()=>{
    player.prev();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
});

const calculateTime = (seconds)=>{
    const minute = Math.floor(seconds / 60);
    const second = Math.floor(seconds % 60);
    const currentSecond = second < 10 ? 0`${second}`:`${second}`;
    const timeValue = `${minute}:${second}`;
    return timeValue;
}

audio.addEventListener("loadedmetadata",()=>{
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});

audio.addEventListener("timeupdate",()=>{
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent= calculateTime(progressBar.value);
})

progressBar.addEventListener("input", ()=>{
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
})

let muteState = "unMuted"

volumeBar.addEventListener("input", (e)=>{
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0){
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
    }else{
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener("click", ()=> {
    if(muteState === "unmuted"){
        audio.muted = true;
        muteState = "muted";
        volume.classList = "fa-solid fa-volume-xmark";
        volumeBar.value=0;
    }else{
        audio.muted = false;
        muteState = "unmuted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value=100;
    }
})

