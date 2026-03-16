# Real Estate Explorer

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev)
[![Chakra UI](https://img.shields.io/badge/Chakra%20UI-3-green?logo=chakraui)](https://chakra-ui.com)
[![React Query](https://img.shields.io/badge/@tanstack/react--query-5-yellow?logo=react)](https://tanstack.com/query)
[![RapidAPI](https://img.shields.io/badge/RapidAPI-Redfin%20Proxy-orange?logo=rapidapi)](https://rapidapi.com)

A modern Next.js real estate explorer app powered by RapidAPI's unofficial Redfin API (Apidojo). Features advanced search/filtering with TanStack React Query for caching data (fetches once, reuses on refresh).

## ✨ Features
- **Smart Property Search**: Location autocomplete, 50+ filters (price, beds, sqft, amenities, schools, walk score, etc.) via lib/constant.js.
- **Data Caching**: TanStack React Query - fetch API data once, reuse across refreshes/navigations without new calls.
- **Responsive UI**: Chakra UI cards, horizontal scrolling menu (react-horizontal-scrolling-menu), dark/light mode (next-themes).
- **Property Details**: Dynamic pages with photos carousel logic, broker info, open houses.
- **Progress & Icons**: NProgress for loading, react-icons for UI (FaBed, FaMapMarkerAlt, etc.).
- **Robust API**: Axios + retry logic for rate limits, Redfin data (photos via CDN).
- **Animations**: Framer Motion on hover.

## 📋 Quick Setup

1. **Clone**:
   ```
   git clone <repo-url>
   cd real-estate
   ```

2. **Install**:
   ```
   npm install
   ```

3. **RapidAPI**:
   - Subscribe to [unofficial-redfin](https://rapidapi.com/apidojo/api/unofficial-redfin).
   - Add key to `.env.local`: `RAPIDAPI_KEY=your_key` and update utils/fetchApi.js.

4. **Dev**:
   ```
   npm run dev
   ```
   Visit http://localhost:3000

Scripts: `build`, `start`, `lint`.

## 🗂️ Structure
- `app/`: Pages (search, property/[id])
- `components/`: Property.js, searchFilter.js, Navbar
- `utils/`: fetchApi.js
- `lib/`: constant.js (filters, image URLs)

## 🔌 Tech
- **Data**: @tanstack/react-query v5 (caching), axios
- **UI**: Chakra UI v3, react-icons, react-horizontal-scrolling-menu, nprogress
- **Other**: millify, framer-motion

Fixed Chakra Card syntax error in Property.js.

⭐ Thanks!
