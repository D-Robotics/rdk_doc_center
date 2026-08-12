[English](./README.md) | 简体中文

# RDK Documentation Center

D-Robotics **RDK Documentation Center** portal site: Provides multilingual homepage, documentation entry aggregation, and search functionality.

| Item | Value |
| --- | --- |
| Online URL (Chinese) | https://developer.d-robotics.cc/rdk_doc_center/ |
| Online URL (English) | https://developer.d-robotics.cc/rdk_doc_center/en/ |

## Feature Overview

- **Documentation Entry Aggregation**: Display manual cards for RDK X/S, SDK, TROS, Model Zoo, examples, accessories, software, algorithm toolchain, etc., categorized for easy browsing
- **Search**: Homepage search queries an Algolia federated index (full-text + section anchors); card title/description still match locally
- **Bilingual Portal**: Language toggle in the navigation bar; Chinese/English text is maintained separately in the configuration
- **External Link Redirects**: Card `href` points to various sub-sites (e.g., `developer.d-robotics.cc`); when `pendingRelease: true`, only a "not yet released" message is shown
- **Feedback Overlay**: Configurable questionnaire entry on the homepage and English homepage (see `docusaurus.config.js` → `customFields.feedbackFloat`)

## Environment Requirements

- Node.js >= 18.0
- npm (recommended to use `npm ci` to install dependencies, consistent with CI)

## Local Development

```bash
npm ci
```

| Command | Description |
| --- | --- |
| `npm run start` | Chinese portal development server (`zh-Hans`) |
| `npm run start:en` | English portal development server (`en`) |
| `npm run start:port` | Chinese portal, port `3001` |
| `npm run start:no-watch` | Chinese portal, do not watch file changes |
| `npm run start:no-watch:en` | English portal, do not watch file changes |

Local access (ports may vary):

- Chinese: http://localhost:3000/rdk_doc_center/
- English: http://localhost:3000/rdk_doc_center/en/

## Build and Preview

```bash
npm run build
npm run serve
```

Build outputs are located in `build/` (Chinese) and `build/en/` (English). Paths for `npm run serve` preview are the same as the table above.

## Configuration and Maintenance

### Documentation Cards (Categories + Entries)

The sole configuration source: [`src/data/sites.js`](src/data/sites.js)

- `DOC_CENTER_CONFIG.categories`: Homepage categories (anchors, icons, Chinese/English titles)
- `DOC_CENTER_CONFIG.entries`: Manual cards (title, description, `href`, `pendingRelease` status)

After modification, homepage groups and cards update automatically without changing page code.

