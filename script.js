document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggle
    const bar = document.getElementById('bar');
    const navbar = document.getElementById('navbar');
    const close = document.getElementById('close');

    if (bar) {
        bar.addEventListener('click', () => {
            navbar.classList.add('active');
        });
    }

    if (close) {
        close.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    }
    function validateForm() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return false;
        }
        return true;
    }
    function sendResetLink() {
        var email = document.getElementById("email").value;
        if (email === "") {
            alert("Please enter your email.");
            return false;
        } else {
            alert("A password reset link has been sent to " + email);

            // Switch to Reset Password Form
            document.getElementById("email-form").style.display = "none";
            document.getElementById("reset-form").style.display = "block";
            document.getElementById("form-title").innerText = "Set a New Password";

            return false; // Prevents actual form submission
        }
    }

    function resetPassword() {
        var newPassword = document.getElementById("new-password").value;
        var confirmPassword = document.getElementById("confirm-password").value;

        if (newPassword.length < 6) {
            alert("Password must be at least 6 characters long.");
            return false;
        }

        if (newPassword !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }

        alert("Your password has been successfully reset! Redirecting to login...");
        window.location.href = "login.html";
        return false;
    }
    function validateLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Simple validation example
        if (!email || !password) {
            alert('Please fill in both fields.');
            return false; // Prevent form submission
        }

        // Navigate to account.html if validation passes
        window.location.href = 'account.html';
        return false; // Prevent form submission
    }
    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (event) {
            event.preventDefault();

            document.getElementById('confirmation-message').style.display = 'block';
            newsletterForm.reset();
        });
    }

    // Load Profile Data
    function loadProfile() {
        const name = localStorage.getItem('profileName') || 'Not provided';
        const email = localStorage.getItem('profileEmail') || 'Not provided';
        const role = localStorage.getItem('profileRole') || 'Not provided';
        const photo = localStorage.getItem('profilePhoto') || 'images/default-profile.png';

        document.getElementById('profile-name').textContent = name;
        document.getElementById('profile-email').textContent = email;
        document.getElementById('profile-role').textContent = role;
        document.getElementById('profile-photo').src = photo;
    }

   
});
