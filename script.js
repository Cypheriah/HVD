document.addEventListener('DOMContentLoaded', function() {
    const passwordInput = document.getElementById('password-input');
    const submitButton = document.getElementById('submit-password');
    const rosesContainer = document.getElementById('roses-container');
    const hintButton = document.getElementById('hint-button');
    const hintText = document.getElementById('hint-text');
    const messageButtons = document.querySelectorAll('.message-button');
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modal-message');
    const modalImage = document.getElementById('modal-image');
    const closeButton = document.querySelector('.close-button');
    const videoContainer = document.getElementById('video-container');
    const successVideo = document.getElementById('success-video');
    
    // Encrypted password (original: "sinigang")
    const encryptedPassword = "73696e6967616e67"; // "sinigang" in hexadecimal

    // Message button functionality
    messageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            const image = this.getAttribute('data-image');
            
            modalMessage.textContent = message;
            if (image && image !== "path/to/image1.jpg") {
                modalImage.src = image;
                modalImage.classList.remove('hidden');
            } else {
                modalImage.classList.add('hidden');
            }
            
            modal.style.display = 'block';
        });
    });

    // Close button functionality
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function createFloatingElement(type) {
        const element = document.createElement('div');
        element.className = type;
        if (type === 'heart') {
            element.textContent = '❤️';
            const size = 30 + Math.random() * 40;
            element.style.fontSize = `${size}px`;
        } else {
            const size = 40 + Math.random() * 60;
            element.style.width = `${size}px`;
            element.style.height = `${size}px`;
        }
        element.style.position = 'fixed';
        element.style.left = `${Math.random() * 100}vw`;
        element.style.top = `${Math.random() * 100}vh`;
        return element;
    }
    
    function showRoseAnimation() {
        rosesContainer.innerHTML = '';
        rosesContainer.style.display = 'block';

        // Create hearts and roses animation
        for (let i = 0; i < 300; i++) {
            const element = i % 2 === 0 ? createFloatingElement('heart') : createFloatingElement('rose');
            rosesContainer.appendChild(element);
        }

        // Animate elements
        const elements = rosesContainer.children;
        Array.from(elements).forEach((element, index) => {
            const delay = index * 20;
            const duration = 1500 + Math.random() * 1000;
            
            element.style.transition = `all ${duration}ms ease-out`;
            element.style.opacity = '0';
            element.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 1000 + 500}px) rotate(${Math.random() * 360}deg)`;
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translate(0, 0) rotate(0deg)';
            }, delay);
        });

        // Show and play video after rose animation
        setTimeout(() => {
            videoContainer.classList.remove('hidden');
            successVideo.play();
        }, 2000);

        // Clean up roses after video starts
        setTimeout(() => {
            rosesContainer.style.display = 'none';
            rosesContainer.innerHTML = '';
        }, 3000);
    }

    // Password check with encryption
    function checkPassword() {
        const inputValue = passwordInput.value.toLowerCase();
        const encryptedInput = stringToHex(inputValue);
        
        if (encryptedInput === encryptedPassword) {
            showRoseAnimation();
            passwordInput.value = '';
            hintText.classList.add('hidden');
            hintButton.textContent = 'Need a hint?';
        } else {
            passwordInput.style.borderColor = '#ff0000';
            setTimeout(() => {
                passwordInput.style.borderColor = '#ff6f91';
            }, 1000);
        }
    }

    // Convert string to hexadecimal
    function stringToHex(str) {
        let hex = '';
        for(let i = 0; i < str.length; i++) {
            hex += str.charCodeAt(i).toString(16);
        }
        return hex;
    }

    // Event listeners
    submitButton.addEventListener('click', checkPassword);
    passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkPassword();
        }
    });

    // Hint functionality
    hintButton.addEventListener('click', function() {
        if (hintText.classList.contains('hidden')) {
            hintText.classList.remove('hidden');
            hintButton.textContent = 'Hide hint';
        } else {
            hintText.classList.add('hidden');
            hintButton.textContent = 'Need a hint?';
        }
    });

    // Add video end event listener
    successVideo.addEventListener('ended', function() {
        videoContainer.classList.add('hidden');
    });

    // Add click event to close video
    videoContainer.addEventListener('click', function(e) {
        if (e.target === videoContainer) {
            videoContainer.classList.add('hidden');
            successVideo.pause();
            successVideo.currentTime = 0;
        }
    });
});
