# Video AD Player SDK Documentation

## Overview

The Video AD Player SDK provides a simple interface for initializing and displaying video ads in your application.
Import the SDK and use its functions to integrate video ads with customizable skip settings and callback methods for
handling the completion of ads.

## Installation

To use this SDK, first install it in your project:

```bash
npm install @teleads/tma-sdk
```

or

```bash
yarn add @teleads/tma-sdk
```

## Quick Start

Import the SDK into your file and initialize the app using the provided token.

```typescript
import TeleAdsTMA from '@teleads/tma-sdk';

// Initialize the TeleAds SDK for TMA using the SDK token
TeleAdsTMA.init('YOUR_SDK_TOKEN');

// Show advertising
TeleAdsTMA.showAD({
  adUnitId: 'AD_UNIT_ID',
  onVideoEnded: (status) => {
    console.log(`Ad ended with status: ${status}`);
  },
});
```

## API Overview

### Methods

### `init(token: string): void`

Initializes the application with the provided token.

- **token** (string): Your API token for initializing the SDK.

### `showAD(options: ShowAdOptions): void`

Displays a video with the specified options.

- **options** (`ShowAdOptions`): An object containing options for displaying the video.

## Interfaces

### `ShowAdOptions`

Options for displaying the video.

- **adUnitId** (`string`): The ad unit id to be displayed.
- **onEnded** (function, optional): A callback invoked when the video ends.
    - Accepts values: `'skipped'` | `'closed'`
- **onClick** (function, optional): A callback invoked when the user clicked on AD.

## Types

### `VideoPlayedStatus`

The status of the completed video.

- Values: `'skipped'`, `'closed'`

