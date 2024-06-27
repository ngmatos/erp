# Base image
FROM node:14

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy remaining files
COPY . .

# Expose the app port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]