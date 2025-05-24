// === Configuration pour chaque animation ===
const animations = [
  {
    id: 'animation1',
    baseName: 'melt_',
    frameCount: 19, // mets ici le bon nombre de frames
  },
  {
    id: 'animation2',
    baseName: 'melt2_',
    frameCount: 19,
  },
  {
    id: 'animation3',
    baseName: 'melt3_',
    frameCount: 19,
  },
];

animations.forEach(anim => {
  const img = document.getElementById(anim.id);
  let frame = 0;
  let intervalId;

  function startAnimation() {
    intervalId = setInterval(() => {
      frame = (frame + 1) % anim.frameCount;
      img.src = `assets/${anim.baseName}${frame}.png`;
    }, 200); // durée entre les frames en ms
  }

  function stopAnimation() {
    clearInterval(intervalId);
  }

  // Démarrer l’animation au début
  startAnimation();

  // Gérer le hover : pause/reprise
  img.addEventListener('mouseenter', stopAnimation);
  img.addEventListener('mouseleave', startAnimation);
});
