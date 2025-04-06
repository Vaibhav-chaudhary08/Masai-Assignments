document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');
    const sortRadios = document.querySelectorAll('input[name="sort"]');
    const searchButton = document.getElementById('search-button');
    const productListDiv = document.getElementById('product-list');
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessageDiv = document.getElementById('error-message');

    const API_BASE_URL = 'https://6611cf7795fdb62f24ee51f7.mockapi.io/api/v1/products';


    async function fetchProducts() {
        showLoading(true);
        hideError();
        productListDiv.innerHTML = '';

        const category = categorySelect.value;
        const minPrice = minPriceInput.value;
        const maxPrice = maxPriceInput.value;
        const sortOrder = document.querySelector('input[name="sort"]:checked').value;

        const params = new URLSearchParams();
        if (category) {
            params.append('category', category);
        }
        if (minPrice) {

            params.append('price_gte', minPrice);
        }
        if (maxPrice) {
            params.append('price_lte', maxPrice);
        }
        if (sortOrder) {
            params.append('sortBy', 'price');
            params.append('order', sortOrder);
        }


        const promptParams = new URLSearchParams();
         if (category) {
            promptParams.append('category', category);
        }
        if (minPrice) {
            promptParams.append('min_price', minPrice);
        }
        if (maxPrice) {
            promptParams.append('max_price', maxPrice);
        }
        if (sortOrder) {
            promptParams.append('sort', sortOrder);
        }


        const queryString = promptParams.toString();
        const apiUrl = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;

        console.log("Fetching URL:", apiUrl);

        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const products = await response.json();

            displayProducts(products);

        } catch (error) {
            console.error("Error fetching products:", error);
            showError(`Failed to fetch products: ${error.message}. Please check the API endpoint or network connection.`);
            productListDiv.innerHTML = '';
        } finally {
            showLoading(false);
        }
    }


    function displayProducts(products) {
        productListDiv.innerHTML = '';

        if (!products || products.length === 0) {
            productListDiv.innerHTML = '<p>No products found matching your criteria.</p>';
            return;
        }

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                ${product.image ? `<img src="${product.image}" alt="${product.name || 'Product Image'}">` : '<div class="img-placeholder">No Image</div>'}
                <h3>${product.name || 'Unnamed Product'}</h3>
                 ${product.category ? `<span class="category">${product.category}</span>` : ''}
                <p class="price">$${product.price !== undefined ? Number(product.price).toFixed(2) : 'N/A'}</p>
                <p class="description">${product.description || 'No description available.'}</p>
                `;
            productListDiv.appendChild(productCard);
        });
    }

    function showLoading(isLoading) {
        if (isLoading) {
            loadingIndicator.classList.remove('hidden');
        } else {
            loadingIndicator.classList.add('hidden');
        }
    }

    function showError(message) {
        errorMessageDiv.textContent = message;
        errorMessageDiv.classList.remove('hidden');
    }

    function hideError() {
        errorMessageDiv.classList.add('hidden');
        errorMessageDiv.textContent = '';
    }


    searchButton.addEventListener('click', fetchProducts);


     if (productListDiv.innerHTML.trim() === '') {
         productListDiv.innerHTML = '<p>Apply filters and click "Apply Filters" to search for products.</p>';
     }
});
