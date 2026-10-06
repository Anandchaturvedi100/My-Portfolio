document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover)").matches;

    // 1. Scroll reveal (cards neeche scroll karne par fade-in hote hain)
    const revealItems = document.querySelectorAll(
        ".tech-card, .skill-card, .project-showcase-card, .experience-card, .edu-cert-card"
    );

    if ("IntersectionObserver" in window && !reduceMotion) {
        document.documentElement.classList.add("js");
        revealItems.forEach(el => el.classList.add("reveal"));

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealItems.forEach(el => observer.observe(el));
    }

    // 2. Project card tilt (ab SAARE project cards par, sirf desktop/mouse par)
    if (canHover && !reduceMotion) {
        document.querySelectorAll(".project-showcase-card").forEach(card => {
            card.addEventListener("mousemove", e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                card.style.transition = "transform 0.1s ease-out";
                card.style.transform =
                    `perspective(1000px) rotateX(${-y / 80}deg) rotateY(${x / 80}deg)`;
            });

            card.addEventListener("mouseleave", () => {
                card.style.transition = "";
                card.style.transform = "";
            });
        });
    }

    // 3. Hero cubes parallax (CSS me iska comment tha, par JS missing thi)
    const hero = document.querySelector(".hero-section");
    const cubes = document.querySelectorAll(".cube");

    if (hero && cubes.length && canHover && !reduceMotion) {
        hero.addEventListener("mousemove", e => {
            const x = e.clientX / window.innerWidth - 0.5;
            const y = e.clientY / window.innerHeight - 0.5;
            cubes.forEach((cube, i) => {
                const depth = (i + 1) * 14;
                cube.style.translate = `${x * depth}px ${y * depth}px`;
            });
        });
    }
});
