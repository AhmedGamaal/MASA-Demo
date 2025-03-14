/**
 * MASA E-commerce - Shop Page JavaScript
 * Author: MASA Development Team
 * Version: 2.0
 */

document.addEventListener("DOMContentLoaded", () => {
  // Load products
  loadProducts()

  // Initialize view switcher
  initViewSwitcher()

  // Initialize filters
  initFilters()

  // Initialize pagination
  initPagination()

  // Initialize sort functionality
  initSort()
})

/**
 * Load Products
 */
function loadProducts() {
  // This would typically fetch products from an API
  // For demonstration, we'll use static data
  const products = generateProductsData()

  // Render products
  renderProducts(products)

  // Update product count
  updateProductCount(products.length)
}

/**
 * Generate Products Data
 * This function generates 50 sample products
 */
function generateProductsData() {
  const products = []
  const categories = ["men", "women", "kids"]
  const collections = ["new", "sale", "ramadan", "wedding", ""]
  const badges = ["new", "sale", "bestseller", ""]

  const productNames = {
    men: [
      "Premium Cotton Galabiya",
      "Traditional Kaftan",
      "Embroidered Thobe",
      "Linen Shirt",
      "Cotton Pants",
      "Formal Suit",
      "Casual Jacket",
      "Silk Scarf",
      "Leather Sandals",
      "Prayer Set",
    ],
    women: [
      "Embroidered Abaya",
      "Modest Maxi Dress",
      "Floral Hijab",
      "Embellished Kaftan",
      "Pleated Skirt",
      "Palazzo Pants",
      "Chiffon Blouse",
      "Embroidered Shawl",
      "Beaded Evening Gown",
      "Cotton Jilbab",
    ],
    kids: [
      "Children's Eid Outfit",
      "Boys' Galabiya",
      "Girls' Embroidered Dress",
      "Kids' Prayer Set",
      "School Uniform",
      "Cotton Pajama Set",
      "Festive Celebration Outfit",
      "Casual Play Clothes",
      "Baby Onesie",
      "Toddler Dress",
    ],
  }

  // Generate 50 products
  for (let i = 1; i <= 50; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)]
    const collection = collections[Math.floor(Math.random() * collections.length)]
    const badge = badges[Math.floor(Math.random() * badges.length)]
    const productName = productNames[category][Math.floor(Math.random() * productNames[category].length)]

    const basePrice = Math.floor(Math.random() * 1500) + 500
    const hasDiscount = badge === "sale"
    const originalPrice = hasDiscount ? basePrice + Math.floor(Math.random() * 500) : null
    const price = hasDiscount ? basePrice : basePrice

    const rating = (Math.random() * 2 + 3).toFixed(1) // Rating between 3.0 and 5.0
    const reviews = Math.floor(Math.random() * 50) + 5 // Between 5 and 54 reviews

    products.push({
      id: i,
      title: productName,
      category: category,
      collection: collection,
      price: price,
      originalPrice: originalPrice,
      image: `https://placehold.co/600x800/e9e2d5/8a6d3b?text=${encodeURIComponent(productName)}`,
      badge: badge,
      rating: Number.parseFloat(rating),
      reviews: reviews,
      description:
        "This premium quality product is crafted with the finest Egyptian cotton, ensuring comfort and durability. The elegant design reflects authentic Egyptian cultural elements while maintaining a modern aesthetic.",
    })
  }

  return products
}

/**
 * Render Products
 */
