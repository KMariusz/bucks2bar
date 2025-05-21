# bucks2bar Project

## Overview
Bucks2Bar is a web application for visualizing and comparing monthly income and expenses. It features a responsive Bootstrap UI, interactive bar charts (Chart.js), and options to download or email your chart. The backend supports both Node.js (Express) and Python (FastAPI) servers for sending chart images via email.

## Project Structure
```
bucks2bar
├── src
│   ├── index.html             # Main HTML document
│   ├── css/
│   │   └── styles.css         # Custom styles
│   ├── js/
│   │   ├── main.js            # Frontend JavaScript logic
│   │   ├── main.test.js       # Jest unit tests for username validation
│   │   └── server.js          # Node.js Express backend (email API)
│   └── py/
│       └── server.py          # Python FastAPI backend (email API)
├── .gitignore
├── package.json
└── README.md
```

## Features
- Responsive design using Bootstrap
- Interactive bar chart (Chart.js + chartjs-plugin-datalabels)
- Input validation for usernames (with Jest tests)
- Download chart as PNG
- Email chart as PNG (via backend API)
- Two backend options: Node.js (Express + Nodemailer) or Python (FastAPI + smtplib)

## Setup Instructions

### 1. Clone the repository
```sh
git clone <repository-url>
cd bucks2bar
```

### 2. Install dependencies (for Node.js backend)
```sh
npm install
```

### 3. Run the Node.js backend (optional)
```sh
node src/js/server.js
# or use nodemon for auto-reload
```

### 4. Run the Python backend (optional, requires Python 3.8+ and FastAPI)
```sh
pip install fastapi uvicorn pydantic
cd src/py
uvicorn server:app --reload --port 3000
```

### 5. Open the frontend
Open `src/index.html` in your web browser.

## Email Sending Configuration

- **Node.js:** Edit SMTP credentials in [`src/js/server.js`](src/js/server.js).
- **Python:** Edit SMTP credentials in [`src/py/server.py`](src/py/server.py).

## Testing

Run Jest unit tests for username validation:
```sh
npm test
```

## Contributing
Feel free to submit issues or pull requests for improvements and bug fixes.

---