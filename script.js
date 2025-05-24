function createAnimation(id, prefix) {
  const frames = [];
  for (let i = 0; i <= 180; i += 10) {
    frames.push(`assets/${prefix}_${i}.png`);
  }

  let currentFrame = 0;
  const imgElement = document.getElementById(id);
  const fps = 5;
  let intervalId = null;

  function updateFrame() {
    currentFrame = (currentFrame + 1) % frames.length;
    imgElement.src = frames[currentFrame];
  }

  function startAnimation() {
    if (!intervalId) {
      intervalId = setInterval(updateFrame, 1000 / fps);
    }
  }

  function stopAnimation() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  // Lancer automatiquement
  startAnimation();

  // Ajouter gestion du survol
  imgElement.addEventListener('mouseenter', stopAnimation);
  imgElement.addEventListener('mouseleave', startAnimation);
}

// Lancer les animations
createAnimation("animation1", "melt");
createAnimation("animation2", "melt2");
createAnimation("animation3", "melt3");

// Ouvrir model.html dans un nouvel onglet
document.getElementById('openModel').addEventListener('click', () => {
  window.open('model.html', '_blank');
});
