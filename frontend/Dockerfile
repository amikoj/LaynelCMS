# It is used to build the frontend container image for LaynelCMS  according to nextjs
# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose port 3000 to the outside world 
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]

