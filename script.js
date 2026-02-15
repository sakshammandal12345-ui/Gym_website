// Smooth scrolling and navigation
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });

    // Smooth scroll for all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            navMenu.classList.remove('active');
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });

    // CTA buttons scroll to contact
    const ctaButtons = document.querySelectorAll('.cta-button.primary, .join-btn-nav');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('#contact').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Secondary CTA scrolls to services
    const secondaryCta = document.querySelector('.cta-button.secondary');
    if (secondaryCta) {
        secondaryCta.addEventListener('click', () => {
            document.querySelector('#services').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Active navigation state
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.service-card, .benefit-card, .about-feature, .info-card');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Check if element is already revealed to avoid re-triggering or blocking hover
            if (element.getAttribute('data-revealed') === 'true') return;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
                element.setAttribute('data-revealed', 'true');
                
                // Clear inline transform after animation to allow CSS hover effects
                setTimeout(() => {
                    element.style.transform = '';
                    // Keep transition for hover effects
                    element.style.transition = 'all 0.4s ease'; 
                }, 600);
            }
        });
    };

    // Initialize elements as hidden
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Animated counter for stats
    const animateCounter = (element, target, duration = 2000) => {
        let start = 0;
        const increment = target / (duration / 16);
        
        const updateCounter = () => {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    };

    // Trigger counter animation when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = document.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const hero = document.querySelector('.hero');
    if (hero) heroObserver.observe(hero);

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            phone: contactForm.querySelector('input[type="tel"]').value,
            message: contactForm.querySelector('textarea').value
        };
        
        // Success message
        const submitBtn = contactForm.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
            contactForm.reset();
        }, 3000);
        
        console.log('Form submitted:', formData);
    });



    // Parallax effect for hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const heroBg = document.querySelector('.hero-bg');
        
        if (heroContent && heroBg) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button, .cta-button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple-effect');
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        button, .cta-button {
            position: relative;
            overflow: hidden;
        }
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
    `;
    document.head.appendChild(style);

    // Smart Typewriter Effect
    const typeWriterEffect = (element, speed = 30, startDelay = 0) => {
        if (!element) return;
        
        // Clone the structure to read from
        const originalContent = element.innerHTML;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = originalContent;
        
        // Clear the element
        element.innerHTML = '';
        element.style.visibility = 'visible';
        
        const queue = [];
        
        const traverse = (node, parentContext) => {
            if (node.nodeType === Node.TEXT_NODE) {
                const text = node.textContent;
                // Treat newlines/extra spaces as single space or ignore if purely whitespace-formatting
                // But for typewriter, we want to preserve exactly what's visible.
                
                for (let i = 0; i < text.length; i++) {
                    queue.push({
                        type: 'char',
                        char: text[i],
                        parent: parentContext
                    });
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName;
                const newEl = document.createElement(tagName);
                Array.from(node.attributes).forEach(attr => {
                    newEl.setAttribute(attr.name, attr.value);
                });
                
                queue.push({
                    type: 'element',
                    element: newEl,
                    parent: parentContext
                });
                
                node.childNodes.forEach(child => traverse(child, newEl));
            }
        };
        
        Array.from(tempDiv.childNodes).forEach(child => traverse(child, element));
        
        let i = 0;
        const processQueue = () => {
            if (i >= queue.length) return;
            
            const action = queue[i];
            i++;
            
            if (action.type === 'char') {
                 if (action.parent.lastChild && action.parent.lastChild.nodeType === Node.TEXT_NODE) {
                    action.parent.lastChild.nodeValue += action.char;
                } else {
                    action.parent.appendChild(document.createTextNode(action.char));
                }
                setTimeout(processQueue, speed);
            } else if (action.type === 'element') {
                action.parent.appendChild(action.element);
                processQueue(); 
            }
        };
        
        setTimeout(processQueue, startDelay);
    };

    // Initialize Typewriter
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('hero-title')) {
                   typeWriterEffect(entry.target, 50, 0);
                } else if (entry.target.classList.contains('hero-subtitle')) {
                   typeWriterEffect(entry.target, 20, 2500); 
                } else if (entry.target.classList.contains('section-title')) {
                    typeWriterEffect(entry.target, 40, 0);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    if (title) {
        title.style.visibility = 'hidden';
        observer.observe(title); 
    }
    if (subtitle) {
        subtitle.style.visibility = 'hidden';
        observer.observe(subtitle);
    }

    // Observe all section titles
    document.querySelectorAll('.section-title').forEach(sectionTitle => {
        sectionTitle.style.visibility = 'hidden';
        observer.observe(sectionTitle);
    });

    console.log('🌹 Perfect Health Fitness - Website Loaded Successfully!');
    console.log('All interactive features initialized');

    // BMI Widget Logic
    const bmiToggleBtn = document.querySelector('.bmi-toggle-btn');
    const bmiModal = document.querySelector('.bmi-modal');
    const bmiClose = document.querySelector('.bmi-close');
    const bmiForm = document.getElementById('bmi-form');
    const bmiMessages = document.getElementById('bmi-messages');
    const bmiResetBtn = document.querySelector('.bmi-reset-btn');
    const bmiCalculateBtn = document.querySelector('.bmi-calculate-btn');

    if (bmiToggleBtn && bmiModal) {
        // Toggle Modal
        bmiToggleBtn.addEventListener('click', () => {
            bmiModal.classList.toggle('active');
            if (bmiModal.classList.contains('active')) {
                document.getElementById('bmi-height').focus();
            }
        });

        bmiClose.addEventListener('click', () => {
            bmiModal.classList.remove('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!bmiWidget.contains(e.target) && bmiModal.classList.contains('active')) {
                // Check if click is not on the toggle button
                if (!bmiToggleBtn.contains(e.target)) {
                    bmiModal.classList.remove('active');
                }
            }
        });

        // Calculate BMI
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const height = parseFloat(document.getElementById('bmi-height').value);
            const weight = parseFloat(document.getElementById('bmi-weight').value);
            const age = parseFloat(document.getElementById('bmi-age').value);
            const gender = document.getElementById('bmi-gender').value;
            
            if (height && weight && age) {
                // Add user message
                addMessage(`H: ${height}cm, W: ${weight}kg, Age: ${age}, ${gender}`, 'user');
                
                // Disable form temporarily
                bmiCalculateBtn.disabled = true;
                bmiCalculateBtn.textContent = 'Analyzing...';
                
                setTimeout(() => {
                    const heightInM = height / 100;
                    const bmi = (weight / (heightInM * heightInM)).toFixed(1);
                    
                    // Body Fat Calculation (Deurenberg formula)
                    // Adult body fat % = (1.20 × BMI) + (0.23 × Age) − (10.8 × Sex) − 5.4
                    // Sex: 1 for men, 0 for women
                    const sexFactor = gender === 'male' ? 1 : 0;
                    const bodyFat = ((1.20 * bmi) + (0.23 * age) - (10.8 * sexFactor) - 5.4).toFixed(1);
                    
                    let category = '';
                    let color = '';
                    let dietTip = '';
                    let workoutTip = '';
                    
                    if (bmi < 18.5) {
                        category = 'Underweight';
                        color = '#ff9800'; // Orange
                        dietTip = 'Focus on nutrient-dense foods. Increase calorie intake with healthy fats, proteins, and complex carbs.';
                        workoutTip = 'Prioritize strength training to build muscle mass. Limit excessive cardio.';
                    } else if (bmi >= 18.5 && bmi < 25) {
                        category = 'Normal Weight';
                        color = '#4caf50'; // Green
                        dietTip = 'Maintain a balanced diet rich in vegetables, lean proteins, and whole grains.';
                        workoutTip = 'Mix cardio and strength training for overall fitness and longevity.';
                    } else if (bmi >= 25 && bmi < 30) {
                        category = 'Overweight';
                        color = '#ff9800'; // Orange
                        dietTip = 'Create a slight caloric deficit. Focus on portion control and high-fiber foods.';
                        workoutTip = 'Increase daily activity. Aim for 150 mins of moderate cardio per week.';
                    } else {
                        category = 'Obese';
                        color = '#f44336'; // Red
                        dietTip = 'Consult a nutritionist. Focus on whole foods and reducing processed sugars.';
                        workoutTip = 'Start with low-impact activities like walking or swimming. Consistency is key.';
                    }
                    
                    const resultMessage = `
                        <div style="border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 8px;">
                            <strong>Analysis Result:</strong><br>
                            BMI: <strong>${bmi}</strong> <span style="color: ${color};">(${category})</span><br>
                            Est. Body Fat: <strong>${bodyFat}%</strong>
                        </div>
                        <div style="font-size: 0.9em; line-height: 1.4;">
                            <strong>🥗 Diet Tip:</strong><br>${dietTip}<br><br>
                            <strong>🏋️ Chat Suggestion:</strong><br>${workoutTip}
                        </div>
                    `;
                    
                    addMessage(resultMessage, 'bot');
                    
                    // Show reset button
                    bmiCalculateBtn.style.display = 'none';
                    bmiResetBtn.style.display = 'block';
                    
                    // Scroll to bottom
                    bmiMessages.scrollTop = bmiMessages.scrollHeight;
                }, 1500);
            }
        });

        bmiResetBtn.addEventListener('click', () => {
            bmiForm.reset();
            bmiMessages.innerHTML = `
                <div class="message bot">
                    <p>Hi! I can help you check your Body Mass Index (BMI). Let's start! 👇</p>
                </div>
            `;
            bmiCalculateBtn.style.display = 'block';
            bmiResetBtn.style.display = 'none';
            bmiCalculateBtn.disabled = false;
            bmiCalculateBtn.textContent = 'Calculate';
        });

        function addMessage(html, type) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message ${type}`;
            msgDiv.innerHTML = `<p>${html}</p>`;
            bmiMessages.appendChild(msgDiv);
            bmiMessages.scrollTop = bmiMessages.scrollHeight;
        }
        
        // Define widget container for click-outside check
        var bmiWidget = document.querySelector('.bmi-widget-container');
    }

    // Review Widget Logic
    const reviewToggleBtn = document.querySelector('.review-toggle-btn');
    const reviewModal = document.querySelector('.review-modal');
    const reviewClose = document.querySelector('.review-close');
    const reviewForm = document.getElementById('review-form');
    const reviewsList = document.getElementById('reviews-list');
    const bicepRatingContainer = document.getElementById('bicep-rating');
   
    if (reviewToggleBtn && bicepRatingContainer) {
        const biceps = bicepRatingContainer.querySelectorAll('.bicep');
        const selectedRatingInput = document.getElementById('selected-rating');

        // Toggle Modal
        reviewToggleBtn.addEventListener('click', () => {
            reviewModal.classList.toggle('active');
        });

        reviewClose.addEventListener('click', () => {
            reviewModal.classList.remove('active');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            const container = document.querySelector('.review-widget-container');
            if (container && !container.contains(e.target) && reviewModal.classList.contains('active')) {
                 if (!reviewToggleBtn.contains(e.target)) {
                    reviewModal.classList.remove('active');
                }
            }
        });

        // Rating Logic (Biceps)
        biceps.forEach(bicep => {
            bicep.addEventListener('click', () => {
                const value = bicep.getAttribute('data-value');
                selectedRatingInput.value = value;
                updateRatingDisplay(value);
                
                // Trigger Flex Animation
                bicep.classList.remove('flexing');
                void bicep.offsetWidth; // Trigger reflow
                bicep.classList.add('flexing');
            });
        });

        function updateRatingDisplay(rating) {
            biceps.forEach(b => {
                const bValue = parseInt(b.getAttribute('data-value'));
                if (bValue <= parseInt(rating)) {
                    b.classList.add('active');
                    b.style.filter = 'none';
                    b.style.opacity = '1';
                } else {
                    b.classList.remove('active');
                    b.classList.remove('flexing');
                    b.style.filter = 'grayscale(100%)';
                    b.style.opacity = '0.5';
                    b.style.transform = 'scale(1)';
                }
            });
        }

        // Initialize with 5 stars (all active)
        updateRatingDisplay(5);

        // Initial Mock Reviews
        const initialReviews = [
            { name: "John Doe", text: "Amazing facility! The trainers are top-notch.", rating: 5 },
            { name: "Sarah Smith", text: "Love the new diet plans. Really helped me.", rating: 5 },
            { name: "Mike Ross", text: "Great equipment, clean environment.", rating: 4 }
        ];

        function renderReview(review, isNew = false) {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = `single-review ${isNew ? 'new' : ''}`;
            
            let ratingHtml = '';
            for(let i=0; i<review.rating; i++) {
                ratingHtml += '💪';
            }

            reviewDiv.innerHTML = `
                <div class="review-author">
                    <span>${review.name}</span>
                    <span class="review-rating">${ratingHtml}</span>
                </div>
                <div class="review-content">${review.text}</div>
            `;
            return reviewDiv;
        }

        // Load initial reviews
        initialReviews.forEach(review => {
            reviewsList.appendChild(renderReview(review));
        });

        // Simple Confetti
        function fireConfetti() {
            const colors = ['#f44336', '#2196f3', '#ffeb3b', '#4caf50', '#ff9800'];
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.top = '-10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
                confetti.style.opacity = Math.random();
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 5000);
            }
        }

        // Handle Form Submission
        reviewForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('reviewer-name').value;
            const text = document.getElementById('review-text').value;
            const rating = parseInt(selectedRatingInput.value);
            
            if(name && text) {
                const newReview = { name, text, rating };
                const reviewElement = renderReview(newReview, true);
                reviewsList.insertBefore(reviewElement, reviewsList.firstChild);
                
                // Celebration for high ratings
                if (rating >= 4) {
                    fireConfetti();
                }

                // Reset form
                reviewForm.reset();
                updateRatingDisplay(5);
                selectedRatingInput.value = 5;
                
                // Scroll to top
                reviewsList.scrollTop = 0;
            }
        });
    }

});