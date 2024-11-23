

# Word-to-PDF Conversion Web Application  

This is a MERN stack application that processes Word documents (`.docx`) and converts them to PDF. Users can upload `.docx` files, view file metadata, and download the converted PDF.

---

## Features  

- Upload `.docx` files and convert them to PDF.  
- View file metadata upon upload.  
- Download the generated PDF.  
- Dockerized application for easy deployment.  
- Kubernetes manifests to host the web server.  
- Includes a basic React-based frontend.  

---

## Tech Stack  

### Backend Dependencies  

The backend is built with Node.js and Express.js, and it includes the following dependencies:  

- **axios**: For HTTP requests.  
- **cloudinary**: For file storage and processing.  
- **cors**: For Cross-Origin Resource Sharing.  
- **dotenv**: For environment variable management.  
- **express**: For building the REST API.  
- **libreoffice-convert**: For converting `.docx` to PDF.  
- **mammoth**: For reading `.docx` files and extracting clean text.  
- **mongoose**: For MongoDB database connection.  
- **nodemon**: For development convenience (auto-restarting server).  
- **uuid**: For generating unique identifiers.  

### Frontend  

The frontend is implemented using React.js and provides a simple interface for interacting with the application.  

---

## Project Structure  

```
.
├── backend/  
│   ├── config/              # Configuration files  
│   ├── controllers/         # Business logic controllers  
│   ├── routes/              # API route handlers  
│   ├── .env                 # Environment variables  
│   ├── Dockerfile           # Backend Dockerfile  
│   ├── package.json         # Node.js dependencies  
│   └── server.js            # Entry point for the backend server  
│  
├── frontend/  
│   ├── src/                 # React components  
│   └── .gitignore           # Ignore unnecessary files in Git  
│  
├── k8s-manifest.yaml        # Kubernetes manifest file  
├── Docker-compose.yaml      # Docker Compose file for orchestration  
└── run-containers.sh        # Script to start containers  
```  

---

## Setup Instructions  

### Prerequisites  

Ensure you have the following installed:  
- Node.js (v16 or later)  
- Docker and Docker Compose  
- Kubernetes (minikube or any other cluster setup)  

### Running Locally  

1. **Clone the Repository:**  
   ```bash  
   git clone <repository-url>  
   cd <repository-folder>  
   ```  

2. **Backend Setup:**  
   - Navigate to the `backend/` directory.  
   - Install dependencies:  
     ```bash  
     npm install  
     ```  
   - Create a `.env` file in the `backend/` directory and add the required environment variables.  
   - Start the backend server:  
     ```bash  
     npm start  
     ```  

3. **Frontend Setup:**  
   - Navigate to the `frontend/` directory.  
   - Install dependencies:  
     ```bash  
     npm install  
     ```  
   - Start the development server:  
     ```bash  
     npm start  
     ```  

4. **Access the Application:**  
   Open `http://localhost:3000` in your browser.  

---

## Deployment  

### Docker  

1. Build and run the Docker containers:  
   ```bash  
   docker-compose up --build  
   ```  

2. Access the application at the exposed port (usually `http://localhost:3000`).  

### Kubernetes  

1. Apply the Kubernetes manifest:  
   ```bash  
   kubectl apply -f k8s-manifest.yaml  
   ```  

2. Ensure the pods and services are running:  
   ```bash  
   kubectl get pods  
   kubectl get svc  
   ```  

3. Access the application through the exposed service.  

---

]

  

