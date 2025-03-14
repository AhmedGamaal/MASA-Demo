// Toggle password visibility
document.addEventListener("DOMContentLoaded", () => {
  const togglePasswordButtons = document.querySelectorAll(".toggle-password")

  togglePasswordButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const passwordInput = this.parentElement.querySelector("input")
      const icon = this.querySelector(".material-symbols-outlined")

      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        icon.textContent = "visibility_off"
      } else {
        passwordInput.type = "password"
        icon.textContent = "visibility"
      }
    })
  })

  // Password strength meter
  const passwordInput = document.getElementById("password")
  if (passwordInput) {
    passwordInput.addEventListener("input", function () {
      updatePasswordStrength(this.value)
    })
  }

  // Form submission
  const loginForm = document.getElementById("login-form")
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulate login
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value

      // Simple validation
      if (email && password) {
        // Store in localStorage to simulate login state
        localStorage.setItem("masaLoggedIn", "true")
        localStorage.setItem("masaUserEmail", email)

        // Redirect to home page
        window.location.href = "index.html"
      }
    })
  }

  const registerForm = document.getElementById("register-form")
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const firstName = document.getElementById("first-name").value
      const lastName = document.getElementById("last-name").value
      const email = document.getElementById("email").value
      const password = document.getElementById("password").value
      const confirmPassword = document.getElementById("confirm-password").value

      // Simple validation
      if (firstName && lastName && email && password) {
        if (password !== confirmPassword) {
          alert("Passwords do not match")
          return
        }

        // Store in localStorage to simulate registration
        localStorage.setItem("masaLoggedIn", "true")
        localStorage.setItem("masaUserEmail", email)
        localStorage.setItem("masaUserName", `${firstName} ${lastName}`)

        // Redirect to home page
        window.location.href = "index.html"
      }
    })
  }

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("masaLoggedIn") === "true"

  // Update UI based on login state
  updateUIForAuthState(isLoggedIn)
})

// Update password strength meter
function updatePasswordStrength(password) {
  const strengthMeter = document.querySelector(".strength-meter")
  const strengthText = document.querySelector(".strength-text")

  if (!strengthMeter || !strengthText) return

  const segments = strengthMeter.querySelectorAll(".meter-segment")

  // Reset segments
  segments.forEach((segment) => {
    segment.className = "meter-segment"
  })

  // Calculate strength
  let strength = 0

  if (password.length >= 8) strength++
  if (/[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  // Update UI
  for (let i = 0; i < strength; i++) {
    if (segments[i]) {
      if (strength === 1) {
        segments[i].classList.add("weak")
        strengthText.textContent = "Weak"
      } else if (strength === 2 || strength === 3) {
        segments[i].classList.add("medium")
        strengthText.textContent = "Medium"
      } else if (strength === 4) {
        segments[i].classList.add("strong")
        strengthText.textContent = "Strong"
      }
    }
  }
}

// Update UI based on authentication state
function updateUIForAuthState(isLoggedIn) {
  // This function would update the UI elements based on whether the user is logged in
  // For example, showing/hiding login/logout buttons, displaying user name, etc.

  // This is a placeholder for demonstration purposes
  console.log("User is " + (isLoggedIn ? "logged in" : "not logged in"))
}

