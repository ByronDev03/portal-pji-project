<h1 align="center">Portal PJI</h1>

Full-stack web application for a policy subscription platform, handling customer onboarding, identity verification, and payment processing, built with Angular and a Node.js backend using Express.js and TypeScript, with TypeORM and MySQL, containerized with Docker and deployed on AWS EC2.

## Overview

Portal PJI is a platform designed to manage customer registration, identity verification, and payment processing for insurance-related services. It provides a structured workflow from onboarding to payment validation.

## Tech Stack

**Frontend**
- Angular

**Backend**
- Node.js
- Express.js
- TypeScript

**Database**
- MySQL
- TypeORM

**DevOps**
- Docker
- AWS EC2

## Architecture

The application follows a layered architecture:
- Frontend (Angular) for user interaction
- Backend (Node.js + Express.js) fro API and business logic
- Database (MySQL) fro persistent storage
- Docker for containerization
- AWS EC2 for deployment

## Project Structure

The project is organized into separate modules:

**Frontend** → [View documentation](./frontend)
Handles user interaction, including onboarding, plan selection, and payment flows.  

**Backend** → [View documentation](./backend)
Provides REST APIs, business logic, and integrations for verification and payments.  

**Database** → [View documentation](./database)
Manages persistent data with a relational schema designed for scalability.  

## Features

- Customer registration and management
- Identity verification workflow
- Payment processing and tracking
- Session management
- REST API integration

## Getting Started

**Run with Docker**
```bash
docker-compose up --build
```

### Local Development

**Backend**
```Bash
cd backend
npm install
npm run dev
```

**Frontend**
```Bash
cd frontend
npm install
ng serve
```

## Deployment

The application is containerized using Docker and deployed on AWS EC2.

## Author

Byron Jorge Ortega Cuenca