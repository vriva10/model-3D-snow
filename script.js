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

// Lightbox (agrandir l'image au clic)
function setupLightbox(id, prefix) {
  const img = document.getElementById(id);
  const frames = [];
  for (let i = 0; i <= 180; i += 10) {
    frames.push(`assets/${prefix}_${i}.png`);
  }

  img.addEventListener("click", () => {
    let currentFrame = frames.indexOf(img.src);
    const fps = 5;
    let animationInterval;

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.background = "rgba(0,0,0,0.8)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = 9999;

    const fullImg = document.createElement("img");
    fullImg.src = frames[currentFrame];
    fullImg.style.maxWidth = "90vw";
    fullImg.style.maxHeight = "90vh";
    fullImg.style.boxShadow = "0 0 20px white";
    fullImg.style.border = "5px solid white";
    fullImg.style.borderRadius = "8px";
    fullImg.style.cursor = "default";

    overlay.appendChild(fullImg);
    document.body.appendChild(overlay);

    function startAnimation() {
      animationInterval = setInterval(() => {
        currentFrame = (currentFrame + 1) % frames.length;
        fullImg.src = frames[currentFrame];
      }, 1000 / fps);
    }

    function stopAnimation() {
      clearInterval(animationInterval);
    }

    startAnimation();

    // Pause/reprise au survol
    fullImg.addEventListener("mouseenter", stopAnimation);
    fullImg.addEventListener("mouseleave", startAnimation);

    // Clic sur le fond pour fermer
    overlay.addEventListener("click", () => {
      stopAnimation();
      document.body.removeChild(overlay);
    });

    // Empêche le clic sur l’image de fermer la lightbox
    fullImg.addEventListener("click", (e) => e.stopPropagation());
  });
}
