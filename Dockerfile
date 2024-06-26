FROM node:14

WORKDIR /app

# Copy the package files
COPY package*.json ./

# Set the ARG for GITHUB_TOKEN
ARG GITHUB_TOKEN

# Create .npmrc with the GITHUB_TOKEN
RUN echo "//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}" > .npmrc && \
    echo "@rob-long:registry=https://npm.pkg.github.com" >> .npmrc

# Copy the rest of the application files
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Expose port 80
EXPOSE 80

# Remove the .npmrc file
RUN rm .npmrc

# Start the application
CMD ["npm", "start"]