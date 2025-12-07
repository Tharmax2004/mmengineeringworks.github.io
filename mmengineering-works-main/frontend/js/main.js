// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }

            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Update active nav link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos <= bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Initialize - Load saved data from localStorage
    loadProjects();
    loadPhotos();
    
    // Initialize Projects functionality
    initProjects();
    
    // Initialize Photos functionality
    initPhotos();
    
    // Initialize Contact form
    initContactForm();
});

// Projects functionality
let projects = JSON.parse(localStorage.getItem('projects')) || [];
let photos = JSON.parse(localStorage.getItem('photos')) || [];

// Initialize Projects
function initProjects() {
    // Project Modal
    const projectModal = document.getElementById('project-modal');
    const addProjectBtn = document.getElementById('add-project-btn');
    const closeProjectModal = document.getElementById('close-project-modal');
    const projectForm = document.getElementById('project-form');
    const projectImageInput = document.getElementById('project-image');
    const projectImagePreview = document.getElementById('project-image-preview');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!projectModal || !addProjectBtn || !closeProjectModal || !projectForm || !projectImageInput || !projectImagePreview || !projectsGrid) {
        console.error('Project elements not found');
        return;
    }

    // Open project modal
    addProjectBtn.addEventListener('click', function() {
        projectModal.style.display = 'block';
        projectForm.reset();
        projectImagePreview.innerHTML = '';
    });

    // Close project modal
    closeProjectModal.addEventListener('click', function() {
        projectModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === projectModal) {
            projectModal.style.display = 'none';
        }
    });

    // Project image preview
    projectImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                projectImagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Project form submission
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const imageFile = projectImageInput.files[0];

        if (!imageFile) {
            alert('Please select an image');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const project = {
                id: Date.now(),
                title: title,
                description: description,
                image: e.target.result,
                date: new Date().toLocaleDateString()
            };

            projects.push(project);
            localStorage.setItem('projects', JSON.stringify(projects));
            renderProjects();
            projectModal.style.display = 'none';
            projectForm.reset();
            projectImagePreview.innerHTML = '';
        };
        reader.readAsDataURL(imageFile);
    });
}

// Render projects
function renderProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    if (projects.length === 0) {
        projectsGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #666;">No projects added yet. Click "Add New Project" to get started.</p>';
        return;
    }

    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-actions">
                    <button class="btn btn-danger" onclick="deleteProject(${project.id})">Delete</button>
                </div>
            </div>
        `;
        projectsGrid.appendChild(projectCard);
    });
}

// Delete project
function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        projects = projects.filter(project => project.id !== id);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
    }
}

// Load projects from localStorage
function loadProjects() {
    renderProjects();
}

// Initialize Photos
function initPhotos() {
    const photoModal = document.getElementById('photo-modal');
    const uploadPhotoBtn = document.getElementById('upload-photo-btn');
    const closePhotoModal = document.getElementById('close-photo-modal');
    const photoForm = document.getElementById('photo-form');
    const photoImageInput = document.getElementById('photo-image');
    const photoImagePreview = document.getElementById('photo-image-preview');
    const photosGrid = document.getElementById('photos-grid');
    
    if (!photoModal || !uploadPhotoBtn || !closePhotoModal || !photoForm || !photoImageInput || !photoImagePreview || !photosGrid) {
        console.error('Photo elements not found');
        return;
    }

    // Open photo modal
    uploadPhotoBtn.addEventListener('click', function() {
        photoModal.style.display = 'block';
        photoForm.reset();
        photoImagePreview.innerHTML = '';
    });

    // Close photo modal
    closePhotoModal.addEventListener('click', function() {
        photoModal.style.display = 'none';
    });

    window.addEventListener('click', function(e) {
        if (e.target === photoModal) {
            photoModal.style.display = 'none';
        }
    });

    // Photo image preview
    photoImageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                photoImagePreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            };
            reader.readAsDataURL(file);
        }
    });

    // Photo form submission
    photoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const caption = document.getElementById('photo-caption').value;
        const imageFile = photoImageInput.files[0];

        if (!imageFile) {
            alert('Please select a photo');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const photo = {
                id: Date.now(),
                image: e.target.result,
                caption: caption || 'No caption',
                date: new Date().toLocaleDateString()
            };

            photos.push(photo);
            localStorage.setItem('photos', JSON.stringify(photos));
            renderPhotos();
            photoModal.style.display = 'none';
            photoForm.reset();
            photoImagePreview.innerHTML = '';
        };
        reader.readAsDataURL(imageFile);
    });
}

// Render photos
function renderPhotos() {
    const photosGrid = document.getElementById('photos-grid');
    if (!photosGrid) return;
    
    photosGrid.innerHTML = '';
    
    if (photos.length === 0) {
        photosGrid.innerHTML = '<p style="text-align: center; grid-column: 1/-1; color: #666;">No photos uploaded yet. Click "Upload Photo" to add photos.</p>';
        return;
    }

    photos.forEach(photo => {
        const photoItem = document.createElement('div');
        photoItem.className = 'photo-item';
        photoItem.innerHTML = `
            <img src="${photo.image}" alt="${photo.caption}">
            ${photo.caption !== 'No caption' ? `<div class="photo-caption">${photo.caption}</div>` : ''}
        `;
        photosGrid.appendChild(photoItem);
    });
}

// Load photos from localStorage
function loadPhotos() {
    renderPhotos();
}

// Initialize Contact form
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) {
        console.error('Contact form not found');
        return;
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('contact-name').value,
            email: document.getElementById('contact-email').value,
            phone: document.getElementById('contact-phone').value,
            message: document.getElementById('contact-message').value,
            date: new Date().toLocaleString()
        };

        // Save to localStorage (in a real app, this would be sent to a server)
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push(formData);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Handle logo image errors (fallback if image doesn't exist)
document.addEventListener('DOMContentLoaded', function() {
    const logoImages = document.querySelectorAll('#logo-img, #footer-logo-img');
    logoImages.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });

    // Handle background image error
    const homeSection = document.querySelector('.home-section');
    if (homeSection) {
        const bgImg = new Image();
        bgImg.src = '../public/home-bg.jpg';
        bgImg.onerror = function() {
            homeSection.style.backgroundImage = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        };
    }
});

