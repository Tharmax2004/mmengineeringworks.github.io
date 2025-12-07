# MM Engineering Works - Company Website

A modern, responsive website for MM Engineering Works with project management, photo gallery, and contact functionality.

## Features

- **Home Section**: Hero section with background image
- **Projects Section**: Upload, view, and delete projects with images and descriptions
- **About Section**: Company information and services
- **Photos Section**: Photo gallery with upload functionality
- **Contact Us Section**: Contact form and company information

## File Structure

```
frontend/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Stylesheet
├── js/
│   └── main.js         # JavaScript functionality
└── public/
    ├── logo.png        # Company logo (add your logo here)
    └── home-bg.jpg     # Home background image (add your image here)
```

## How to Run on Localhost

### Method 1: Using Python (Recommended)

1. Open terminal/command prompt in the `frontend` folder
2. Run one of these commands:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

3. Open your browser and go to: `http://localhost:8000`

### Method 2: Using the provided server script

**Windows:**
- Double-click `start-server.bat`

**Mac/Linux:**
```bash
python3 server.py
```

### Method 3: Using Node.js (http-server)

1. Install http-server globally (if not already installed):
```bash
npm install -g http-server
```

2. Navigate to the `frontend` folder and run:
```bash
http-server -p 8000
```

3. Open your browser and go to: `http://localhost:8000`

### Method 4: Using VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## Adding Images

1. **Logo**: Place your company logo as `public/logo.png`
2. **Background Image**: Place your home background image as `public/home-bg.jpg`

The website will work without these images, but they enhance the visual appeal.

## Features Explained

### Projects Section
- Click "Add New Project" to upload a new project
- Fill in project title, upload image, and add description
- Click "Delete" on any project card to remove it
- All projects are saved in browser localStorage

### Photos Section
- Click "Upload Photo" to add photos to the gallery
- Optionally add a caption for each photo
- Photos are displayed in a responsive grid
- All photos are saved in browser localStorage

### Contact Form
- Fill in the contact form to send a message
- Form data is saved in browser localStorage
- In a production environment, this would connect to a backend server

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All data is stored in browser localStorage (client-side only)
- For production use, integrate with a backend API
- Images are stored as base64 strings in localStorage (limited storage)
- For production, implement proper file upload to a server

