document.addEventListener("DOMContentLoaded", () => {

    // Tech Cards Reveal
    const techCards = document.querySelectorAll(".tech-card");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.2
        });

        techCards.forEach(card => {
            observer.observe(card);
        });

    }

    // Project Card Tilt
    const projectCard =
        document.querySelector(".project-showcase-card");

    if (projectCard) {

        projectCard.addEventListener("mousemove", e => {

            const rect =
                projectCard.getBoundingClientRect();

            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;

            projectCard.style.transform =
                `perspective(1000px)
                rotateX(${-y / 80}deg)
                rotateY(${x / 80}deg)`;

        });

        projectCard.addEventListener("mouseleave", () => {

            projectCard.style.transform =
                "perspective(1000px) rotateX(0) rotateY(0)";

        });

    }

});
