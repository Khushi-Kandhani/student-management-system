# Use Official Node.js Image (Alpine for smaller size)
FROM node:18-alpine

# Set Working Directory
WORKDIR /app

# Copy Package Files
COPY package*.json ./

# Install Dependencies
RUN npm install

# Copy Application Code
COPY . .

# Expose Port
EXPOSE 5000

# Health Check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000', (r) => {if (r.statusCode !== 200) throw new Error(r.statusCode)})"

# Start Server
CMD ["npm", "start"]
