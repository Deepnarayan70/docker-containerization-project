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