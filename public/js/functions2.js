document.addEventListener('DOMContentLoaded', function () {
  const gameMode = localStorage.getItem('gameMode');

  if (gameMode === 'multiplayer') {
      document.querySelectorAll('#singleplayer-options input').forEach(option => {
          option.disabled = true;
          option.parentElement.classList.add('disabled-option');
      });
  } else if (gameMode === 'singleplayer') {
      document.querySelectorAll('#multiplayer-options input').forEach(option => {
          option.disabled = true;
          option.parentElement.classList.add('disabled-option');
      });
  }
});

function checkSelections() {
  const menu1Selected = document.querySelector('input[name="menufps"]:checked');
  const menu2Selected = document.querySelector('input[name="menugraf"]:checked');
  const menu3Selected = document.querySelector('input[name="menures"]:checked');

  const allSelected = menu1Selected !== null && menu2Selected !== null && menu3Selected !== null;

  document.getElementById('nextButton').disabled = !allSelected;
}

function selecionarKit(framerate, gamemode) {
  if (framerate === 'fps1') {
      return 'Low';
  } else if (framerate === 'fps2') {
      return gamemode === 'singleplayer' ? 'Medium' : 'High';
  } else {
      return 'Enthusiastic';
  }
}

function selecionarPlacaDeVideo(kit, resolution, quality) {
  let placavideo;

  if (kit === 'Low') {
      if (resolution === 'fullhd') {
          placavideo = 'Low';
      } else if (resolution === '2k') {
          placavideo = 'Medium';
      } else if (resolution === '4k') {
          placavideo = 'Highend';
      }
  } else if (kit === 'Medium') {
      if ((resolution === 'fullhd' && (quality === 'min' || quality === 'med'))) {
          placavideo = 'Medium';
      } else if ((resolution === 'fullhd' && quality === 'max') ||
                 (resolution === '2k' && (quality === 'min' || quality === 'med'))) {
          placavideo = 'High';
      } else if ((resolution === '4k' && (quality === 'min' || quality === 'med')) || (resolution === '2k' && quality === 'max')) {
          placavideo = 'Highend';
      } else {
          placavideo = 'Enthusiastic';
      }
  } else if (kit === 'High') {
      placavideo = resolution === 'fullhd' ? 'Medium' : 'High';
  } else if (kit === 'Enthusiastic') {
      placavideo = resolution === 'fullhd' ? 'High' : 'Highend';
  }

  return placavideo;
}

function goToNextPage() {
  const framerate = document.querySelector('input[name="menufps"]:checked').value;
  const quality = document.querySelector('input[name="menugraf"]:checked').value;
  const resolution = document.querySelector('input[name="menures"]:checked').value;
  const gameMode = localStorage.getItem('gameMode');

  const kit = selecionarKit(framerate, gameMode);
  const placavideo = selecionarPlacaDeVideo(kit, resolution, quality);

  localStorage.setItem('kit', kit);
  localStorage.setItem('placavideo', placavideo);

  console.log('Kit Selecionado:', kit);
  console.log('Placa de Vídeo Selecionada:', placavideo);

  window.location.href = "parte3.html";
}

