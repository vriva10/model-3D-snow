  function createAnimation(id, prefix, fps = 5, framesIndices = null) {
  const frames = framesIndices
    ? framesIndices.map(i => `assets/${prefix}_${i}.png`)
    : Array.from({ length: 19 }, (_, i) => `assets/${prefix}_${i * 10}.png`);

  let currentFrame = 0;
  const imgElement = document.getElementById(id);
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

  startAnimation();
  imgElement.addEventListener('mouseenter', stopAnimation);
  imgElement.addEventListener('mouseleave', startAnimation);
}

// Lancer les animations
createAnimation("animation1", "melt");
createAnimation("animation2", "melt2");
createAnimation("animation3", "melt3");
createAnimation("animation4", "melt4");
createAnimation("animation5", "melt5");
createAnimation("animation6", "melt6");
createAnimation("animation7", "melt7", 2, [0, 10, 20, 30]);  // FPS = 2, frames personnalisées

// Ouvrir model.html dans un nouvel onglet
document.getElementById('openModel').addEventListener('click', () => {
  window.open('model.html', '_blank');
});

// Ouvrir la page des variables
document.getElementById('openVariables').addEventListener('click', () => {
  window.open('variables.html', '_blank');
});

// Lightbox (agrandir l'image au clic)
function setupLightbox(id, prefix, framesIndices = null, fps = 5) {
  const frames = framesIndices
    ? framesIndices.map(i => `assets/${prefix}_${i}.png`)
    : Array.from({ length: 19 }, (_, i) => `assets/${prefix}_${i * 10}.png`);

  const img = document.getElementById(id);
  img.addEventListener("click", () => {
    let currentFrame = 0;

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

    overlay.appendChild(fullImg);
    document.body.appendChild(overlay);

    fullImg.addEventListener("click", (e) => e.stopPropagation());
    overlay.addEventListener("click", () => {
      clearInterval(animationInterval);
      document.body.removeChild(overlay);
    });

    const animationInterval = setInterval(() => {
      currentFrame = (currentFrame + 1) % frames.length;
      fullImg.src = frames[currentFrame];
    }, 1000 / fps);
  });
}

// Appliquer la lightbox à chaque animation
setupLightbox("animation1", "melt");
setupLightbox("animation2", "melt2");
setupLightbox("animation3", "melt3");
setupLightbox("animation4", "melt4");
setupLightbox("animation5", "melt5");
setupLightbox("animation6", "melt6");
setupLightbox("animation7", "melt7", [0, 10, 20, 30], 2);