function renderProducts(products) {
  const container = document.getElementById("products-container")
  if (!container) return

  // Clear container
  container.innerHTML = ""

  // Render each product
  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"
    productCard.dataset.category = product.category
    productCard.dataset.collection = product.collection

    // Badge
    if (product.badge) {
      productCard.innerHTML += `<div class="product-badge ${product.badge}">${product.badge}</div>`
    }

    // Product image and actions
    productCard.innerHTML += `
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
        <div class="product-actions">
          <button class="product-action-btn" aria-label="Quick view">
            <span class="material-symbols-outlined">visibility</span>
          </button>
          <button class="product-action-btn" aria-label="Add to wishlist">
            <span class="material-symbols-outlined">favorite</span>
          </button>
          <button class="product-action-btn" aria-label="Add to cart">
            <span class="material-symbols-outlined">shopping_bag</span>
          </button>
        </div>
      </div>
    `

    // Product info
    let priceHTML = ""
    if (product.originalPrice) {
      priceHTML = `
        <div class="product-price">
          <span class="original-price">${product.originalPrice} EGP</span>
          <span class="current-price">${product.price} EGP</span>
        </div>
      `
    } else {
      priceHTML = `
        <div class="product-price">
          <span class="current-price">${product.price} EGP</span>
        </div>
      `
    }

    // Generate stars based on rating
    const fullStars = Math.floor(product.rating)
    const hasHalfStar = product.rating % 1 !== 0
    let starsHTML = ""

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        starsHTML += '<span class="material-symbols-outlined filled">star</span>'
      } else if (i === fullStars && hasHalfStar) {
        starsHTML += '<span class="material-symbols-outlined half-filled">star</span>'
      } else {
        starsHTML += '<span class="material-symbols-outlined">star</span>'
      }
    }

    productCard.innerHTML += `
      <div class="product-info">
        <h3 class="product-title">
          <a href="product.html?id=${product.id}">${product.title}</a>
        </h3>
        ${priceHTML}
        <div class="product-rating">
          <div class="stars">
            ${starsHTML}
          </div>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <p class="product-description">${product.description}</p>
      </div>
    `

    // Append to container
    container.appendChild(productCard)
  })

  // Initialize product actions
  initProductQuickView()
  initAddToCart()
  initWishlist()
}

/**
 * Update Product Count
 */
function updateProductCount(count) {
  const totalCountElement = document.getElementById("total-count")
  if (totalCountElement) {
    totalCountElement.textContent = count
  }

  const showingCountElement = document.getElementById("showing-count")
  if (showingCountElement) {
    const start = 1
    const end = Math.min(12, count)
    showingCountElement.textContent = `${start}-${end}`
  }
}

/**
 * Initialize View Switcher
 */
function initViewSwitcher() {
  const gridBtn = document.querySelector(".view-btn.grid")
  const listBtn = document.querySelector(".view-btn.list")
  const productsContainer = document.getElementById("products-container")

  if (gridBtn && listBtn && productsContainer) {
    gridBtn.addEventListener("click", () => {
      productsContainer.classList.remove("products-list")
      productsContainer.classList.add("products-grid")
      gridBtn.classList.add("active")
      listBtn.classList.remove("active")
    })

    listBtn.addEventListener("click", () => {
      productsContainer.classList.remove("products-grid")
      productsContainer.classList.add("products-list")
      listBtn.classList.add("active")
      gridBtn.classList.remove("active")
    })
  }
}

/**
 * Initialize Filters
 */
function initFilters() {
  const applyFiltersBtn = document.getElementById("apply-filters")
  const resetFiltersBtn = document.getElementById("reset-filters")

  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", () => {
      applyFilters()
    })
  }

  if (resetFiltersBtn) {
    resetFiltersBtn.addEventListener("click", () => {
      resetFilters()
    })
  }

  // Check URL parameters for initial filters
  const urlParams = new URLSearchParams(window.location.search)
  const categoryParam = urlParams.get("category")
  const collectionParam = urlParams.get("collection")

  if (categoryParam) {
    const categoryCheckbox = document.querySelector(`input[name="category"][value="${categoryParam}"]`)
    if (categoryCheckbox) {
      categoryCheckbox.checked = true
    }
  }

  if (collectionParam) {
    const collectionCheckbox = document.querySelector(`input[name="collection"][value="${collectionParam}"]`)
    if (collectionCheckbox) {
      collectionCheckbox.checked = true
    }
  }

  // Apply initial filters
  if (categoryParam || collectionParam) {
    applyFilters()
  }
}

