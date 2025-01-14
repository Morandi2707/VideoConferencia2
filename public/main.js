// main.js

// Aguarda o carregamento completo da página antes de adicionar os event listeners
window.addEventListener("DOMContentLoaded", (event) => {
  const socket = io("http://localhost:4000"); // URL do servidor de sinalização
  let localStream;
  let remoteStreams = [];

  const localVideo = document.getElementById("localVideo");
  const remoteVideos = document.getElementById("remoteVideos");
  const joinCallButton = document.getElementById("joinCall");
  const leaveCallButton = document.getElementById("leaveCall");
  const muteAudioButton = document.getElementById("muteAudio");
  const muteVideoButton = document.getElementById("muteVideo");
  const fullscreenButton = document.getElementById("toggleFullscreen");

  let isAudioMuted = false;
  let isVideoMuted = false;
  let isFullscreen = false;

  async function startMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStream = stream;
      localVideo.srcObject = stream;
      console.log("Fluxo de mídia obtido com sucesso.");
    } catch (error) {
      console.error("Erro ao acessar mídia: ", error);
    }
  }

  function joinCall() {
    const room = prompt("Digite o nome da sala:");
    socket.emit("join", room);
    joinCallButton.disabled = true;
    leaveCallButton.disabled = false;
  }

  function leaveCall() {
    socket.emit("disconnect");
    joinCallButton.disabled = false;
    leaveCallButton.disabled = true;
  }

  function muteAudio() {
    isAudioMuted = !isAudioMuted;
    localStream.getAudioTracks()[0].enabled = !isAudioMuted;
    muteAudioButton.textContent = isAudioMuted
      ? "Desmutar Áudio"
      : "Mutar Áudio";
  }

  function muteVideo() {
    isVideoMuted = !isVideoMuted;
    localStream.getVideoTracks()[0].enabled = !isVideoMuted;
    muteVideoButton.textContent = isVideoMuted
      ? "Ligar Câmera"
      : "Desligar Câmera";
  }

  function toggleFullscreen() {
    if (!isFullscreen) {
      localVideo.requestFullscreen();
      isFullscreen = true;
    } else {
      document.exitFullscreen();
      isFullscreen = false;
    }
  }

  socket.on("signal", (data) => {
    // Lógica para lidar com sinalização entre os usuários
  });

  // Adicionar event listeners
  joinCallButton.addEventListener("click", joinCall);
  leaveCallButton.addEventListener("click", leaveCall);
  muteAudioButton.addEventListener("click", muteAudio);
  muteVideoButton.addEventListener("click", muteVideo);
  fullscreenButton.addEventListener("click", toggleFullscreen);

  // Iniciar captura de mídia quando a página carregar
  startMedia();
});
