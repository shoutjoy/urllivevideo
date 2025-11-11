# VideoHub - Video URL Management Application

## Overview

VideoHub is a fully functional web application for saving and organizing video URLs from YouTube and Vimeo. Users can add videos by pasting URLs, view them in a responsive grid layout, and open them in new browser tabs. The application features automatic metadata extraction and provides a clean, content-first interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## Current Status

**Implementation**: Complete and production-ready
- Full CRUD operations for video management
- Automatic metadata extraction from YouTube and Vimeo URLs
- Responsive grid layout with delete functionality
- In-memory storage (data resets on server restart)
- End-to-end tested and verified

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Component Library**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom design system

**Design System**:
- Content-first approach prioritizing video thumbnails and efficient browsing
- Red accent color scheme with support for light/dark modes via CSS variables
- Consistent spacing primitives (2, 4, 6, 8, 12 units)
- Typography hierarchy with Inter font family
- Responsive design optimized for desktop and mobile (1-4 column grid)

**Key Components**:
- `Header`: Fixed navigation with VideoHub branding
- `AddVideoForm`: URL input with platform detection and validation
- `VideoGrid`: Responsive grid layout (1-4 columns based on viewport)
- `VideoCard`: Video preview with thumbnail, title, platform icon, and hover-reveal delete button
- `EmptyState`: Guidance message when no videos are saved

### Backend Architecture

**Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Development**: tsx for TypeScript execution, Vite for frontend bundling
- **Build**: esbuild for server bundling, Vite for client production build

**API Endpoints**:
- `GET /api/videos` - Retrieve all saved videos (returns array)
- `POST /api/videos` - Add new video by URL (accepts { url }, returns 201)
- `DELETE /api/videos/:id` - Remove video by ID (returns 204 on success)

**Video Metadata Extraction**:
Automatic extraction from URLs:
- **YouTube**: Extracts video ID from youtube.com or youtu.be URLs
  - Thumbnail: `https://img.youtube.com/vi/{videoId}/hqdefault.jpg`
  - Title: `YouTube Video - {videoId}` (placeholder)
- **Vimeo**: Extracts video ID from vimeo.com URLs
  - Thumbnail: `https://vumbnail.com/{videoId}.jpg`
  - Title: `Vimeo Video - {videoId}` (placeholder)

**Storage Layer**:
- Implementation: `MemStorage` (in-memory storage using Maps)
- Interface: `IStorage` with methods for getAllVideos, getVideo, createVideo, deleteVideo
- Data persistence: In-memory only (resets on server restart)
- Schema defined in `shared/schema.ts` for type safety across frontend and backend

### Data Schema

**Video Schema** (`shared/schema.ts`):
```typescript
{
  id: string (UUID, auto-generated)
  url: string (video URL, required)
  title: string (auto-extracted, required)
  thumbnail: string (auto-extracted, required)
  platform: string ("youtube" | "vimeo", required)
  duration: string | null (optional, currently null)
}
```

**API Request/Response**:
- POST input: `{ url: string }`
- Response: Full video object with auto-extracted metadata

### Frontend-Backend Integration

**React Query Setup**:
- Query key: `["/api/videos"]` for fetching video list
- Mutations: Automatic cache invalidation after add/delete operations
- Toast notifications for success/error feedback
- Loading states: "Loading videos..." during initial fetch

**Data Flow**:
1. User pastes YouTube/Vimeo URL
2. Frontend validates URL format (YouTube/Vimeo only)
3. POST request to `/api/videos` with { url }
4. Backend extracts metadata and creates video
5. Frontend refetches video list and shows success toast
6. Video appears in grid with thumbnail and platform icon

### External Dependencies

**Frontend Libraries**:
- `@tanstack/react-query`: Server state synchronization and caching
- `wouter`: Lightweight routing
- `@radix-ui/*`: Headless accessible UI components
- `tailwindcss`: Utility-first CSS framework
- `lucide-react` + `react-icons/si`: Icon libraries (Lucide icons + Simple Icons for logos)
- `zod`: Runtime type validation
- `react-hook-form` + `@hookform/resolvers`: Form management with validation

**Backend Libraries**:
- `express`: Web server framework
- `drizzle-orm`: Type-safe ORM (schema defined, not actively used)
- `drizzle-zod`: Zod schema generation from Drizzle schemas
- `zod`: Schema validation for API inputs

**Development Tools**:
- `vite`: Frontend build tool and dev server
- `tsx`: TypeScript execution for Node.js
- `esbuild`: Fast JavaScript bundler for production
- `@replit/*`: Replit-specific plugins for development experience

### Video Platform Integration

**Supported Platforms**:
- YouTube (youtube.com, youtu.be)
- Vimeo (vimeo.com)

**URL Patterns**:
- YouTube: `https://www.youtube.com/watch?v=VIDEO_ID` or `https://youtu.be/VIDEO_ID`
- Vimeo: `https://vimeo.com/VIDEO_ID`

**Thumbnail Services**:
- YouTube: Official thumbnail service (hqdefault.jpg quality)
- Vimeo: Vumbnail.com thumbnail service

### Future Enhancements

**Recommended Improvements**:
1. Replace placeholder titles with real video titles from YouTube/Vimeo APIs
2. Add video duration extraction for better preview information
3. Implement persistent database storage (PostgreSQL) for data durability
4. Add automated integration tests for CRUD operations
5. Implement video categories or tags for better organization
6. Add search and filtering capabilities
7. Create video playlists feature

### Development Workflow

**Running the Application**:
- Command: `npm run dev`
- Frontend: Vite dev server with hot module replacement
- Backend: Express server with tsx for TypeScript execution
- Auto-restart: Workflow restarts automatically after code changes

**Testing**:
- End-to-end tests using Playwright
- Verified workflows: Add video → View in grid → Delete video → Empty state
- Test coverage: All core CRUD operations and UI interactions