const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const observedSections = [...navAnchors]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

navToggle.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
    }
});

const setActiveNavLink = (id) => {
    navAnchors.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
};

const sectionObserver = new IntersectionObserver(
    (entries) => {
        const visibleEntry = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
            setActiveNavLink(visibleEntry.target.id);
        }
    },
    {
        rootMargin: "-35% 0px -50% 0px",
        threshold: [0.2, 0.45, 0.7]
    }
);

observedSections.forEach((section) => sectionObserver.observe(section));
