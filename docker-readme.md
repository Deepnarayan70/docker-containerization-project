# Docker Setup Guide (Hinglish)

Ye guide step-by-step batayegi ki **FireCrawl** project ko Docker ke through easily kaise setup karein.

## 🚀 Steps to Setup

### 1. Clone the Repository
Sabse pehle, project ki repository ko apne local machine par clone karlo:
```bash
git clone https://github.com/Bhanu-partap-13/FireCrawl
cd FireCrawl
```

### 2. Install Docker Desktop
Agar tumhare PC mein Docker nahi hai, toh pehle [Docker Desktop](https://www.docker.com/products/docker-desktop/) download aur install karlo. 

### 3. Create `Dockerfile`
Project folder mein ek naya file banao jiska naam `Dockerfile` (bina kisi extension ke) ho. Is file mein ye niche diya gaya code paste kardo:

```dockerfile
# Step 1: base image
FROM node:18-alpine

# Step 2: working directory
WORKDIR /app

# Step 3: copy package files
COPY package.json package-lock.json* ./

# Step 4: install dependencies
RUN npm install

# Step 5: copy all files
COPY . .

# Step 6: build app
RUN npm run build

# Step 7: expose port
EXPOSE 3000

# Step 8: start app
CMD ["npm", "start"]
```

### 4. Create `.dockerignore`
Docker image banate waqt kuch faltu files copy na ho jayein, uske liye ek `.dockerignore` file banao aur ye contents usme daalo:

```text
node_modules
.next
.git
.gitignore
Dockerfile
npm-debug.log
```

### 5. Setup Environment Variables
App ko run karne se pehle env setup krlena. 
1. FireCrawl ki website par jake apni API key lelo.
2. Apne project mein ek nayi file banao `.env.local`.
3. Usme apni API key paste kardo.

### 6. Build the Docker Image
Ab terminal open karo aur ye command run karo:
```bash
docker build -t my-app .
```
Ye command tumhare project ki image banayega.

### 7. Run the Docker Container
Image banne ke baad, container banane aur chalane ke liye ye command chalao:
```bash
docker run -d -p 3000:3000 my-app
```
Ye ek container banayega. Uske baad `npm run dev` wagera mat karo.

### 8. Test Your App
Bas simply apne browser pe local par jao:
👉 **[http://localhost:3000](http://localhost:3000)**

Isse check karo ki browser pe theek se chal raha hai ya nahi. Agar nahi chal raha, toh tumne koi galti ki hai.

### 9. Take Required Screenshots
Agar app sahi se chal raha hai, toh terminal mein ye commands run karke **3 screenshots** lelo:
1. Chalte hue container dekhne ke liye:
   ```bash
   docker ps
   ```
2. Container ke logs check karne ke liye (`<container_id>` ko apne actual container id se replace karo):
   ```bash
   docker logs <container_id>
   ```
3. Ye image build command chala ke screenshot lene ke liye:
   ```bash
   docker build -t startup-tracker .
   ```

### 10. Wrap Up!
Sab steps complete hone ke baad, apne code ko Git par push kar dena aur uske baad apne Docker container ko stop kar skte ho:
```bash
docker stop <container_id>
```

Happy Coding! 🎉
