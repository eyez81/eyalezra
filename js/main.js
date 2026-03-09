document.addEventListener("DOMContentLoaded", function () {
  const heroImageEl = document.getElementById("hero-image");

  if (heroImageEl) {
    const heroImages = [
      "https://drive.google.com/thumbnail?id=1hF8H9V4YFJirXso8m4UTLt4bhxCowWsA&sz=w2000",
      "https://drive.google.com/thumbnail?id=1-6rapM2XkXxkTjTLenu-nUkRLiDVO2bp&sz=w2000",
      "https://drive.google.com/thumbnail?id=1mrm9foOFnMq5X6raPO41WJ7EQYvz3Kju&sz=w2000",
      "https://drive.google.com/thumbnail?id=1CPJMEp3We_KpCTeCs4CbbDKoxlIxg_SH&sz=w2000"
    ];

    let heroIndex = 0;
    heroImageEl.src = heroImages[0];

    setInterval(() => {
      heroIndex = (heroIndex + 1) % heroImages.length;
      heroImageEl.src = heroImages[heroIndex];
    }, 7000);
  }

  window.hideAllSubmenus = function () {
    document.querySelectorAll(".submenu").forEach(menu => {
      menu.classList.remove("active");
    });
  };

  window.toggleSubmenu = function (menuId) {
    const menu = document.getElementById(menuId);
    if (!menu) return;

    const isOpen = menu.classList.contains("active");
    hideAllSubmenus();

    if (!isOpen) {
      menu.classList.add("active");
    }
  };

  document.addEventListener("click", function (e) {
    const clickedInsideDesktopNav =
      e.target.closest(".main-nav") || e.target.closest(".submenu");

    if (!clickedInsideDesktopNav) {
      hideAllSubmenus();
    }
  });

  const mobileMenu = document.getElementById("mobile-menu");

  window.toggleMobileMenu = function () {
    if (mobileMenu) {
      mobileMenu.classList.toggle("active");
    }
  };

  window.closeMobileMenu = function () {
    if (mobileMenu) {
      mobileMenu.classList.remove("active");
    }

    document.querySelectorAll(".mobile-submenu").forEach(submenu => {
      submenu.classList.remove("active");
    });
  };

  window.toggleMobileSection = function (sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const isOpen = section.classList.contains("active");

    document.querySelectorAll(".mobile-submenu").forEach(submenu => {
      submenu.classList.remove("active");
    });

    if (!isOpen) {
      section.classList.add("active");
    }
  };

  document.addEventListener("contextmenu", function (e) {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });

  let currentAlbumImages = [];
  let currentIndex = 0;

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const nextBtn = document.getElementById("lightbox-next");
  const prevBtn = document.getElementById("lightbox-prev");
  const closeBtn = document.getElementById("lightbox-close");

  function openLightbox(src) {
    if (!lightbox || !lightboxImg) return;
    lightbox.style.display = "flex";
    lightboxImg.src = src;
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.style.display = "none";
  }

  function nextImage() {
    if (!currentAlbumImages.length || !lightboxImg) return;
    currentIndex = (currentIndex + 1) % currentAlbumImages.length;
    lightboxImg.src = currentAlbumImages[currentIndex].src;
  }

  function prevImage() {
    if (!currentAlbumImages.length || !lightboxImg) return;
    currentIndex = (currentIndex - 1 + currentAlbumImages.length) % currentAlbumImages.length;
    lightboxImg.src = currentAlbumImages[currentIndex].src;
  }

  document.querySelectorAll(".album-gallery img").forEach(img => {
    img.addEventListener("click", function () {
      const gallery = img.closest(".album-gallery");
      if (!gallery) return;

      currentAlbumImages = Array.from(gallery.querySelectorAll("img"));
      currentIndex = currentAlbumImages.indexOf(img);

      openLightbox(currentAlbumImages[currentIndex].src);
    });

    function classify() {
      const w = img.naturalWidth;
      const h = img.naturalHeight;

      if (w > h) {
        img.classList.add("landscape");
      } else if (Math.abs(w - h) < 80) {
        img.classList.add("square");
      }
    }

    if (img.complete) {
      classify();
    } else {
      img.onload = classify;
    }
  });

  if (lightbox) {
    lightbox.onclick = function (e) {
      if (e.target.id === "lightbox") {
        closeLightbox();
      }
    };

    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener("touchstart", function (e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener("touchend", function (e) {
      touchEndX = e.changedTouches[0].screenX;

      if (Math.abs(touchEndX - touchStartX) < 50) return;

      if (touchEndX < touchStartX) nextImage();
      if (touchEndX > touchStartX) prevImage();
    });
  }

  if (nextBtn) {
    nextBtn.onclick = function (e) {
      e.stopPropagation();
      nextImage();
    };
  }

  if (prevBtn) {
    prevBtn.onclick = function (e) {
      e.stopPropagation();
      prevImage();
    };
  }

  if (closeBtn) {
    closeBtn.onclick = function (e) {
      e.stopPropagation();
      closeLightbox();
    };
  }

  if (lightboxImg) {
    lightboxImg.onclick = function (e) {
      e.stopPropagation();
    };
  }

  document.addEventListener("keydown", function (e) {
    if (!lightbox || lightbox.style.display !== "flex") return;

    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") closeLightbox();
  });

  document.querySelectorAll(".mobile-submenu a").forEach(link => {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });
});
