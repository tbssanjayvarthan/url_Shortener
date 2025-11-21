# url_Shortener

# URL Shortener - Project Documentation

## Overview
A modern URL shortener web application similar to bit.ly, allowing users to create short links, track click statistics, and manage their links.

## Features
- **Create Short Links**: Convert long URLs into short, shareable links
- **Custom Codes**: Optional custom short codes (6-8 alphanumeric characters)
- **Click Tracking**: Monitor total clicks and last clicked timestamp
- **Link Management**: View, search, and delete links
- **Statistics**: Detailed stats page for each shortened link
- **Health Check**: System status and uptime monitoring

## Technology Stack
- **Frontend**: React 18 (production build)
- **Styling**: TailwindCSS
- **Icons**: Lucide Icons
- **Database**: Trickle Database (built-in)
- **Architecture**: Multi-page application (MPA)

## Project Structure
```
/
├── index.html              # Main dashboard
├── app.js                  # Dashboard application logic
├── code.html              # Stats page
├── code-app.js            # Stats application logic
├── redirect.html          # Redirect handler
├── redirect-app.js        # Redirect logic
├── healthz.html           # Health check page
├── health-app.js          # Health check logic
├── components/
│   ├── Header.js          # Shared header component
│   ├── AddLinkModal.js    # Modal for creating links
│   ├── LinkTable.js       # Table displaying all links
│   └── Alert.js           # Alert notification component
├── utils/
│   └── api.js             # API functions and database operations
└── trickle/
    ├── notes/             # Project documentation
    └── rules/             # Development rules
```

## Pages & Routes
- `/` - Dashboard with link management
- `/code.html?code={code}` - Statistics page for specific link
- `/{code}` - Redirect to target URL (via redirect.html)
- `/healthz.html` - Health check endpoint

## Database Schema
**ObjectType**: `link`

Fields:
- `code` (string): Unique 6-8 character alphanumeric code
- `url` (string): Target URL to redirect to
- `clicks` (number): Total click count
- `lastClicked` (string): ISO timestamp of last click
- `createdAt` (string): ISO timestamp of creation

## Key Functionalities

### Link Creation
- Validates URL format before saving
- Generates random 6-character code if custom code not provided
- Checks for code uniqueness (returns error if exists)
- Stores in Trickle database

### Link Redirect
- Increments click counter
- Updates last clicked timestamp
- Performs 302 redirect to target URL
- Returns 404 if code doesn't exist

### Link Management
- List all links with search/filter
- Sort by clicks or date
- Copy short URL to clipboard
- Delete links with confirmation

## Design System
- **Primary Color**: Blue (#2563eb)
- **Secondary Color**: Light Blue (#dbeafe)
- **Typography**: Clean sans-serif
- **Layout**: Modern, responsive grid system
- **Components**: Consistent button styles, form inputs, and cards

## Development Notes
- All components include error boundaries
- Form validation with inline error messages
- Loading states for async operations
- Responsive design for mobile and desktop
- Clean, modular code structure

## Version
Current version: 1.0.0

## Last Updated
2025-11-21
