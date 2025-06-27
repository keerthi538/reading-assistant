# PDF Chat Analyzer

## Overview

This is a full-stack PDF document analysis application that allows users to upload PDF files and interact with them through an AI-powered chat interface. The application is built with a React frontend using shadcn/ui components and an Express.js backend, with PostgreSQL database integration using Drizzle ORM.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Build Tool**: Vite with hot module replacement

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: PostgreSQL sessions with connect-pg-simple
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Build Process**: ESBuild for production bundling

### Database Schema
- **Users Table**: Basic user management with username/password authentication
- **Schema Location**: `shared/schema.ts` for type sharing between frontend and backend
- **Migrations**: Managed through Drizzle Kit

## Key Components

### Frontend Components
1. **PDF Viewer**: Handles PDF file upload, display, and navigation
   - Drag-and-drop file upload
   - Zoom controls and page navigation
   - File validation (PDF only, 10MB limit)

2. **Chat Interface**: AI-powered document discussion
   - Real-time message exchange
   - Typing indicators
   - Message history with timestamps
   - Auto-scroll to latest messages

3. **Navigation Bar**: Application header with branding and settings

### Backend Components
1. **Storage Interface**: Abstracted data layer with in-memory fallback
   - User CRUD operations
   - Pluggable storage implementation
   - Currently using MemStorage for development

2. **Route System**: Express route registration with API prefix
   - Centralized error handling
   - Request/response logging
   - Development-friendly error messages

## Data Flow

1. **File Upload**: User uploads PDF through drag-and-drop or file picker
2. **Client-side Validation**: File type and size validation before processing
3. **Chat Interaction**: Users send messages about the document
4. **AI Processing**: Simulated AI responses (placeholder for actual AI integration)
5. **Real-time Updates**: Chat interface updates with new messages and typing states

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React with comprehensive Radix UI component library
- **Styling**: Tailwind CSS with custom theme configuration
- **State Management**: TanStack Query for server state synchronization
- **Date Handling**: date-fns for timestamp formatting
- **Form Handling**: React Hook Form with Zod validation

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with Zod schema validation
- **Session Storage**: PostgreSQL-based session management
- **Development Tools**: tsx for TypeScript execution in development

### Development Tools
- **Type Checking**: TypeScript with strict configuration
- **Build Tools**: Vite for frontend bundling, ESBuild for backend
- **Code Quality**: ESLint and Prettier (implied by component structure)
- **Development Experience**: Replit-specific plugins for enhanced development

## Deployment Strategy

### Development Environment
- **Dev Server**: Vite development server with HMR
- **Backend**: tsx for TypeScript execution with auto-restart
- **Database**: Environment-based DATABASE_URL configuration
- **Asset Serving**: Vite handles static assets and client-side routing

### Production Build
- **Frontend**: Vite builds to `dist/public` directory
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend assets
- **Database Migrations**: Drizzle Kit handles schema migrations

### Environment Configuration
- **Database**: PostgreSQL connection via DATABASE_URL
- **Sessions**: PostgreSQL-backed session storage
- **File Storage**: Currently client-side only (ready for server-side integration)

## Changelog

Changelog:
- June 27, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.