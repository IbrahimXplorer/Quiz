# Quiz (React Native)
A small React Native quiz application written in TypeScript.

## Key features

- Multiple-choice quiz UI
- Result of the quiz
- Course List (online/offline)
- Navigation with React Navigation (stack + bottom tabs)
- Boot splash hidden programmatically using `react-native-bootsplash`

## Requirements

- Node.js (LTS recommended)
- Yarn or npm
- Xcode (for iOS) or Android Studio (for Android) if running on simulators/devices
- CocoaPods for iOS: `cd ios && pod install`

## Install

From the project root:

Using yarn:

```bash
yarn install
```

Or using npm:

```bash
npm install
```

iOS step (macOS only):

```bash
cd ios
pod install
cd ..
```

## Run

Start Metro and run on a simulator or device.

Using yarn:

```bash
yarn android
# or
yarn ios
```

Using npm:

```bash
npm run android
# or
npm run ios
```

## Project structure (important files)

- `src/App.tsx` — app entry
- `src/navigation/index.tsx` — main navigator (Stack + Bottom Tabs)
- `src/navigation/BottomTabNavigator.tsx` — bottom tabs
- `src/screens/QuizScreen.tsx` — quiz UI
- `src/screens/ResultScreen.tsx` — results screen
- `src/context/QuizContext.tsx` — quiz state/context
- `src/data/question.json` — quiz questions
- `src/data/courses.json` — sample course data


## Troubleshooting

- Metro cache issues: `yarn start --reset-cache` or `npm start -- --reset-cache`
- iOS build issues: open `ios/Quiz.xcworkspace` in Xcode and ensure CocoaPods are installed
- Android build issues: ensure Android SDK and emulator are configured in Android Studio

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.