Blog Post Manager - README

#Project Description

#A simple blog post management application that allows users to:

View a list of blog posts
See detailed post content
Add new blog posts
Edit existing posts
Delete posts

#Features

Clean, responsive interface
Full CRUD functionality (Create, Read, Update, Delete)
Real-time post counter
Form validation for required fields

#Technologies Used
HTML5
CSS3
JavaScript (ES6)
JSON Server (for mock backend API)

#Installation

-git clone [repository-url]

-npm install -g json-server

-json-server --watch db.json

#Project Structure

blog-manager/
├── index.html # Main HTML file
├── index.js # All JavaScript functionality
├── db.json # Database file for JSON server
└── README.md # This documentation file

#Usage Instructions
-Viewing Posts

-Posts appear in the left sidebar

-Click any title to view full content in the detail panel

-Adding Posts

-Complete the form at the bottom

-Required fields: Title, Author, Content

-Image URL is optional

-Submit with "Add Blog" button

-Editing Posts

-Click "Edit" on any post's detail view

-Modify fields as needed

-Save changes or cancel

-Deleting Posts

-Click "Delete" on post detail view

-Confirm deletion in popup dialog

#Development Notes
Pure JavaScript implementation
Data persists via JSON Server
UI updates dynamically without page reloads

#License
MIT License - see LICENSE file for details

#Contact

For support or contributions, please contact:
Oliver Ekeno
oliver.ekeno@student.moringaschool.com
Project GitHub Issues
