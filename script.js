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
function setupLightbox(id) {
  const img = document.getElementById(id);
  img.addEventListener("click", () => {
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
    fullImg.src = img.src;
    fullImg.style.maxWidth = "90vw";
    fullImg.style.maxHeight = "90vh";
    fullImg.style.boxShadow = "0 0 20px white";
    fullImg.style.border = "5px solid white";
    fullImg.style.borderRadius = "8px";

    // Fermer si on clique en dehors de l’image
    overlay.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });

    // Empêcher la propagation du clic à l’image elle-même
    fullImg.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    overlay.appendChild(fullImg);
    document.body.appendChild(overlay);
  });
}

// Appliquer la lightbox à chaque animation
["animation1", "animation2", "animation3"].forEach(setupLightbox);
