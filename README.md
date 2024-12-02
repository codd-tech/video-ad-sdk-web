# Video AD Player SDK Documentation

## Overview

The Video AD Player SDK provides a simple interface for initializing and displaying video ads in your application. Import the SDK and use its functions to integrate video ads with customizable skip settings and callback methods for handling the completion of ads.

## Installation

To use this SDK, first install it in your project:

```bash
npm install @codd-tech/video-ad-sdk
```
or
```bash
yarn add @codd-tech/video-ad-sdk
```

## Quick Start
Import the SDK into your file and initialize the app using the provided token.

```javascript
import AdSDK from '@codd-tech/video-ad-sdk';

// Initialize the app with an API token
AdSDK.init('YOUR_API_TOKEN');

// Show video
AdSDK.showAD({
  type: AdSDK.AdTypes.Dynamic,
  onVideoEnded: (status) => {
    console.log(`Ad ended with status: ${status}`);
  },
  onReward: () => {
    console.log('User rewarded!');
  }
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

- **type** (`AdTypes`): The ad type to be displayed (Dynamic or Static).
- **onEnded** (function, optional): A callback invoked when the video ends.
    - Accepts values: `'skipped'` | `'closed'`
- **onReward** (function, optional): A callback invoked when the user is rewarded.
- **onClick** (function, optional): A callback invoked when the user clicked on AD.

## Types

### `VideoPlayedStatus`

The status of the completed video.

- Values: `'skipped'`, `'closed'`

### `AdTypes`

The status of the completed video.

- Values: `'Dynamic'`, `'Static'`
