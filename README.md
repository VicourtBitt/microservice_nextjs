# NextJS + MaterialUI Multi-Database Frontend

A modern, secure, and customizable frontend application built with Next.js and Material UI to interact with dual database backends (MongoDB and PostgreSQL). Designed for white-label deployments with robust security and containerized deployment.

## 🚀 Features

- **Dual Database Architecture**
  - MongoDB for configuration and document storage
  - PostgreSQL for metrics, analytics, and relational data
- **Modern Frontend Stack**
  - Next.js App Router for efficient rendering and routing
  - Material UI components with customizable theming
  - TypeScript for type safety
- **Comprehensive Security**
  - AES-GCM encryption for sensitive data
  - JWT authentication with secure token handling
  - Role-based access control
- **White-Label Customization**
  - Dynamic theming with persistent settings
  - Custom color palettes, typography, and layouts
  - Client-specific branding options
- **Containerized Deployment**
  - Docker and Docker Compose setup
  - Isolated environments for development and production
  - Simple scaling and deployment

## 🏗️ Architecture

```
frontend_nextjs/
├── src/
│   ├── app/             # Next.js App Router
│   ├── components/      # Reusable UI components
│   ├── theme/           # Theme configuration
│   ├── layout/          # Layout components
│   ├── services/        # Database and API services
│   │   ├── mongo/       # MongoDB connection and models
│   │   └── postgres/    # PostgreSQL connection and queries
│   └── utils/
│       ├── crypto.ts    # AES-GCM encryption utilities
│       └── auth.ts      # Authentication helpers
├── public/              # Static assets
└── docker/              # Docker configuration
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18.x or higher
- Docker and Docker Compose

### Local Development

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Docker Deployment

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f frontend
```

## 💾 Database Configuration

### MongoDB Connection

Used for storing:
- User configurations
- Document-based data
- Application settings

```typescript
// Example MongoDB connection
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('app_config');
```

### PostgreSQL Connection

Used for:
- Metrics and analytics
- Relational data
- Performance-critical queries

```typescript
// Example PostgreSQL connection
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URI,
});
```

## 🎨 White-Label Theming

The application supports dynamic theming for white-label customization:

- **Theme Modes**: Light/Dark mode toggle with persistent settings
- **Color Themes**: Multiple color schemes accessible through the theme drawer
- **Typography**: Custom font selection with various options
- **Client-Specific Branding**: Dynamic logo, favicon, and branding elements

## 🔐 Security Implementation

### AES-GCM Encryption

Sensitive data is encrypted using AES-GCM:

```typescript
// Example encryption usage
import { encrypt, decrypt } from '@/utils/crypto';

// Encrypt sensitive data
const encrypted = await encrypt(sensitiveData, secretKey);

// Decrypt when needed
const decrypted = await decrypt(encrypted, secretKey);
```

## 🐳 Docker Configuration

The application is containerized for consistent deployment across environments:

```yaml
# Example docker-compose.yml structure
version: '3'

services:
  frontend:
    build:
      context: ./frontend_nextjs
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongodb:27017/app_config
      - POSTGRES_URI=postgresql://postgres:5432/metrics
      
  mongodb:
    image: mongo
    volumes:
      - mongodb_data:/data/db
      
  postgres:
    image: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  mongodb_data:
  postgres_data:
```

## 📚 API Documentation

API endpoints are documented using Swagger/OpenAPI:
- Authentication API: `/api/auth`
- MongoDB data access: `/api/config`
- PostgreSQL metrics: `/api/metrics`

## 🛠️ Development Guidelines

- Use TypeScript for all new components and services
- Follow Material UI's theme specifications for consistent styling
- Implement proper error handling for database operations
- Keep security tokens and sensitive data in environment variables
- Run tests before submitting pull requests

## 📝 License

MIT

---

For questions or support, please contact the development team.