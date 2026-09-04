(() => {
  const mobileQuery = window.matchMedia("(max-width: 620px)");

  function enhanceCourseLanding() {
    const landing = document.querySelector(".landing-v7");
    if (!landing) return;

    landing
      .querySelectorAll(".landing-header .brand, .landing-footer .brand")
      .forEach((brand) => {
        if (brand.dataset.homeBound === "true") return;

        brand.dataset.homeBound = "true";
        brand.removeAttribute("data-route");
        brand.setAttribute("aria-label", "Volver al home de DAVA’S");
        brand.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          window.location.assign("/");
        });
      });

    const routeHeading = landing.querySelector(".landing-route-heading");
    if (routeHeading && !routeHeading.querySelector(".route-swipe-hint")) {
      const swipeHint = document.createElement("p");
      swipeHint.className = "route-swipe-hint";
      swipeHint.innerHTML = "<span>Desliza para ver las 5 etapas</span><b aria-hidden=\"true\">→</b>";
      routeHeading.append(swipeHint);
    }

    if (mobileQuery.matches) {
      landing
        .querySelectorAll(".landing-faq-list details[open]")
        .forEach((item) => item.removeAttribute("open"));
    }
  }

  document.addEventListener("DOMContentLoaded", enhanceCourseLanding);
  window.addEventListener("hashchange", () => setTimeout(enhanceCourseLanding, 0));
  mobileQuery.addEventListener("change", enhanceCourseLanding);
  requestAnimationFrame(enhanceCourseLanding);
})();
