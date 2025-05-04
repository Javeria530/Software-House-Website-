// api.js
const API_URL = '/api';

// User registration
async function registerUser(userData) {
    try {
        const response = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

// User login
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

// Send contact message
async function sendContact(contactData) {
    try {
        const response = await fetch(`${API_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Contact error:', error);
        throw error;
    }
}

// Submit project (requires authentication)
async function submitProject(projectData) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(projectData)
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Project submission error:', error);
        throw error;
    }
}

// Get user projects
async function getUserProjects() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/projects`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
}