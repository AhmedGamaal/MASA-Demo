/**
 * MASA E-commerce - Home Page JavaScript
 * Author: MASA Development Team
 * Version: 2.0
 */

document.addEventListener("DOMContentLoaded", () => {
  // Hero Slider
  initHeroSlider()

  // Testimonial Slider
  initTestimonialSlider()

  // Load Featured Products
  loadFeaturedProducts()

  // Load Best Sellers
  loadBestSellers()
})

/**
 * Initialize Hero Slider
 */
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide")
  const dots = document.querySelectorAll(".slider-dots .dot")
  const prevBtn = document.querySelector(".slider-arrow.prev")
  const nextBtn = document.querySelector(".slider-arrow.next")

  if (!slides.length) return

  let currentSlide = 0
  let slideInterval

  // Start automatic slideshow
  startSlideshow()

  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(slideInterval)
      changeSlide(currentSlide - 1)
      startSlideshow()
    })
  }

  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(slideInterval)
      changeSlide(currentSlide + 1)
      startSlideshow()
    })
  }

  // Dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(slideInterval)
      changeSlide(index)
      startSlideshow()
    })
  })

  // Change slide
  function changeSlide(index) {
    // Hide current slide
    slides[currentSlide].classList.remove("active")
    dots[currentSlide].classList.remove("active")

    // Calculate new index
    currentSlide = index

    // Handle index out of bounds
    if (currentSlide < 0) {
      currentSlide = slides.length - 1
    } else if (currentSlide >= slides.length) {
      currentSlide = 0
    }

    // Show new slide
    slides[currentSlide].classList.add("active")
    dots[currentSlide].classList.add("active")
  }

  // Start automatic slideshow
  function startSlideshow() {
    clearInterval(slideInterval)
    slideInterval = setInterval(() => {
      changeSlide(currentSlide + 1)
    }, 5000)
  }
}

/**
 * Initialize Testimonial Slider
 */
function initTestimonialSlider() {
  const slides = document.querySelectorAll(".testimonial-slide")
  const dots = document.querySelectorAll(".testimonial-controls .dot")
  const prevBtn = document.querySelector(".testimonial-controls .prev")
  const nextBtn = document.querySelector(".testimonial-controls .next")

  if (!slides.length) return

  let currentSlide = 0
  let slideInterval

  // Start automatic slideshow
  startSlideshow()

  // Previous button click
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      clearInterval(slideInterval)
      changeSlide(currentSlide - 1)
      startSlideshow()
    })
  }

  // Next button click
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(slideInterval)
      changeSlide(currentSlide + 1)
      startSlideshow()
    })
  }

  // Dot clicks
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(slideInterval)
      changeSlide(index)
      startSlideshow()
    })
  })

  // Change slide
  function changeSlide(index) {
    // Hide current slide
    slides[currentSlide].classList.remove("active")
    dots[currentSlide].classList.remove("active")

    // Calculate new index
    currentSlide = index

    // Handle index out of bounds
    if (currentSlide < 0) {
      currentSlide = slides.length - 1
    } else if (currentSlide >= slides.length) {
      currentSlide = 0
    }

    // Show new slide
    slides[currentSlide].classList.add("active")
    dots[currentSlide].classList.add("active")
  }

  // Start automatic slideshow
  function startSlideshow() {
    clearInterval(slideInterval)
    slideInterval = setInterval(() => {
      changeSlide(currentSlide + 1)
    }, 6000)
  }
}

/**
 * Load Featured Products
 */
function loadFeaturedProducts() {
  // This would typically fetch products from an API
  // For demonstration, we'll use static data
  const featuredProducts = [
    {
      id: 1,
      title: "Premium Cotton Galabiya",
      price: 899,
      image: "https://placehold.co/600x800/e9e2d5/8a6d3b?text=Product+1",
      badge: "new",
      rating: 4.5,
      reviews: 24,
    },
    {
      id: 2,
      title: "Embroidered Modest Dress",
      price: 999,
      originalPrice: 1299,
      image: "https://placehold.co/600x800/e9e2d5/8a6d3b?text=Product+2",
      badge: "sale",
      rating: 5,
      reviews: 42,
    },
    {
      id: 3,
      title: "Traditional Kaftan",
      price: 1499,
      image: "https://placehold.co/600x800/e9e2d5/8a6d3b?text=Product+3",
      rating: 4.5,
      reviews: 18,
    },
    {
      id: 4,
      title: "Children's Eid Outfit",
      price: 799,
      image: "https://placehold.co/600x800/e9e2d5/8a6d3b?text=Product+4",
      rating: 4,
      reviews: 12,
    },
  ]

  // Render products
  renderProducts(featuredProducts, ".featured-products .products-grid")
}

/**
 * Load Best Sellers
 */
function loadBestSellers() {
  // This would typically fetch products from an API
  // For demonstration, we'll use static data
  const bestSellers = [
    {
      id: 5,
      title: "Embroidered Abaya",
      price: 1299,
      image: "https://placehold.co/600x800/e9e2d5/8a6d3b?text=Best+Seller+1",
      badge: "bestseller",
      rating: 5,
      reviews: 56,
    },
    {
      id: 6,
      title: "Premium Linen Shirt",
      price: 799,
      image: "https://placehold.co/600x800/e9e2d5/8a6d3b?text=Best+Seller+2",
      badge: "bestseller",
      rating: 4.5,
      reviews: 38,
    },
    {
      id: 7,
      title: "Handcrafted Leather Sandals",
      price: 599,
      image: "https://placehold.co/600x800/e9e2d5/8a6d3b?text=Best+Seller+3",
      badge: "bestseller",
      rating: 4.5,
      reviews: 45,
    },
    {
      id: 8,
      title: "Modest Swimwear Set",
      price: 999,
      image: "https://placehold.co/600x800/e9e2d5/8a6d3b?text=Best+Seller+4",
      badge: "bestseller",
      rating: 4,
      reviews: 29,
    },
  ]

  // Render products
  renderProducts(bestSellers, ".products-section:nth-of-type(4) .products-grid")
}

/**
 * Render Products
 */
function renderProducts(products, containerSelector) {
  const container = document.querySelector(containerSelector)
  if (!container) return

  // Clear container
  container.innerHTML = ""

  // Render each product
  products.forEach((product) => {
    const productCard = document.createElement("div")
    productCard.className = "product-card"

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
 * Initialize Product Quick View
 */
function initProductQuickView() {
  // Implementation for quick view functionality
  // For demonstration purposes, let's just log a message
  console.log("Product Quick View initialized")
}

/**
 * Initialize Add to Cart
 */
function initAddToCart() {
  // Implementation for add to cart functionality
  // For demonstration purposes, let's just log a message
  console.log("Add to Cart initialized")
}

/**
 * Initialize Wishlist
 */
function initWishlist() {
  // Implementation for wishlist functionality
  // For demonstration purposes, let's just log a message
  console.log("Wishlist initialized")
}

