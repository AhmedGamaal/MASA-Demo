/**
 * MASA E-commerce - Main JavaScript
 * Author: MASA Development Team
 * Version: 2.0
 */

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay")
  const mobileMenuClose = document.querySelector(".mobile-menu-close")
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle")

  if (mobileMenuToggle && mobileMenuOverlay) {
    mobileMenuToggle.addEventListener("click", () => {
      mobileMenuOverlay.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  }

  if (mobileMenuClose && mobileMenuOverlay) {
    mobileMenuClose.addEventListener("click", () => {
      mobileMenuOverlay.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // Close mobile menu when clicking outside
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", (e) => {
      if (e.target === mobileMenuOverlay) {
        mobileMenuOverlay.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Mobile Dropdown Toggles
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function () {
      const parent = this.parentElement
      const dropdown = parent.querySelector(".mobile-dropdown")

      if (dropdown) {
        dropdown.classList.toggle("active")
        this.classList.toggle("active")
      }
    })
  })

  // Search Toggle
  const searchToggle = document.querySelector(".search-toggle")
  const searchOverlay = document.querySelector(".search-overlay")
  const searchClose = document.querySelector(".search-close")

  if (searchToggle && searchOverlay) {
    searchToggle.addEventListener("click", () => {
      searchOverlay.classList.add("active")
      document.body.style.overflow = "hidden"
      setTimeout(() => {
        searchOverlay.querySelector(".search-input").focus()
      }, 100)
    })
  }

  if (searchClose && searchOverlay) {
    searchClose.addEventListener("click", () => {
      searchOverlay.classList.remove("active")
      document.body.style.overflow = ""
    })
  }

  // Close search overlay when clicking outside
  if (searchOverlay) {
    searchOverlay.addEventListener("click", (e) => {
      if (e.target === searchOverlay) {
        searchOverlay.classList.remove("active")
        document.body.style.overflow = ""
      }
    })
  }

  // Back to Top Button
  const backToTopButton = document.getElementById("back-to-top")

  if (backToTopButton) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    })

    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // Initialize Product Quick View
  initProductQuickView()

  // Initialize Add to Cart functionality
  initAddToCart()

  // Initialize Wishlist functionality
  initWishlist()
})

/**
 * Initialize Product Quick View
 */
function initProductQuickView() {
  const quickViewButtons = document.querySelectorAll('.product-action-btn[aria-label="Quick view"]')

  quickViewButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      // Get product data from the closest product card
      const productCard = this.closest(".product-card")
      const productTitle = productCard.querySelector(".product-title a").textContent
      const productImage = productCard.querySelector(".product-image img").src
      const productPrice = productCard.querySelector(".current-price").textContent

      // Create quick view modal
      const quickViewModal = document.createElement("div")
      quickViewModal.className = "quick-view-modal"
      quickViewModal.innerHTML = `
        <div class="quick-view-overlay"></div>
        <div class="quick-view-content">
          <button class="quick-view-close">
            <span class="material-symbols-outlined">close</span>
          </button>
          <div class="quick-view-product">
            <div class="quick-view-image">
              <img src="${productImage}" alt="${productTitle}">
            </div>
            <div class="quick-view-info">
              <h2>${productTitle}</h2>
              <div class="quick-view-price">${productPrice}</div>
              <p class="quick-view-description">
                This premium quality product is crafted with the finest Egyptian cotton, 
                ensuring comfort and durability. The elegant design reflects authentic 
                Egyptian cultural elements while maintaining a modern aesthetic.
              </p>
              <div class="quick-view-actions">
                <div class="quantity-selector">
                  <button class="quantity-btn minus">-</button>
                  <input type="number" value="1" min="1" class="quantity-input">
                  <button class="quantity-btn plus">+</button>
                </div>
                <button class="btn btn-primary add-to-cart-btn">
                  <span class="material-symbols-outlined">shopping_bag</span>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      `

      // Append modal to body
      document.body.appendChild(quickViewModal)
      document.body.style.overflow = "hidden"

      // Add event listeners
      const closeButton = quickViewModal.querySelector(".quick-view-close")
      const overlay = quickViewModal.querySelector(".quick-view-overlay")
      const minusBtn = quickViewModal.querySelector(".quantity-btn.minus")
      const plusBtn = quickViewModal.querySelector(".quantity-btn.plus")
      const quantityInput = quickViewModal.querySelector(".quantity-input")
      const addToCartBtn = quickViewModal.querySelector(".add-to-cart-btn")

      closeButton.addEventListener("click", closeQuickView)
      overlay.addEventListener("click", closeQuickView)

      minusBtn.addEventListener("click", () => {
        const currentValue = Number.parseInt(quantityInput.value)
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1
        }
      })

      plusBtn.addEventListener("click", () => {
        const currentValue = Number.parseInt(quantityInput.value)
        quantityInput.value = currentValue + 1
      })

      addToCartBtn.addEventListener("click", () => {
        const quantity = Number.parseInt(quantityInput.value)
        addToCart({
          title: productTitle,
          image: productImage,
          price: productPrice,
          quantity: quantity,
        })

        closeQuickView()
        showNotification("Product added to cart!")
      })

      function closeQuickView() {
        document.body.removeChild(quickViewModal)
        document.body.style.overflow = ""
      }
    })
  })
}

