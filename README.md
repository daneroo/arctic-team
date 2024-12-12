# arctic-team

- [x] Title: Cambridge Bay; finalize the name
- [x] Rename to cambridge-bay-research , at least in the deployed domain name
- [x] move selected place to i't own panel
  - [x] Add a text description to places
  - [x] Add an edit button for the current place
  - [x] add new place button to main panel
- [x] search and order places
- [x] select current place from marker
- [ ] colors from <https://arcticnet.ca/>

## App description

An interactive map application showing various places in an OpenStreetMap.

- Left Side contains a list of places
  - `Place: {id: string;  name: string;  latitude: number;  longitude: number};`
- Right Side contains an OpenStreetMap map
- When clicking on a place, the map will zoom to the place and show a marker

## Stack

Core Technologies:

- Supabase (Database - Auth later)
- React 18.3.1 (JavaScript library for building user interfaces)
- TypeScript (for type-safe JavaScript)
- Vite 5.4.2 (as the build tool and development server)

Key Features/Libraries:

- 🗺️ Mapping capabilities with:
  - Leaflet 1.9.4
  - React Leaflet 4.2.1
- 🎨 Styling with:
  - TailwindCSS 3.4.1 (utility-first CSS framework)
  - PostCSS & Autoprefixer for CSS processing
- 🎯 Icons using:
  - Lucide React (modern icon set)

Development Tools:

- ESLint for code linting
- TypeScript 5.5.3
- Various TypeScript and React type definitions
- React-specific ESLint plugins for hooks and refresh

This is a modern, well-structured frontend project using current versions of all major dependencies. The combination of React + TypeScript + Vite + TailwindCSS is a popular and powerful stack for building fast, type-safe web applications.
