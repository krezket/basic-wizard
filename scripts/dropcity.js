import { getCity } from '../API/citySearchAPI.js';

document.addEventListener("DOMContentLoaded", () => {
        const dropdown = document.querySelector("dropdown-box-2");
        const selectedInput = document.querySelector(".selected-item-2 input");
        const searchInput = document.querySelector(".search-input-2 input");
        const listContainer = document.querySelector("dropdown-content-2 ul");

        let debounceTimer;

        // 1. Toggle dropdown & close when clicking outside
        document.addEventListener("click", (e) => {
                const isClickInside = dropdown.contains(e.target);

                if (!isClickInside) {
                        dropdown.classList.remove("active");
                } else if (e.target.closest(".selected-item-2")) {
                        dropdown.classList.toggle("active");

                        // Focus search input when opened
                        if (dropdown.classList.contains("active")) {
                                setTimeout(() => searchInput.focus(), 50);
                        }
                }
        });

        // 2. Handle Item Selection via Event Delegation
        // We attach the listener to the UL, so it works even after the API replaces the LIs
        listContainer.addEventListener("click", (e) => {
                const item = e.target.closest("dropdown-item-2");

                if (item && !item.classList.contains("no-results")) {
                        // Update input value
                        selectedInput.value = item.textContent;

                        if (item.dataset.fullObject) {
                                const fullData = JSON.parse(item.dataset.fullObject);
                                //                                console.log("Full Selected Object:", fullData);
                                console.log("id:", fullData.id)
                                localStorage.setItem("id", fullData.id)
                        } else {
                                console.log("Selected text:", item.textContent);
                        }
                        // Close dropdown and clear search
                        dropdown.classList.remove("active");
                        searchInput.value = "";
                }
        });

        // 3. API Call with Debounce
        searchInput.addEventListener("input", (e) => {
                const searchValue = e.target.value;

                clearTimeout(debounceTimer);

                debounceTimer = setTimeout(async () => {
                        // Reset to default if input is empty
                        if (searchValue.trim() === "") {
                                listContainer.innerHTML = '<li class="dropdown-item active">Select</li>';
                                return;
                        }

                        try {
                                // Pass the search value to your API
                                const apiResponse = await getCountry(searchValue);
                                console.log(apiResponse)

                                // Render the new items
                                renderDropdownItems(apiResponse);
                        } catch (error) {
                                console.error("Failed to fetch countries:", error);
                                listContainer.innerHTML = '<li class="dropdown-item no-results">Error loading data</li>';
                        }
                }, 200); // Waits 300ms after user stops typing
        });

        // 4. Render Dynamic Items
        function renderDropdownItems(countries) {
                listContainer.innerHTML = ""; // Clear current list

                // Handle empty API results
                if (!countries || countries.length === 0) {
                        listContainer.innerHTML = '<li class="dropdown-item no-results">No results found</li>';
                        return;
                }

                // Generate new list items
                countries.forEach(country => {
                        const li = document.createElement("li");
                        li.className = "dropdown-item";
                        li.textContent = country.name || country;

                        li.dataset.fullObject = JSON.stringify(country);

                        listContainer.appendChild(li);
                });
        }
});
