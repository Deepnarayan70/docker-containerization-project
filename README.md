🚀 Dockerized Next.js Application
📌 Project Overview
This project demonstrates containerizing a Next.js web application using Docker. It includes building a Docker image, running a container, and accessing the application through a local port.

🛠️ Tech Stack
Docker

Node.js

Next.js

Tailwind CSS

⚙️ Key Features
Containerized web application using Docker

Lightweight image using Node (Alpine)

Easy setup and execution

Port mapping for local access

Production-ready build

🐳 Docker Commands Used
🔹 Build Docker Image
docker build -t firecrawl-app .
🔹 Run Container
docker run -d -p 3000:3000 firecrawl-app
🔹 Check Running Containers
docker ps
🌐 Access Application
http://localhost:3000

📸 Screenshots
### 🔹 Docker Image Build
Docker Build
<img width="1914" height="1079" alt="Build Screenshot" src="https://github.com/user-attachments/assets/76a3aae9-086a-4edd-ba2f-4817a614599e" />


### 🔹 Running Container and Docker PS Output
<img width="1919" height="363" alt="run and docker ps screenshot" src="https://github.com/user-attachments/assets/87a8d16a-11a4-4c04-93d0-7ec19747ce1a" />


🎯 Learning Outcomes
Learned Docker basics

Built and ran Docker containers

Understood Dockerfile usage

Managed containers using CLI

👨‍💻 Author
Deep Narayan
B.Tech CSE Student

📄 License
This project is created for educational purposes.