/**
 * Initialize Add to Cart functionality
 */
function initAddToCart() {
  const addToCartButtons = document.querySelectorAll('.product-action-btn[aria-label="Add to cart"]')

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      // Get product data from the closest product card
      const productCard = this.closest(".product-card")
      const productTitle = productCard.querySelector(".product-title a").textContent
      const productImage = productCard.querySelector(".product-image img").src
      const productPrice = productCard.querySelector(".current-price").textContent

      addToCart({
        title: productTitle,
        image: productImage,
        price: productPrice,
        quantity: 1,
      })

      showNotification("Product added to cart!")
    })
  })
}

/**
 * Add product to cart
 */
function addToCart(product) {
  // Get existing cart from localStorage
  const cart = JSON.parse(localStorage.getItem("masaCart")) || []

  // Check if product already exists in cart
  const existingProductIndex = cart.findIndex((item) => item.title === product.title)

  if (existingProductIndex > -1) {
    // Update quantity if product exists
    cart[existingProductIndex].quantity += product.quantity
  } else {
    // Add new product to cart
    cart.push(product)
  }

  // Save cart to localStorage
  localStorage.setItem("masaCart", JSON.stringify(cart))

  // Update cart count
  updateCartCount()
}

/**
 * Update cart count in header
 */
function updateCartCount() {
  const cartCountElements = document.querySelectorAll(".badge")
  const cart = JSON.parse(localStorage.getItem("masaCart")) || []

  // Calculate total quantity
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0)

  // Update all cart count elements
  cartCountElements.forEach((element) => {
    element.textContent = totalQuantity
  })
}

/**
 * Initialize Wishlist functionality
 */
function initWishlist() {
  const wishlistButtons = document.querySelectorAll('.product-action-btn[aria-label="Add to wishlist"]')

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()

      // Get product data from the closest product card
      const productCard = this.closest(".product-card")
      const productTitle = productCard.querySelector(".product-title a").textContent
      const productImage = productCard.querySelector(".product-image img").src
      const productPrice = productCard.querySelector(".current-price").textContent

      addToWishlist({
        title: productTitle,
        image: productImage,
        price: productPrice,
      })

      showNotification("Product added to wishlist!")
    })
  })
}

/**
 * Add product to wishlist
 */
function addToWishlist(product) {
  // Get existing wishlist from localStorage
  const wishlist = JSON.parse(localStorage.getItem("masaWishlist")) || []

  // Check if product already exists in wishlist
  const existingProductIndex = wishlist.findIndex((item) => item.title === product.title)

  if (existingProductIndex === -1) {
    // Add new product to wishlist
    wishlist.push(product)

    // Save wishlist to localStorage
    localStorage.setItem("masaWishlist", JSON.stringify(wishlist))

    // Update wishlist count
    updateWishlistCount()
  }
}

/**
 * Update wishlist count in header
 */
function updateWishlistCount() {
  const wishlistCountElements = document.querySelectorAll('.action-btn[aria-label="Wishlist"] .badge')
  const wishlist = JSON.parse(localStorage.getItem("masaWishlist")) || []

  // Update all wishlist count elements
  wishlistCountElements.forEach((element) => {
    element.textContent = wishlist.length
  })
}

/**
 * Show notification
 */
function showNotification(message) {
  // Check if notification container exists
  let notificationContainer = document.querySelector(".notification-container")

  // Create notification container if it doesn't exist
  if (!notificationContainer) {
    notificationContainer = document.createElement("div")
    notificationContainer.className = "notification-container"
    document.body.appendChild(notificationContainer)
  }

  // Create notification
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.innerHTML = `
    <div class="notification-content">
      <span class="material-symbols-outlined">check_circle</span>
      <p>${message}</p>
    </div>
    <button class="notification-close">
      <span class="material-symbols-outlined">close</span>
    </button>
  `

  // Append notification to container
  notificationContainer.appendChild(notification)

  // Add event listener to close button
  const closeButton = notification.querySelector(".notification-close")
  closeButton.addEventListener("click", () => {
    notification.classList.add("closing")
    setTimeout(() => {
      notificationContainer.removeChild(notification)
    }, 300)
  })

  // Auto remove notification after 3 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.add("closing")
      setTimeout(() => {
        if (notification.parentNode) {
          notificationContainer.removeChild(notification)
        }
      }, 300)
    }
  }, 3000)
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Update cart and wishlist counts
  updateCartCount()
  updateWishlistCount()
})

