/* ==========================
TREATMENT LIST ANIMATION
========================== */

const revealItems = document.querySelectorAll(
    ".treatment-list__image--reveal, .treatment-list__content--reveal",
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.2,
    },
);

revealItems.forEach((item) => {
    revealObserver.observe(item);
});

/* ==========================
CASE CATEGORY FILTER
========================== */

document.addEventListener("click", (event) => {
    const button = event.target.closest(".case-category__button");

    if (!button) {
        return;
    }

    const categoryButtons = document.querySelectorAll(".case-category__button");

    const caseCards = document.querySelectorAll(".case-gallery__card");

    const caseGallery = document.querySelector("#case-gallery");
    const selectedCategory = button.dataset.category;

    /* 選択中のボタンを切り替える */
    categoryButtons.forEach((item) => {
        item.classList.remove("case-category__button--active");
    });

    button.classList.add("case-category__button--active");

    /* 選択した症例だけ表示する */
    caseCards.forEach((card) => {
        const shouldShow = selectedCategory === "all" || card.dataset.category === selectedCategory;

        card.classList.toggle("is-hidden", !shouldShow);
        card.classList.remove("is-filtered-in");

        if (shouldShow) {
            requestAnimationFrame(() => {
                card.classList.add("is-filtered-in");
            });
        }
    });

    /* 症例一覧まで移動する */
    if (caseGallery) {
        caseGallery.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }
});
/* ==========================
CASE CATEGORY RETURN BUTTON
========================== */

const categoryReturnButton = document.querySelector(".case-category-return");

const caseCategorySection = document.querySelector(".case-category");

const caseGallerySection = document.querySelector("#case-gallery");

const reservationSection = document.querySelector("#reservation");

if (categoryReturnButton && caseCategorySection && caseGallerySection && reservationSection) {
    function updateCategoryReturnButton() {
        const galleryTop = caseGallerySection.getBoundingClientRect().top;

        const reservationTop = reservationSection.getBoundingClientRect().top;

        const shouldShow =
            galleryTop < window.innerHeight * 0.5 && reservationTop > window.innerHeight * 0.65;

        categoryReturnButton.classList.toggle("is-visible", shouldShow);
    }

    categoryReturnButton.addEventListener("click", () => {
        caseCategorySection.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    });

    window.addEventListener("scroll", updateCategoryReturnButton);

    window.addEventListener("resize", updateCategoryReturnButton);

    updateCategoryReturnButton();
}
/* ==========================
RESERVATION FORM
========================== */

const reservationForm = document.querySelector("#reservation-form");
const reservationToast = document.querySelector("#reservation-toast");

if (reservationForm && reservationToast) {
    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();

        reservationToast.classList.add("is-visible");

        window.setTimeout(() => {
            reservationToast.classList.remove("is-visible");
        }, 2500);

        reservationForm.reset();
    });
}
/* ==========================
PC DROPDOWN MENU
========================== */

document.querySelectorAll(".header__dropdown").forEach((dropdown) => {
    const summary = dropdown.querySelector("summary");
    let clickedOpen = false;

    dropdown.addEventListener("mouseenter", () => {
        if (window.innerWidth >= 1024) {
            dropdown.open = true;
        }
    });

    dropdown.addEventListener("mouseleave", () => {
        if (window.innerWidth >= 1024 && !clickedOpen) {
            dropdown.open = false;
        }
    });

    summary.addEventListener("click", (event) => {
        if (window.innerWidth < 1024) return;

        event.preventDefault();

        clickedOpen = !clickedOpen;
        dropdown.open = clickedOpen;
    });
});
