document.addEventListener("DOMContentLoaded", () => {
        const dropdown = document.querySelector(".dropdown-box");
        const selectedInput = document.querySelector(".selected-item input");
        const items = document.querySelectorAll(".dropdown-item");
        const searchInput = document.querySelector(".search-input input");

        // 1. Toggle dropdown & close when clicking outside
        document.addEventListener("click", (e) => {
                const isClickInside = dropdown.contains(e.target);

                if (!isClickInside) {
                        // Clicked outside the dropdown
                        dropdown.classList.remove("active");
                } else if (e.target.closest(".selected-item")) {
                        // Clicked the select box
                        dropdown.classList.toggle("active");

                        // Focus search input when opened
                        if (dropdown.classList.contains("active")) {
                                setTimeout(() => searchInput.focus(), 50);
                        }
                }
        });

        // 2. Handle Item Selection
        items.forEach(item => {
                item.addEventListener("click", (e) => {
                        // Update input value
                        selectedInput.value = e.target.textContent;

                        // Update active styling
                        items.forEach(i => i.classList.remove("active"));
                        e.target.classList.add("active");

                        // Close dropdown and clear search
                        dropdown.classList.remove("active");
                        searchInput.value = "";

                        // Reset list visibility from previous searches
                        items.forEach(i => i.style.display = "block");
                });
        });

        // 3. Handle Search Filtering
        searchInput.addEventListener("input", (e) => {
                const filter = e.target.value.toLowerCase();

                items.forEach(item => {
                        const text = item.textContent.toLowerCase();
                        // Hide items that don't match the search
                        if (text.includes(filter)) {
                                item.style.display = "block";
                        } else {
                                item.style.display = "none";
                        }
                });
        });
});

