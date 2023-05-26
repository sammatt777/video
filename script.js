let player = document.querySelector('.player');
let video = document.querySelector('.video');
let progressBar = document.querySelector('.progress-bar');
let progressRange = document.querySelector('.progress-range');
let playBtn = document.getElementById('play-btn');
let volumeIcon = document.getElementById('volume-icon');
let volumeRange = document.querySelector('.volume-range');
let volumeBar = document.querySelector('.volume-bar');
let speed = document.querySelector('.player-speed');
let currentTime = document.querySelector('.time-elapsed');
let duration = document.querySelector('.time-duration');
let fullscreenBtn = document.querySelector('.fullscreen');


playBtn.addEventListener('click', playVideo )
video.addEventListener('click', playVideo )
video.addEventListener('ended' , changingIcons)


function playVideo(){

  if(video.paused){
    video.play()
    playBtn.classList.replace('fa-play', 'fa-pause')

}


else{
  
  changingIcons()
}

}

function changingIcons(){
  
  video.pause()
  playBtn.classList.replace('fa-pause' , 'fa-play')


}


video.addEventListener('timeupdate' , updatingTime)

function updatingTime(){
progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
currentTime.textContent = `${updatingCurrentTime(video.currentTime)}`
duration.textContent = `${updatingCurrentTime(video.duration)}`


}

function updatingCurrentTime(time){

let seconds = Math.floor(time / 60)
let minutes = Math.floor(time % 60)
seconds = seconds < 10 ? `0 ${seconds}` : seconds ;

return `${seconds} : ${minutes}`

}


progressRange.addEventListener('click',   updatingProgress )

function updatingProgress(e){

let updatinglength = e.offsetX / progressRange.offsetWidth
progressBar.style.width = `${updatinglength * 100}%`
video.currentTime = updatinglength * video.duration

}


volumeIcon.addEventListener('click', changeVolumeIcons )

let lastVolume = 1

function changeVolumeIcons(){

volumeIcon.className = ''


if(video.volume){

  lastVolume  =  video.volume 
  video.volume = 0
  volumeIcon.classList.add( 'fas','fa-volume-mute')
  volumeBar.style.width = 0
}

else{

  lastVolume = video.volume 
  volumeIcon.classList.add( 'fas','fa-volume-up' )
  volumeBar.style.width = `${lastVolume*100}%`

}

}


volumeRange.addEventListener('click', setVolume);

function setVolume(e){

let setNewVolume =  e.offsetX / volumeRange.offsetWidth
volumeBar.style.width = `${setNewVolume * 100}%`

if(setNewVolume < 0.1){
  volume = 0
}
if(setNewVolume > 0.9){
volume = 1

}

video.volume = setNewVolume

volumeIcon.className = '' ;

if (setNewVolume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  } else if (setNewVolume < 0.7 && setNewVolume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  } else if (setNewVolume === 0) {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }

  lastVolume = setNewVolume;



}

speed.addEventListener('click', setSpeed)

function setSpeed(){

video.playbackRate = speed.value

}



// // Volume Controls --------------------------- //


// // Volume Bar
// function changeVolume(e) {
//   let volume = e.offsetX / volumeRange.offsetWidth;
//   // Rounding volume up or down
//   if (volume < 0.1) {
//     volume = 0;
//   }
//   if (volume > 0.9) {
//     volume = 1;
//   }

//   volumeBar.style.width = `${volume * 100}%`;
//   video.volume = volume;

//   // Change icon depending on volume
//   volumeIcon.className = '';
//   if (volume > 0.7) {
//     volumeIcon.classList.add('fas', 'fa-volume-up');
//   } else if (volume < 0.7 && volume > 0) {
//     volumeIcon.classList.add('fas', 'fa-volume-down');
//   } else if (volume === 0) {
//     volumeIcon.classList.add('fas', 'fa-volume-off');
//   }
//   lastVolume = volume;
// }





// speed.addEventListener('change', changeSpeed);


// // Change Playback Speed -------------------- //

// function changeSpeed() {
//   video.playbackRate = speed.value;
// }



fullscreenBtn.addEventListener('click', toggleFullscreen);


 // Fullscreen ------------------------------- //

/* View in fullscreen */
function openFullscreen(element) {
  console.log(element);

  element.requestFullscreen()
  // if (element.requestFullscreen) {
  //   element.requestFullscreen();
  // }
  
  // else if (element.mozRequestFullScreen) {
  //   /* Firefox */
  //   element.mozRequestFullScreen();
  // }
  
  // else if (element.webkitRequestFullscreen) {
  //   /* Chrome, Safari and Opera */
  //   element.webkitRequestFullscreen();
  // } 
  
  // else if (element.msRequestFullscreen) {
  //   /* IE/Edge */
  //   element.msRequestFullscreen();
  // }

  // video.classList.add('video-fullscreen');


}

/* Close fullscreen */
function closeFullscreen() {

  document.exitFullscreen()

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

let fullscre  = false;

// Toggle fullscreen
function toggleFullscreen() {
  if (!fullscreen) {
    openFullscreen(player);
  } else {
    closeFullscreen();
  }
  fullscreen = !fullscreen;
}
