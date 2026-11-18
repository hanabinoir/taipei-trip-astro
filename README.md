# Taipei Trip - Multi-language Travel Guide

An Astro-based interactive travel guide to Taipei with support for Traditional Chinese and Japanese.

## 🚀 Project Structure

```text
/
├── src/
│   ├── assets/              # Static assets (images, SVGs)
│   │   ├── astro.svg
│   │   └── background.svg
│   ├── components/          # Reusable React & Astro components
│   │   ├── LanguageSwitcher.astro    # Language selector UI
│   │   ├── Overview.tsx              # Interactive overview map
│   │   ├── SpotsMap.tsx              # Tourist spots visualization
│   │   ├── PhotoGallery.tsx          # Photo gallery component
│   │   ├── RegionsMap.tsx            # Regional map display
│   │   ├── SpotDetailNotes.tsx       # Spot details component
│   │   └── transportation/           # Transportation related components
│   │       ├── TransportationMap.tsx
│   │       └── BusesMapTable.tsx
│   ├── data/                # Content data files
│   │   ├── spots/           # Tourist spot data (multilingual)
│   │   │   ├── base.json    # English/base data
│   │   │   ├── zh-TW.json   # Traditional Chinese
│   │   │   └── ja.json      # Japanese
│   │   ├── cities/          # City information (multilingual)
│   │   ├── gallery.ts       # Photo gallery metadata
│   │   ├── spots.ts         # Spot data loading utility
│   │   ├── regions.geo.json # Geographic region data
│   │   └── transportation/  # Transportation data
│   │       └── buses.json
│   ├── layouts/             # Shared page layouts
│   │   └── Layout.astro     # Main site layout
│   ├── pages/               # Site pages & routes
│   │   ├── index.astro      # Home page (Chinese)
│   │   ├── ja/              # Japanese routes
│   │   │   ├── index.astro
│   │   │   ├── spots/
│   │   │   ├── gallery/
│   │   │   └── transportation/
│   │   ├── spots/           # Tourist spots pages
│   │   │   ├── index.astro
│   │   │   ├── [city].astro
│   │   │   └── SpotsPage.astro
│   │   ├── gallery/         # Photo gallery pages
│   │   │   ├── index.astro
│   │   │   └── [id].astro
│   │   └── transportation/  # Transportation info
│   │       ├── index.astro
│   │       ├── Header.astro
│   │       ├── MetroSection.astro
│   │       ├── BusesSection.astro
│   │       ├── AirportSection.astro
│   │       ├── MotorcyclesSection.astro
│   │       └── PaymentSection.astro
│   ├── utils/               # Utility functions
│   │   └── i18n.ts          # Internationalization helpers
│   └── constants/           # Constant values
├── astro.config.mjs         # Astro configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🌐 Language Switching

This project supports **multilingual content** with seamless language switching between Traditional Chinese (正體中文) and Japanese (日本語).

### How Language Switching Works

1. **Language Switcher Component** (`LanguageSwitcher.astro`)
   - Provides an accessible dropdown menu for language selection
   - Displays flag emojis (🇹🇼 and 🇯🇵) for visual language identification
   - Stores user preference in browser localStorage with key `trip-language`

2. **i18n Utility** (`src/utils/i18n.ts`)
   - `resolveLanguage()`: Determines current language from URL route and localStorage
   - `getCurrentLanguage()`: Gets the user's selected language (fallback: Traditional Chinese)
   - `getLocalizedText()`: Retrieves translated text from bilingual objects
   - `onLanguageChange()`: Subscribes to language change events
   - `dispatchLanguageChange()`: Triggers language change events for reactive updates

3. **Multilingual Routes**
   - Chinese (default): `/`, `/spots`, `/gallery`, `/transportation`
   - Japanese: `/ja`, `/ja/spots`, `/ja/gallery`, `/ja/transportation`
   - Language preference persists across page navigation

4. **Data Structure**
   - Content files organized by language:
     - `base.json` - English/fallback data
     - `zh-TW.json` - Traditional Chinese
     - `ja.json` - Japanese
   - Components use `getLocalizedText()` to access the correct language version

### Language Preference Priority

1. URL locale (explicit route language like `/ja/...`)
2. Browser localStorage (`trip-language`)
3. Default language (Traditional Chinese)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
