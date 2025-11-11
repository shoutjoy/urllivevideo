# Design Guidelines: Video URL Management App

## Design Approach

**Selected Approach:** Design System with Media Platform References

Drawing inspiration from video-centric platforms like YouTube and Vimeo, while implementing a structured design system for consistency and scalability. The interface prioritizes efficient video browsing, clear visual hierarchy, and seamless playback experiences.

**Key Design Principles:**
- Content-first: Videos and thumbnails take center stage
- Efficient scanning: Quick identification and access to saved videos
- Clean functionality: No distractions from core video management tasks
- Responsive excellence: Optimized for desktop and mobile viewing

## Core Design Elements

### A. Typography

**Font Family:** 
- Primary: Inter (Google Fonts) - clean, modern, excellent readability
- Monospace: JetBrains Mono (for URLs)

**Hierarchy:**
- Page Title: text-4xl font-bold (main headings)
- Section Headers: text-2xl font-semibold
- Video Titles: text-lg font-medium (truncate with ellipsis)
- Body Text: text-base font-normal
- Helper Text: text-sm (for URL inputs, timestamps)
- Micro Copy: text-xs (metadata, hints)

### B. Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, 8, and 12
- Tight spacing: p-2, gap-2 (within components)
- Standard spacing: p-4, gap-4 (between elements)
- Section spacing: p-6, gap-6 (cards, containers)
- Large spacing: p-8, gap-8 (major sections)
- Page margins: p-12 (outer containers)

**Container Strategy:**
- Max width: max-w-7xl mx-auto for main content
- Full-width video player when active
- Responsive padding: px-4 sm:px-6 lg:px-8

### C. Component Library

#### 1. Navigation Header
- Fixed top navigation with subtle shadow
- App branding on the left
- "Add Video" prominent action button on the right
- Height: h-16
- Padding: px-6

#### 2. Add Video Section
- Prominent URL input field with large touch target
- Full-width input: w-full with max-w-2xl centered
- Input height: h-12 with rounded corners
- Inline "Add" button positioned at input end
- URL validation feedback below input
- Platform indicator icons (YouTube/Vimeo) when valid URL detected
- Placeholder: "Paste YouTube or Vimeo URL..."

#### 3. Video Library Grid
**Desktop Layout:**
- 4-column grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- Gap between cards: gap-6
- Each card contains:
  - 16:9 aspect ratio thumbnail (clickable)
  - Video title below (line-clamp-2)
  - Platform badge (YouTube/Vimeo icon)
  - Delete button (top-right corner, opacity on hover)
  - Duration overlay on thumbnail (bottom-right)

**Card Structure:**
- Rounded corners: rounded-lg
- Hover state: slight elevation with shadow transition
- Cursor pointer on thumbnail area
- Card padding: p-4

#### 4. Video Player Modal/View
- Full-width container with max-w-6xl centered
- Embedded iframe with 16:9 aspect ratio maintained
- Video title above player: text-2xl font-semibold mb-4
- Original URL link below player with monospace font
- Close/Back button: top-left absolute positioning
- Player container padding: p-8
- Background overlay when modal (if using modal pattern)

#### 5. Empty State
- Centered vertically and horizontally
- Large icon placeholder (upload/video icon)
- Heading: "No videos saved yet"
- Subtext: "Add your first YouTube or Vimeo video to get started"
- Primary CTA: "Add Video" button
- Spacing: gap-4 between elements

#### 6. Form Elements
**URL Input Field:**
- Border: border-2 with focus state enhancement
- Rounded: rounded-lg
- Padding: px-4 py-3
- Font: text-base
- Transition on focus for smooth interaction

**Buttons:**
- Primary action: px-6 py-3, rounded-lg, font-medium
- Delete action: Icon button, p-2, rounded-full
- Hover states: Subtle scale or opacity change
- Active state: Slight press effect

#### 7. Status Indicators
- Loading spinner: When fetching video metadata
- Success toast: Brief confirmation after adding video
- Error message: Inline below input for validation errors
- Delete confirmation: Optional modal or instant delete with undo toast

### D. Animations

**Minimal, Purpose-Driven Animations:**
- Card hover: Subtle shadow elevation (duration-200)
- Button interactions: Quick scale on press (scale-95)
- Modal entrance: Fade in with slight scale (duration-300)
- Grid item appearance: Stagger fade-in on initial load (optional)
- Loading states: Subtle pulse for skeleton loaders

**Avoid:** Scroll animations, parallax effects, complex transitions

## Images

**Thumbnail Images:**
- Location: Video library grid cards
- Source: Automatically fetched from YouTube/Vimeo API
- Aspect ratio: 16:9 (enforced with object-cover)
- Fallback: Gradient placeholder with platform icon if thumbnail fails

**No Hero Image Required:** This is a utility app focused on video management, not a marketing site. Lead directly with the "Add Video" input and video library.

## Layout Patterns

**Primary View Structure:**
1. Fixed navigation header (h-16)
2. Add Video input section (centered, prominent)
3. Video library grid (responsive columns)
4. Empty state (conditional, when no videos)

**Video Player View:**
- Replace grid with full video player
- Maintain navigation for easy return
- Breadcrumb or back button for navigation clarity

**Responsive Behavior:**
- Mobile: Single column grid, full-width input
- Tablet: 2-column grid
- Desktop: 3-4 column grid based on viewport
- Player: Maintains aspect ratio across all devices