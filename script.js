function createAnimation(id, prefix) {
  const frames = [];
  for (let i = 0; i <= 100; i += 10) {
    frames.push(`assets/${prefix}_${i}.png`);
  }

  let currentFrame = 0;
  const imgElement = document.getElementById(id);
  const fps = 5; // images par seconde

  setInterval(() => {
    currentFrame = (currentFrame + 1) % frames.length;
    imgElement.src = frames[currentFrame];
  }, 1000 / fps);
}

// Lancer les 4 animations
createAnimation("animation1", "melt");
createAnimation("animation2", "melt2");
createAnimation("animation3", "melt3");

document.getElementById('openModel').addEventListener('click', () => {
  window.open('model.html', '_blank');
});