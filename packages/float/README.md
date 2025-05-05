# @emptyui/float

A flexible Float component with pure layout measurement to create your own floating components Modal, Bottom Sheet, Dropdown, Tooltip in React Native.

## Why?

Most React Native floating component libraries try to do everything, making it hard to customize animations, styles, or even just the backdrop. This library provides a simple Float component that handles positioning while giving you complete freedom over animations, styles.

## Installation

```bash
npm install @emptyui/float
# or
yarn add @emptyui/float
```

## Features

- 🎯 Precise positioning with multiple alignment options
- 🔄 Relative and root binding support
- 🎭 Flexible enough to build various floating components
- 📱 React Native, React Native Web
- 🎨 Customizable backdrop and overlay

## Usage

First, wrap your app with `FloatProvider`:

```tsx
import { FloatProvider } from "@emptyui/float";

function App() {
  return <FloatProvider>{/* Your app content */}</FloatProvider>;
}
```

The `Float` component is a building block for creating various floating UI elements. Here are some examples:

### Basic Modal

```tsx
import { Float } from "@emptyui/float";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

function ModalExample() {
  const floatRef = useRef<Float>(null);

  return (
    <View>
      <TouchableOpacity onPress={() => floatRef.current?.show()}>
        <Text>Open Modal</Text>
      </TouchableOpacity>

      <Float
        ref={floatRef}
        align="center"
        // Your own Backdrop node
        backdrop={<Backdrop onPress={floatRef.current!.hide} />}
      >
        {/** Manage the animation yourself */}
        <Animated.View entering={FadeIn}>
          <Text>Modal Content</Text>
          <TouchableOpacity onPress={floatRef.current!.hide}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Float>
    </View>
  );
}
```

### Bottom Sheet

```tsx
import { Float } from "@emptyui/float";
import { View, Text, TouchableOpacity } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

function BottomSheetExample() {
  const floatRef = useRef<Float>(null);

  return (
    <View>
      <TouchableOpacity onPress={() => floatRef.current?.show()}>
        <Text>Open Bottom Sheet</Text>
      </TouchableOpacity>

      <Float
        ref={floatRef}
        align="bottom-stretch"
        // Your own Backdrop node
        backdrop={<Backdrop onPress={floatRef.current!.hide} />}
      >
        {/** Manage the animation yourself */}
        <Animated.View entering={FadeInUp}>
          <Text>Bottom Sheet Content</Text>
          <TouchableOpacity onPress={floatRef.current!.hide}>
            <Text>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </Float>
    </View>
  );
}
```

### Dropdown Menu

```tsx
import { Float } from "@emptyui/float";
import { View, Text, TouchableOpacity } from "react-native";

function DropdownExample() {
  const floatRef = useRef<Float>(null);
  const triggerRef = useRef(null);

  return (
    <View>
      <TouchableOpacity
        ref={triggerRef}
        onPress={() => floatRef.current?.toggle()}
      >
        <Text>Open Dropdown</Text>
      </TouchableOpacity>

      <Float
        ref={floatRef}
        binding="relative"
        bindingRef={triggerRef}
        align="bottom-left"
      >
        <View>
          <TouchableOpacity>
            <Text>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text>Option 3</Text>
          </TouchableOpacity>
        </View>
      </Float>
    </View>
  );
}
```

### Tooltip

```tsx
import { Float } from "@emptyui/float";
import { View, Text, TouchableOpacity } from "react-native";

function TooltipExample() {
  const floatRef = useRef<Float>(null);
  const triggerRef = useRef(null);

  return (
    <View>
      <TouchableOpacity
        ref={triggerRef}
        onPress={() => floatRef.current?.toggle()}
      >
        <Text>Hover me</Text>
      </TouchableOpacity>

      <Float
        ref={floatRef}
        binding="relative"
        bindingRef={triggerRef}
        align="top-center"
      >
        <View>
          <Text style={{ color: "white" }}>Tooltip content</Text>
        </View>
      </Float>
    </View>
  );
}
```

## Props

| Prop          | Type                   | Default                                  | Description                                 |
| ------------- | ---------------------- | ---------------------------------------- | ------------------------------------------- |
| `align`       | `Align`                | `'center'`                               | Alignment position for the floating element |
| `alignTarget` | `'outer' \| 'inner'`   | `'outer'` (relative) or `'inner'` (root) | Target of the alignment                     |
| `binding`     | `'relative' \| 'root'` | `'root'`                                 | Binding type for positioning                |
| `bindingRef`  | `RefObject<View>`      | -                                        | Required for relative binding               |
| `backdrop`    | `ReactElement`         | `null`                                   | Backdrop component                          |
| `overlay`     | `ReactElement`         | `null`                                   | Overlay component                           |
| `id`          | `string`               | random                                   | Unique identifier for the float             |

## Alignment Options

The `align` prop supports the following values:

- `center`: Center of the screen
- `top-left`, `top-right`, `top-center`, `top-stretch`
- `bottom-left`, `bottom-right`, `bottom-center`, `bottom-stretch`
- `left-center`, `left-stretch`
- `right-center`, `right-stretch`

## Methods

The Float component exposes the following methods through ref:

- `show()`: Show the float
- `hide()`: Hide the float
- `toggle()`: Toggle the float visibility
- `visible`: Boolean indicating if the float is visible
