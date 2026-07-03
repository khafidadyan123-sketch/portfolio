// ===== RESPONSIVE NAVIGATION =====
document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== CONTACT FORM VALIDATION =====
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        const fullname = document.getElementById('fullname');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const dob = document.getElementById('dob');
        const genderRadios = document.querySelectorAll('input[name="gender"]');
        const photo = document.getElementById('photo');
        const terms = document.getElementById('terms');

        const fullnameError = document.getElementById('fullname-error');
        const emailError = document.getElementById('email-error');
        const passwordError = document.getElementById('password-error');
        const dobError = document.getElementById('dob-error');
        const genderError = document.getElementById('gender-error');
        const photoError = document.getElementById('photo-error');
        const termsError = document.getElementById('terms-error');

        const formSuccess = document.getElementById('form-success');
        const resetBtn = document.getElementById('reset-form-btn');

        function showError(input, errorEl) {
            input.classList.add('error');
            errorEl.classList.add('visible');
        }

        function clearError(input, errorEl) {
            input.classList.remove('error');
            errorEl.classList.remove('visible');
        }

        function validateEmail(emailValue) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue);
        }

        // Real-time validation on blur
        fullname.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                showError(this, fullnameError);
            } else {
                clearError(this, fullnameError);
            }
        });

        email.addEventListener('blur', function () {
            if (!validateEmail(this.value.trim())) {
                showError(this, emailError);
            } else {
                clearError(this, emailError);
            }
        });

        password.addEventListener('blur', function () {
            if (this.value.length < 8) {
                showError(this, passwordError);
            } else {
                clearError(this, passwordError);
            }
        });

        dob.addEventListener('blur', function () {
            if (this.value === '') {
                showError(this, dobError);
            } else {
                clearError(this, dobError);
            }
        });

        photo.addEventListener('change', function () {
            if (this.files.length === 0) {
                showError(this, photoError);
            } else {
                clearError(this, photoError);
            }
        });

        genderRadios.forEach(function (radio) {
            radio.addEventListener('change', function () {
                var selected = document.querySelector('input[name="gender"]:checked');
                if (selected) {
                    genderError.classList.remove('visible');
                }
            });
        });

        terms.addEventListener('change', function () {
            if (this.checked) {
                termsError.classList.remove('visible');
            }
        });

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var isValid = true;

            // Fullname
            if (fullname.value.trim() === '') {
                showError(fullname, fullnameError);
                isValid = false;
            } else {
                clearError(fullname, fullnameError);
            }

            // Email
            if (!validateEmail(email.value.trim())) {
                showError(email, emailError);
                isValid = false;
            } else {
                clearError(email, emailError);
            }

            // Password
            if (password.value.length < 8) {
                showError(password, passwordError);
                isValid = false;
            } else {
                clearError(password, passwordError);
            }

            // Date of Birth
            if (dob.value === '') {
                showError(dob, dobError);
                isValid = false;
            } else {
                clearError(dob, dobError);
            }

            // Gender
            var genderSelected = document.querySelector('input[name="gender"]:checked');
            if (!genderSelected) {
                genderError.classList.add('visible');
                isValid = false;
            } else {
                genderError.classList.remove('visible');
            }

            // Photo
            if (photo.files.length === 0) {
                showError(photo, photoError);
                isValid = false;
            } else {
                clearError(photo, photoError);
            }

            // Terms
            if (!terms.checked) {
                termsError.classList.add('visible');
                isValid = false;
            } else {
                termsError.classList.remove('visible');
            }

            if (isValid) {
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
            }
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', function () {
                contactForm.reset();
                contactForm.style.display = 'block';
                formSuccess.style.display = 'none';

                document.querySelectorAll('.form-group input').forEach(function (input) {
                    input.classList.remove('error');
                });

                document.querySelectorAll('.error-message').forEach(function (el) {
                    el.classList.remove('visible');
                });
            });
        }
    }

    // ===== BMI CALCULATOR =====
    const calculateBtn = document.getElementById('calculate-bmi');
    const resetBmiBtn = document.getElementById('reset-bmi');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const bmiValue = document.getElementById('bmi-value');
    const bmiCategory = document.getElementById('bmi-category');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function () {
            var weight = parseFloat(weightInput.value);
            var height = parseFloat(heightInput.value);

            if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
                bmiValue.textContent = '--';
                bmiCategory.textContent = 'Please enter valid weight and height values';
                return;
            }

            var heightInMeters = height / 100;
            var bmi = weight / (heightInMeters * heightInMeters);
            bmi = Math.round(bmi * 10) / 10;

            bmiValue.textContent = bmi;

            var category = '';
            var color = '';

            if (bmi < 18.5) {
                category = 'Underweight';
                color = '#ffc107';
            } else if (bmi >= 18.5 && bmi <= 24.9) {
                category = 'Normal weight';
                color = '#43e97b';
            } else if (bmi >= 25 && bmi <= 29.9) {
                category = 'Overweight';
                color = '#ff8c42';
            } else {
                category = 'Obese';
                color = '#ff6b6b';
            }

            bmiCategory.textContent = 'Category: ' + category;
            bmiCategory.style.color = color;
            bmiValue.style.color = color;
        });
    }

    if (resetBmiBtn) {
        resetBmiBtn.addEventListener('click', function () {
            weightInput.value = '';
            heightInput.value = '';
            bmiValue.textContent = '--';
            bmiCategory.textContent = 'Enter your details above';
            bmiCategory.style.color = '';
            bmiValue.style.color = '';
        });
    }

    // ===== SET DEFAULT DATE OF BIRTH =====
    var dobInput = document.getElementById('dob');
    if (dobInput) {
        var maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 1);
        dobInput.setAttribute('max', maxDate.toISOString().split('T')[0]);
    }
});