/**
 * Apply Filters
 */
function applyFilters() {
  // Get selected categories
  const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked')).map(
    (input) => input.value,
  )

  // Get selected collections
  const selectedCollections = Array.from(document.querySelectorAll('input[name="collection"]:checked')).map(
    (input) => input.value,
  )

  // Get price range
  const minPrice = Number.parseInt(document.getElementById("min-price").value) || 0
  const maxPrice = Number.parseInt(document.getElementById("max-price").value) || 5000

  // Get selected sizes
  const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map((input) => input.value)

  // Get selected colors
  const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(
    (input) => input.value,
  )

  // Filter products
  const products = generateProductsData()
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes("all")) {
      if (!selectedCategories.includes(product.category)) {
        return false
      }
    }

    // Filter by collection
    if (selectedCollections.length > 0) {
      if (!selectedCollections.includes(product.collection)) {
        return false
      }
    }

    // Filter by price
    if (product.price < minPrice || product.price > maxPrice) {
      return false
    }

    // In a real application, we would also filter by size and color
    // For this demo, we'll skip that part

    return true
  })

  // Render filtered products
  renderProducts(filteredProducts)

  // Update product count
  updateProductCount(filteredProducts.length)
}

/**
 * Reset Filters
 */
function resetFilters() {
  // Reset category checkboxes
  document.querySelectorAll('input[name="category"]').forEach((input) => {
    input.checked = input.value === "all"
  })

  // Reset collection checkboxes
  document.querySelectorAll('input[name="collection"]').forEach((input) => {
    input.checked = false
  })

  // Reset price range
  document.getElementById("min-price").value = 0
  document.getElementById("max-price").value = 5000

  // Reset size checkboxes
  document.querySelectorAll('input[name="size"]').forEach((input) => {
    input.checked = false
  })

  // Reset color checkboxes
  document.querySelectorAll('input[name="color"]').forEach((input) => {
    input.checked = false
  })

  // Load all products
  loadProducts()
}

/**
 * Initialize Pagination
 */
function initPagination() {
  const paginationNumbers = document.querySelectorAll(".pagination-number")
  const prevBtn = document.querySelector(".pagination-btn.prev")
  const nextBtn = document.querySelector(".pagination-btn.next")

  if (paginationNumbers.length) {
    paginationNumbers.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // Update active class
        document.querySelector(".pagination-number.active").classList.remove("active")
        btn.classList.add("active")

        // Update prev/next buttons
        if (index === 0) {
          prevBtn.disabled = true
        } else {
          prevBtn.disabled = false
        }

        if (index === paginationNumbers.length - 1) {
          nextBtn.disabled = true
        } else {
          nextBtn.disabled = false
        }

        // Load products for selected page
        // In a real application, you would fetch products based on the page number
        // For this demo, we'll just reload all products
        loadProducts()
      })
    })

    prevBtn.addEventListener("click", () => {
      const activeBtn = document.querySelector(".pagination-number.active")
      const prevSibling = activeBtn.previousElementSibling

      if (prevSibling) {
        // Update active class
        activeBtn.classList.remove("active")
        prevSibling.classList.add("active")

        // Update prev/next buttons
        if (prevSibling === paginationNumbers[0]) {
          prevBtn.disabled = true
        } else {
          prevBtn.disabled = false
        }
        nextBtn.disabled = false

        // Load products for selected page
        // In a real application, you would fetch products based on the page number
        // For this demo, we'll just reload all products
        loadProducts()
      }
    })

    nextBtn.addEventListener("click", () => {
      const activeBtn = document.querySelector(".pagination-number.active")
      const nextSibling = activeBtn.nextElementSibling

      if (nextSibling) {
        // Update active class
        activeBtn.classList.remove("active")
        nextSibling.classList.add("active")

        // Update prev/next buttons
        if (nextSibling === paginationNumbers[paginationNumbers.length - 1]) {
          nextBtn.disabled = true
        } else {
          nextBtn.disabled = false
        }
        prevBtn.disabled = false

        // Load products for selected page
        // In a real application, you would fetch products based on the page number
        // For this demo, we'll just reload all products
        loadProducts()
      }
    })
  }
}

