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
import VideoAdPlayer from 'video-ad-player-sdk';

// Initialize the app with an API token
VideoAdPlayer.initApp('YOUR_API_TOKEN');

// Show video
VideoAdPlayer.showVideo({
  video: {
    canSkip: true,
    skipLimit: 10, // optional, seconds before the video can be skipped. 5 by default, if canSkip is true
    closeLimit: 15 // watching time in seconds, 30 by default
  },
  onVideoEnded: (status) => {
    console.log(`Video ended with status: ${status}`);
  },
  onReward: () => {
    console.log('User rewarded!');
  }
});
```

## API Overview

### Methods

### `initApp(token: string): void`

Initializes the application with the provided token.

- **token** (string): Your API token for initializing the SDK.

### `showVideo(options: ShowVideoOptions): void`

Displays a video with the specified options.

- **options** (`ShowVideoOptions`): An object containing options for displaying the video.

## Interfaces

### `ShowVideoOptions`

Options for displaying the video.

- **video** (`VideoModel`): The video model to be displayed.
- **onVideoEnded** (function, optional): A callback invoked when the video ends.
    - Accepts values: `'skipped'` | `'closed'`
- **onReward** (function, optional): A callback invoked when the user is rewarded.

### `VideoModel`

Description of the video file.

- **canSkip** (boolean): Ability to skip the video.
- **skipLimit** (number, optional): Time in seconds after which the video can be skipped. **Default value: 5.**
- **closeLimit** (number): Minimum watching time in seconds. **Default value: 30.**

## Types

### `VideoPlayedStatus`

The status of the completed video.

- Values: `'skipped'`, `'closed'`
