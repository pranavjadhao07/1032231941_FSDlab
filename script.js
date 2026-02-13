// js/script.js
// External JavaScript for validations, vanilla DOM manipulations, and jQuery operations

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Vanilla JS DOM Manipulations
    // getElementById + innerHTML
    document.getElementById('changeText').addEventListener('click', function() {
        document.getElementById('demoText').innerHTML = 'Text changed using innerHTML!';
    });

    // getElementsByClassName + style.color
    document.getElementById('changeColor').addEventListener('click', function() {
        const elements = document.getElementsByClassName('demo-node');
        for (let elem of elements) {
            elem.style.color = elem.style.color === 'red' ? 'blue' : 'red';
        }
    });

    // Change position with style
    document.getElementById('moveElement').addEventListener('click', function() {
        const text = document.getElementById('demoText');
        text.style.position = 'relative';
        text.style.left = Math.random() * 100 + 'px';
        text.style.top = Math.random() * 50 + 'px';
    });

    // getElementById + change image src
    document.getElementById('changeImage').addEventListener('click', function() {
        const img = document.getElementById('demoImage');
        img.src = img.src.includes('Image+1') ? 'https://via.placeholder.com/200x150/FF6B6B/FFFFFF?text=Image+2' : 'https://via.placeholder.com/200x150/4A90E2/FFFFFF?text=Image+1';
    });

    // Add text node + appendChild
    document.getElementById('addNode').addEventListener('click', function() {
        const parent = document.getElementById('parentNode');
        const textNode = document.createTextNode(' (New text node added!)');
        parent.appendChild(textNode);
    });

    // Delete a node (removeChild)
    document.getElementById('deleteNode').addEventListener('click', function() {
        const parent = document.getElementById('parentNode');
        const child = document.getElementById('childNode');
        if (child && parent.contains(child)) {
            parent.removeChild(child);
        }
    });

    // jQuery Operations
    // Change button text
    $('#jqChangeBtnText').click(function() {
        $(this).text('Button Text Changed!');
    });

    // Set background-image
    $('#jqBgImage').click(function() {
        $('.demo-section').css('background-image', 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)');
    });

    // Access HTML form data using serialize()
    $('#jqFormData').click(function() {
        const formData = $('#registrationForm').serialize();
        console.log('Form Data:', formData); // Logs to console for demo
        alert('Form data accessed via jQuery: Check console!');
    });

    // Add attribute using attr()
    $('#jqAddAttr').click(function() {
        $('#submitBtn').attr('disabled', 'disabled').text('Register (Demo Attr Added)');
    });

    // getElementsByTagName demo (e.g., change all p tags color on load)
    const pTags = document.getElementsByTagName('p');
    for (let p of pTags) {
        p.style.color = '#666';
    }
});

// Validation function (prevent default submit, validate, redirect if ok)
function validateForm(event) {
    event.preventDefault();

    // Clear previous errors
    clearErrors();

    let isValid = true;

    // Get values and trim
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Empty check (spaces considered empty via trim)
    if (!username) {
        showError('usernameError', 'Username is required.');
        isValid = false;
    }
    if (!email) {
        showError('emailError', 'Email is required.');
        isValid = false;
    }
    if (!phone) {
        showError('phoneError', 'Phone number is required.');
        isValid = false;
    }
    if (!password) {
        showError('passwordError', 'Password is required.');
        isValid = false;
    }
    if (!confirmPassword) {
        showError('confirmPasswordError', 'Confirm password is required.');
        isValid = false;
    }

    // Phone: 10 digits only
    if (phone && !/^\d{10}$/.test(phone)) {
        showError('phoneError', 'Phone must be exactly 10 numeric digits.');
        isValid = false;
    }

    // Password: >=7, 1 upper, 1 digit, 1 special [&$#@]
    if (password && !/(?=.*[A-Z])(?=.*\d)(?=.*[&$#@]).{7,}/.test(password)) {
        showError('passwordError', 'Password: min 7 chars, 1 uppercase, 1 digit, 1 (&,$,#, or @).');
        isValid = false;
    }

    // Confirm match
    if (password && confirmPassword && password !== confirmPassword) {
        showError('confirmPasswordError', 'Passwords do not match.');
        isValid = false;
    }

    // Email regex: letters+ @ letters{3} . letters{2,3}
    if (email && !/^[a-zA-Z]+@[a-zA-Z]{3}\.[a-zA-Z]{2,3}$/.test(email)) {
        showError('emailError', 'Invalid email format (e.g., user@abc.com or user@xyz.co).');
        isValid = false;
    }

    if (isValid) {
        // Store username and redirect
        localStorage.setItem('username', username);
        window.location.href = 'welcome.html';
    }

    return false;
}

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    errors.forEach(error => error.textContent = '');
}