/**
 * Initialize Sort
 */
function initSort() {
  const sortSelect = document.getElementById("sort-select")

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const sortBy = sortSelect.value

      // Sort products
      const products = generateProductsData()
      let sortedProducts = []

      switch (sortBy) {
        case "price-asc":
          sortedProducts = products.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          sortedProducts = products.sort((a, b) => b.price - a.price)
          break
        case "rating-asc":
          sortedProducts = products.sort((a, b) => a.rating - b.rating)
          break
        case "rating-desc":
          sortedProducts = products.sort((a, b) => b.rating - a.rating)
          break
        default:
          sortedProducts = products
      }

      // Render sorted products
      renderProducts(sortedProducts)
    })
  }
}

/**
 * Initialize Product Quick View
 */
function initProductQuickView() {
  const quickViewButtons = document.querySelectorAll('.product-action-btn[aria-label="Quick view"]')

  quickViewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get product ID from the product card
      const productCard = button.closest(".product-card")
      const productId = productCard.querySelector(".product-title a").href.split("id=")[1]

      // Fetch product details (replace with your actual data fetching logic)
      const products = generateProductsData()
      const product = products.find((p) => p.id === Number.parseInt(productId))

      if (product) {
        // Open quick view modal and populate with product details
        openQuickViewModal(product)
      }
    })
  })
}

/**
 * Open Quick View Modal
 */
function openQuickViewModal(product) {
  // Create modal element
  const modal = document.createElement("div")
  modal.className = "quick-view-modal"

  // Modal content
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-btn" onclick="closeQuickViewModal()">&times;</span>
      <h2>${product.title}</h2>
      <img src="${product.image}" alt="${product.title}">
      <p>${product.description}</p>
      <div class="product-price">
        ${product.originalPrice ? `<span class="original-price">${product.originalPrice} EGP</span>` : ""}
        <span class="current-price">${product.price} EGP</span>
      </div>
      <button class="add-to-cart-btn">Add to Cart</button>
    </div>
  `

  // Append modal to body
  document.body.appendChild(modal)

  // Add event listener to add to cart button
  const addToCartBtn = modal.querySelector(".add-to-cart-btn")
  addToCartBtn.addEventListener("click", () => {
    // Add product to cart logic here
    alert("Product added to cart!")
  })

  // Show modal
  modal.style.display = "block"
}

/**
 * Close Quick View Modal
 */
function closeQuickViewModal() {
  const modal = document.querySelector(".quick-view-modal")
  if (modal) {
    modal.remove()
  }
}

/**
 * Initialize Add to Cart
 */
function initAddToCart() {
  const addToCartButtons = document.querySelectorAll('.product-action-btn[aria-label="Add to cart"]')

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get product ID from the product card
      const productCard = button.closest(".product-card")
      const productId = productCard.querySelector(".product-title a").href.split("id=")[1]

      // Add product to cart (replace with your actual cart logic)
      const products = generateProductsData()
      const product = products.find((p) => p.id === Number.parseInt(productId))

      if (product) {
        // Add product to cart logic here
        alert(`${product.title} added to cart!`)
      }
    })
  })
}

/**
 * Initialize Wishlist
 */
function initWishlist() {
  const wishlistButtons = document.querySelectorAll('.product-action-btn[aria-label="Add to wishlist"]')

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Get product ID from the product card
      const productCard = button.closest(".product-card")
      const productId = productCard.querySelector(".product-title a").href.split("id=")[1]

      // Add product to wishlist (replace with your actual wishlist logic)
      const products = generateProductsData()
      const product = products.find((p) => p.id === Number.parseInt(productId))

      if (product) {
        // Add product to wishlist logic here
        alert(`${product.title} added to wishlist!`)
      }
    })
  })
}

