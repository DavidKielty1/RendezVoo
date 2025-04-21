# RendezVoo - Social Meetup Platform

![RendezVoo Screenshot](public/screenshot.png)

## Overview

RendezVoo is a modern social platform that connects people through shared hobbies and interests. Built with cutting-edge web technologies, it demonstrates full-stack development capabilities with a focus on user experience, performance, and scalability.

**Live Demo:** [rendezvoo.vercel.app](https://rendezvoo.vercel.app)

## Technical Stack

### Frontend
- **Next.js 14.2.25** - React framework with server-side rendering
- **TypeScript 5.1.6** - Type-safe development
- **Tailwind CSS 3.3.5 & DaisyUI 2.52.0** - Modern, responsive UI components
- **Mapbox GL 1.13.3** - Interactive mapping and location services
- **React Query 4.36.1** - Efficient data fetching and state management
- **React 18.2.0** - UI library with concurrent features

### Backend
- **tRPC 10.43.6** - End-to-end typesafe APIs
- **Prisma 5.6.0** - Type-safe ORM
- **PostgreSQL** - Relational database (hosted on Supabase)
- **NextAuth.js 4.24.5** - Authentication with OAuth providers (GitHub, Google)
- **Zod 3.22.4** - Runtime type validation

### DevOps
- **Vercel** - Serverless deployment
- **GitHub Actions** - CI/CD pipeline
- **Supabase** - Database hosting and management
- **pnpm 8.7.5** - Fast, disk space efficient package manager

## Key Features

- **Authentication** - Secure OAuth integration with GitHub and Google
- **User Profiles** - Customizable user profiles with location and interests
- **Meetup Creation** - Create, update, and manage social meetups
- **Interactive Maps** - Location-based meetup discovery with Mapbox GL
- **Real-time Updates** - Dynamic content loading and updates
- **Responsive Design** - Optimized for all device sizes
- **Type Safety** - End-to-end type safety with TypeScript and tRPC

## Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/rendezvoo.git
cd rendezvoo

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Run database migrations
pnpm db:push

# Start development server
pnpm dev
```

## Architecture

This project follows a modern full-stack architecture:
- **Type-safe API Layer** - Using tRPC for end-to-end type safety
- **Database Abstraction** - Prisma ORM for type-safe database operations
- **Authentication Flow** - NextAuth.js for secure OAuth integration
- **Component Architecture** - Modular, reusable React components
- **State Management** - React Query for efficient data fetching and caching

## Performance Considerations

- Server-side rendering for improved SEO and initial load times
- Optimized image loading and caching strategies
- Efficient database queries with proper indexing
- Lazy loading of non-critical components
- Bundle analysis with @next/bundle-analyzer

## Security Measures

- OAuth-based authentication with NextAuth.js
- CSRF protection
- Secure session management
- Environment variable protection with @t3-oss/env-nextjs
- Regular dependency updates
- Latest security patches (Next.js 14.2.25)

## Future Enhancements

- Real-time notifications
- Enhanced search capabilities
- Mobile application
- Integration with additional social platforms
- Performance optimizations with React Server Components

## About the Developer

This project was developed as a demonstration of full-stack development capabilities, focusing on modern web technologies and best practices. It showcases proficiency in React, TypeScript, database design, and cloud deployment.

## License

MIT
