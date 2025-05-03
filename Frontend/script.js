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

    // Submit Project
    function submitProject() {
        const title = document.getElementById('project-title').value;
        const description = document.getElementById('project-description').value;
        const file = document.getElementById('project-file').files[0];

        if (title && description && file) {
            const project = {
                title: title,
                description: description,
                fileName: file.name
            };

            let projects = JSON.parse(localStorage.getItem('projects')) || [];
            projects.push(project);
            localStorage.setItem('projects', JSON.stringify(projects));
            document.getElementById('project-form').reset();
            loadProjects();
        } else {
            alert('Please fill in all fields and select a file.');
        }
    }

    // Load Projects
    function loadProjects() {
        const projectList = document.getElementById('submitted-projects');
        if (projectList) {
            projectList.innerHTML = '<h3>Submitted Projects</h3>';
            const projects = JSON.parse(localStorage.getItem('projects')) || [];
            projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.className = 'project';
                projectDiv.innerHTML = `
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <p><b>File:</b> ${project.fileName}</p>
                `;
                projectList.appendChild(projectDiv);
            });
        }
    }

    // Call the loadProfile() function if needed
    loadProfile();

    // Load projects when the page loads
    loadProjects();
});
