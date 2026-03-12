# Myanmar Earthquake Dashboard

An interactive web dashboard that visualizes over a century of historical earthquake data within Myanmar's geographical boundaries. Built with React, Leaflet, and Recharts, it fetches live seismic data from the USGS Earthquake Hazards Program and filters events using precise point-in-polygon geospatial analysis.

**Live Demo:** [https://geonet-myanmar.github.io/myanmar-earthquake-dashboard/](https://geonet-myanmar.github.io/myanmar-earthquake-dashboard/)

## Features

### Interactive Earthquake Map
- Leaflet-based map centered on Myanmar with CARTO light basemap tiles
- Color-coded circle markers by magnitude severity:
  - **7.0+** (Deep rose) | **6.0--6.9** (Orange) | **5.0--5.9** (Amber) | **< 5.0** (Blue)
- Marker radius scales with magnitude for visual emphasis
- Click any marker to view a popup with magnitude, location, date/time, and depth
- Tectonic plate boundary overlay rendered as dashed red lines

### Summary Statistics
- **Total Earthquakes** recorded within Myanmar
- **Maximum Magnitude** with location
- **Most Recent** event date and magnitude
- **Average Depth** across all events (km)

### Data Visualizations
- **Magnitude Distribution** -- bar chart grouping events into 4.0--4.9, 5.0--5.9, 6.0--6.9, and 7.0+ bins
- **Depth vs. Magnitude** -- scatter plot revealing correlations between earthquake depth and strength
- **Historical Timeline** -- area chart of yearly earthquake frequency from 1900 to the present

### General
- Auto-refreshes data every 5 minutes
- Manual refresh button for on-demand updates
- Responsive layout (mobile, tablet, and desktop)
- Full TypeScript type safety

## Tech Stack

| Category | Technologies |
|---|---|
| Framework | React 19, TypeScript, Vite |
| Mapping | Leaflet, React-Leaflet |
| Charts | Recharts |
| Geospatial | Turf.js (point-in-polygon, helpers) |
| Styling | Tailwind CSS 4, clsx, tailwind-merge |
| Icons | Lucide React |
| Date Formatting | date-fns |
| Deployment | gh-pages (GitHub Pages) |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/geonet-myanmar/myanmar-earthquake-dashboard.git
cd myanmar-earthquake-dashboard
npm install
```

### Running Locally

```bash
npm run dev
```

The app will start at [http://localhost:3000](http://localhost:3000).

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server on port 3000 |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Type-check with TypeScript (no emit) |
| `npm run clean` | Remove the `dist/` directory |
| `npm run deploy` | Build and publish to GitHub Pages |

## Data Sources

### Earthquake Data
- **Provider:** [USGS Earthquake Hazards Program](https://earthquake.usgs.gov/)
- **API Endpoint:** [FDSNWS Event Query](https://earthquake.usgs.gov/fdsnws/event/1/)
- **Coverage:** 1900 to present
- **Filters applied:**
  - Bounding box: 9.5--28.5 N latitude, 92.0--101.5 E longitude
  - Minimum magnitude: 4.0
  - Maximum results: 20,000

### Myanmar Boundary
- **Source:** [Natural Earth](https://www.naturalearthdata.com/) 1:10m Admin 0 Countries
- **Format:** GeoJSON MultiPolygon (39 polygon rings covering mainland and islands)
- **Usage:** Strict point-in-polygon filtering via Turf.js to include only earthquakes within Myanmar's national boundary

### Tectonic Plate Boundaries
- **Source:** Myanmar Tectonic Map 2011 GeoJSON
- **Usage:** Rendered as an overlay on the map to show fault lines and plate boundaries

## Deployment

The project is configured for GitHub Pages deployment via the `gh-pages` package. The Vite `base` option is set to `/myanmar-earthquake-dashboard/` to ensure correct asset paths under the GitHub Pages subpath.

### Deploy to GitHub Pages

```bash
npm run deploy
```

This builds the project and publishes the `dist/` directory to the `gh-pages` branch, which GitHub Pages serves automatically.

## Project Structure

```
myanmar-earthquake-dashboard/
├── index.html                  # HTML entry point
├── package.json
├── tsconfig.json
├── vite.config.ts              # Vite config with base path and Tailwind plugin
├── public/
│   └── myanmar.geojson         # Myanmar boundary (Natural Earth 10m)
└── src/
    ├── main.tsx                # React entry point
    ├── App.tsx                 # Root component with data fetching lifecycle
    ├── index.css               # Tailwind CSS import
    ├── components/
    │   ├── Dashboard.tsx       # Main layout with responsive grid
    │   ├── EarthquakeMap.tsx   # Leaflet map with markers and tectonic overlay
    │   ├── StatsPanel.tsx      # Summary statistic cards
    │   ├── MagnitudeChart.tsx  # Magnitude distribution bar chart
    │   ├── DepthChart.tsx      # Depth vs. magnitude scatter plot
    │   └── TimelineChart.tsx   # Historical frequency area chart
    └── lib/
        ├── api.ts              # USGS data fetching and geospatial filtering
        └── utils.ts            # cn() class merging utility
```

## License

This project is open source and available for educational and research purposes.
