// DOM Elements
const postList = document.getElementById('post-list');
const postDetail = document.getElementById('post-detail');
const blogForm = document.getElementById('blog-form');
const counter = document.querySelector('.counter');

//Decaring API for accessibility
const API = 'https://blog-post-u9bd.onrender.com/Blogs';


// Main function
function main() {
    fetchBlogs();
    setupEventListeners();
}

//fetchBlog function
function fetchBlogs() {
    fetch(API)
        .then(res => res.json())
        .then(renderBlogList)
        .catch(error => console.error('Error fetching blogs:', error));
}

//renderBlogList function
function renderBlogList(blogs) {
    if (blogs.length === 0) {
        postList.innerHTML += '<p>No blogs yet. Please Add blogs!</p>';
        counter.textContent = '0';
        return;
    }

    postList.innerHTML = '';
    const header = document.createElement('div');
    header.className = 'blogs-header';
    header.innerHTML = `
        <h2>My Blogs</h2>
        <div class="counter">${blogs.length}</div>
    `;
    postList.appendChild(header);

    blogs.forEach(blog => {
        const blogTitle = document.createElement('div');
        blogTitle.className = 'blog-title';
        blogTitle.textContent = blog.title;
        blogTitle.addEventListener('click', () => showBlogDetail(blog.id));
        postList.appendChild(blogTitle);
    });
}

// showBlogDetail function
function showBlogDetail(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(blog => {
            postDetail.innerHTML = `
                <div class="blog-detail">
                    <h2>${blog.title}</h2>
                    <p class="author">By: ${blog.author}</p>
                    ${blog.image ? `<img src="${blog.image}" alt="${blog.title}">` : ''}
                    <div class="content">${blog.content}</div>
                    <div class="blog-actions">
                        <button onclick="showEditForm(${blog.id})">Edit</button>
                        <button onclick="deleteBlog(${blog.id})">Delete</button>
                    </div>
                </div>
            `;
        })
        .catch(error => console.error('Error fetching blog details:', error));
}

// showEditForm function
function showEditForm(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(blog => {
            postDetail.innerHTML = `
                <form onsubmit="updateBlog(event, ${id})">
                    <h3>Edit Blog</h3>
                    <div>
                        <label>Title:</label>
                        <input type="text" name="title" value="${blog.title}" required>
                    </div>
                    <div>
                        <label>Author:</label>
                        <input type="text" name="author" value="${blog.author}" required>
                    </div>
                    <div>
                        <label>Image URL:</label>
                        <input type="text" name="image" value="${blog.image || ''}">
                    </div>
                    <div>
                        <label>Content:</label>
                        <textarea name="content" required>${blog.content}</textarea>
                    </div>
               
                </form>
            `;
        });
}

// updateBlog function
function updateBlog(event, id) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const updatedBlog = Object.fromEntries(formData);

    fetch(`${API}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog)
    })
    .then(() => {
        fetchBlogs();
        showBlogDetail(id);
    })
    .catch(error => console.error('Error updating blog:', error));
}

// deleteBlog function
function deleteBlog(id) {
    if (confirm('Are you sure you want to delete this blog?')) {
        fetch(`${API}/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            fetchBlogs();
            postDetail.innerHTML = '<p>Select a blog from the list to view details</p>';
        })
        .catch(error => console.error('Error deleting blog:', error));
    }
}

// addBlog function
function addBlog(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newBlog = Object.fromEntries(formData);

    if (!newBlog.title || !newBlog.author || !newBlog.content) {
        alert('Title, author, and content are required!');
        return;
    }

    fetch(API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlog)
    })
    .then(() => {
        fetchBlogs();
        event.target.reset();
    })
    .catch(error => console.error('Error adding blog:', error));
}

// form evnt listenter
function setupEventListeners() {
    blogForm.addEventListener('submit', addBlog);
}
//when the DOM is loaded its initialized
document.addEventListener('DOMContentLoaded', main);
