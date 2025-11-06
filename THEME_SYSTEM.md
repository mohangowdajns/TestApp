# 🎨 React Native Paper Theme System Guide

This guide explains how to use the custom theme system that matches your wireframe design.

## Table of Contents

1. [Overview](#overview)
2. [Setup](#setup)
3. [Using the Theme](#using-the-theme)
4. [Component Examples](#component-examples)
5. [Best Practices](#best-practices)

---

## Overview

The theme system provides:

- ✅ Consistent blue primary color (#3A5FE8) matching your wireframe
- ✅ Complete spacing system based on 8px unit
- ✅ Elevation/shadow system for depth
- ✅ Full typography scale with Poppins font
- ✅ Pre-built styled component creators
- ✅ Light and dark mode support
- ✅ Status colors (success, warning, error, info)

---

## Setup

The setup is **already configured** in your `AppNavigator.tsx`:

```tsx
<PaperProvider theme={theme}>
  <NavigationContainer>{/* Your app */}</NavigationContainer>
</PaperProvider>
```

The `useThemeContext()` hook provides the theme to all components.

---

## Using the Theme

### Basic Usage - Getting the Theme

```tsx
import { useAppTheme } from '../hooks/useAppTheme';

export function MyComponent() {
  const theme = useAppTheme();

  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello!</Text>
    </View>
  );
}
```

### Available Color Properties

```tsx
// Primary
theme.colors.primary; // #3A5FE8 (main brand color)
theme.colors.primaryLight; // #E3F2FD
theme.colors.primaryDark; // #2E5BB8

// Text
theme.colors.text; // Primary text color
theme.colors.textSecondary; // Secondary gray text
theme.colors.textTertiary; // Lighter gray text
theme.colors.onSurface; // Text on surfaces

// Status
theme.colors.success; // Green (#4CAF50)
theme.colors.warning; // Orange (#FF9800)
theme.colors.error; // Red (#E53935)
theme.colors.info; // Blue (#2196F3)

// Surfaces
theme.colors.background; // Main background (#FFF or #121212)
theme.colors.surface; // Card/elevated surface
theme.colors.surfaceVariant; // Slightly different surface
theme.colors.border; // Border color
theme.colors.divider; // Divider lines
```

### Spacing System

Use 8px as the base unit:

```tsx
theme.spacing.xs; // 4px
theme.spacing.sm; // 8px
theme.spacing.md; // 16px (base unit)
theme.spacing.lg; // 24px
theme.spacing.xl; // 32px
theme.spacing.xxl; // 48px
theme.spacing.xxxl; // 64px
```

Example:

```tsx
<View style={{ padding: theme.spacing.md }}>{/* Content */}</View>
```

### Border Radius

```tsx
theme.borderRadius.none; // 0px
theme.borderRadius.sm; // 4px
theme.borderRadius.md; // 8px
theme.borderRadius.lg; // 12px
theme.borderRadius.xl; // 16px
theme.borderRadius.xxl; // 24px
theme.borderRadius.full; // 9999px (circular)
```

### Shadows/Elevation

```tsx
theme.shadows.none; // No shadow
theme.shadows.sm; // Subtle shadow
theme.shadows.md; // Medium shadow (most common)
theme.shadows.lg; // Large shadow
theme.shadows.xl; // Extra large shadow
```

Example:

```tsx
<View style={[styles.card, theme.shadows.md]}>{/* Content */}</View>
```

### Layout Constants

```tsx
theme.layout.headerHeight; // 56
theme.layout.buttonHeight; // 44
theme.layout.inputHeight; // 48
theme.layout.iconSize; // 24
theme.layout.avatarSize; // 40
```

### Typography (Fonts)

```tsx
theme.fonts.displayLarge; // 57px - Large display text
theme.fonts.headlineMedium; // 28px - Section headings
theme.fonts.titleLarge; // 22px - Card titles
theme.fonts.titleMedium; // 16px - Subtitle
theme.fonts.bodyLarge; // 16px - Main content
theme.fonts.bodyMedium; // 14px - Regular text
theme.fonts.labelMedium; // 12px - Labels, small text
```

Example:

```tsx
<Text style={theme.fonts.headlineMedium}>Section Title</Text>
```

---

## Component Examples

### 1. Card Component

```tsx
import { useAppTheme } from '../hooks/useAppTheme';
import { createCardStyle } from '../theme/components';

export function MyCard() {
  const theme = useAppTheme();

  return (
    <View style={createCardStyle(theme, true)}>
      <Text style={theme.fonts.titleMedium}>Card Title</Text>
      <Text style={theme.fonts.bodyMedium}>Card content goes here</Text>
    </View>
  );
}
```

### 2. Button Component

Already updated `CustomButton.tsx` to use theme. Usage:

```tsx
import CustomButton from '../components/CustonButton';

<CustomButton
  title="Click Me"
  handlePress={() => {}}
  variant="filled" // or "outlined" or "text"
/>;
```

Or use the helper functions:

```tsx
import { createPrimaryButtonStyle } from '../theme/components';

<TouchableOpacity style={createPrimaryButtonStyle(theme)}>
  <Text style={{ color: '#FFF' }}>Button</Text>
</TouchableOpacity>;
```

### 3. Status Badge Component

```tsx
import { createStatusBadgeStyle, createBadgeTextStyle } from '../theme/components';

export function StatusBadge({ status }) {
  const theme = useAppTheme();

  return (
    <View style={createStatusBadgeStyle(theme, status)}>
      <Text style={createBadgeTextStyle(theme)}>
        {status}
      </Text>
    </View>
  );
}

// Usage:
<StatusBadge status="Completed" />     // Green badge
<StatusBadge status="In Progress" />   // Orange badge
<StatusBadge status="Planning" />      // Blue badge
```

### 4. Project Card (like your LeadList)

```tsx
import {
  createProjectCardStyle,
  createProjectNameStyle,
  createProjectAddressStyle,
  createStatusBadgeStyle,
  createBadgeTextStyle,
} from '../theme/components';

export function ProjectCard({ project }) {
  const theme = useAppTheme();

  return (
    <TouchableOpacity style={createProjectCardStyle(theme)}>
      <Text style={createProjectNameStyle(theme)}>{project.name}</Text>
      <Text style={createProjectAddressStyle(theme)}>{project.address}</Text>

      <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
        <View style={createStatusBadgeStyle(theme, project.status)}>
          <Text style={createBadgeTextStyle(theme)}>{project.status}</Text>
        </View>
        <Text style={theme.fonts.bodyMedium}>{project.capacity}</Text>
      </View>
    </TouchableOpacity>
  );
}
```

### 5. Header Section

```tsx
import { createHeaderStyle, createHeaderTextStyle, createHeadingStyle } from '../theme/components';

export function HomeHeader() {
  const theme = useAppTheme();

  return (
    <View style={createHeaderStyle(theme)}>
      <Text style={createHeaderTextStyle(theme)}>Welcome to Solar Design Tool</Text>
    </View>
  );
}
```

### 6. Stat Card Grid

```tsx
import {
  createStatCardStyle,
  createStatNumberStyle,
  createStatLabelStyle,
} from '../theme/components';

export function StatsGrid() {
  const theme = useAppTheme();

  return (
    <View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>
      <View style={createStatCardStyle(theme)}>
        <Icon name="wb-sunny" size={24} color={theme.colors.primary} />
        <Text style={createStatNumberStyle(theme)}>183.7 kW</Text>
        <Text style={createStatLabelStyle(theme)}>Total Capacity</Text>
      </View>

      <View style={createStatCardStyle(theme)}>
        <Icon name="build" size={24} color={theme.colors.warning} />
        <Text style={createStatNumberStyle(theme)}>12</Text>
        <Text style={createStatLabelStyle(theme)}>Active Projects</Text>
      </View>
    </View>
  );
}
```

---

## Updating Existing Components

### Before (hardcoded styles):

```tsx
<View
  style={{
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
  }}
>
  <Text style={{ color: '#000000', fontSize: 16 }}>Hello</Text>
</View>
```

### After (using theme):

```tsx
import { useAppTheme } from '../hooks/useAppTheme';
import { createCardStyle } from '../theme/components';

const MyComponent = () => {
  const theme = useAppTheme();

  return (
    <View style={createCardStyle(theme)}>
      <Text style={theme.fonts.bodyMedium}>Hello</Text>
    </View>
  );
};
```

---

## Adapting Your Existing Components

### LoginScreen.tsx

```tsx
import { useAppTheme } from '../hooks/useAppTheme';
import { createInputStyle, createPrimaryButtonStyle } from '../theme/components';

// Replace hardcoded styles with theme values
<TextInput
  style={createInputStyle(theme, focused)}
  // ...
/>

<View style={{ backgroundColor: theme.colors.primaryLight }}>
  {/* Language selector */}
</View>
```

### LeadList.tsx

```tsx
import { useAppTheme } from '../hooks/useAppTheme';
import { createProjectCardStyle, createStatusBadgeStyle } from '../theme/components';

// Replace all hardcoded colors with theme colors
<View style={createProjectCardStyle(theme)}>
  {/* Project info */}
</View>

<View style={createStatusBadgeStyle(theme, project.status)}>
  {/* Status badge */}
</View>
```

### AppNavigator.tsx (Drawer)

```tsx
// Header section - already has primary color
<View
  style={{
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.lg,
    alignItems: 'center',
  }}
>
  {/* Avatar and name */}
</View>
```

---

## Animation

Use consistent timing for animations:

```tsx
theme.animation.fast; // 150ms
theme.animation.normal; // 300ms
theme.animation.slow; // 500ms
```

Example:

```tsx
Animated.timing(fadeAnim, {
  toValue: 1,
  duration: theme.animation.normal,
  useNativeDriver: true,
}).start();
```

---

## Best Practices

✅ **DO:**

- Always use `theme.colors.*` instead of hardcoded hex values
- Use `theme.spacing.*` for all padding/margin
- Use `theme.shadows.*` for elevation effects
- Use `theme.fonts.*` for text styling
- Use helper functions from `components.ts`
- Wrap app with `PaperProvider theme={theme}`

❌ **DON'T:**

- Hardcode colors like `'#3A5FE8'` or `'#FFFFFF'`
- Use arbitrary padding values like `20`
- Mix styling approaches (some theme, some hardcoded)
- Ignore the design system

---

## Theme File Reference

- `src/theme/color.ts` - Color definitions
- `src/theme/fonts.ts` - Typography scales
- `src/theme/theme.ts` - Theme objects, spacing, shadows, layout
- `src/theme/components.ts` - Pre-built styled component creators
- `src/theme/index.ts` - Central export point
- `src/hooks/useAppTheme.ts` - Hook to use theme in components
- `src/context/ThemeContext.tsx` - Theme provider (already set up)

---

## Quick Migration Checklist

To migrate an existing component to use the theme system:

- [ ] Add `import { useAppTheme } from '../hooks/useAppTheme'`
- [ ] Add `const theme = useAppTheme()` in component
- [ ] Replace `backgroundColor: '#FFFFFF'` with `backgroundColor: theme.colors.background`
- [ ] Replace `color: '#000000'` with `color: theme.colors.text`
- [ ] Replace `padding: 20` with `padding: theme.spacing.md`
- [ ] Replace `borderRadius: 12` with `borderRadius: theme.borderRadius.lg`
- [ ] Replace `elevation: 3` with `...theme.shadows.md`
- [ ] Replace `fontSize: 14` with `...theme.fonts.bodyMedium`

---

## Need Help?

If a component is not using the theme, check:

1. Is `useAppTheme()` hook imported and called?
2. Are you using `theme.colors.X` instead of hardcoded colors?
3. Are you using `theme.spacing.X` instead of magic numbers?
4. Are helper functions available for this component type?
