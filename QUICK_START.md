# 🚀 Quick Start - Theme System Cheat Sheet

## Import Theme

```tsx
import { useAppTheme } from '../hooks/useAppTheme';
```

## Get Theme in Component

```tsx
const MyScreen = () => {
  const theme = useAppTheme();
  // Now use theme.colors, theme.spacing, etc.
};
```

## Common Colors

```tsx
theme.colors.primary; // #3A5FE8 (Blue)
theme.colors.background; // White or #121212 (Dark)
theme.colors.surface; // Light gray or dark surface
theme.colors.text; // Black or white
theme.colors.textSecondary; // Dim text
theme.colors.success; // Green
theme.colors.warning; // Orange
theme.colors.error; // Red
theme.colors.info; // Light blue
theme.colors.border; // Border color
```

## Common Spacing

```tsx
style={{ padding: theme.spacing.md }}      // 16px
style={{ margin: theme.spacing.lg }}       // 24px
style={{ gap: theme.spacing.sm }}         // 8px
```

## Common Shadows

```tsx
style={theme.shadows.md}       // Medium elevation
style={theme.shadows.lg}       // Large elevation
```

## Common Typography

```tsx
style={theme.fonts.headlineMedium}  // Large heading
style={theme.fonts.titleMedium}     // Subtitle
style={theme.fonts.bodyMedium}      // Regular text
style={theme.fonts.labelSmall}      // Small label
```

## Pre-built Component Styles

### Cards

```tsx
import { createCardStyle } from '../theme/components';
<View style={createCardStyle(theme)}>{/* Content */}</View>;
```

### Buttons

```tsx
import { createPrimaryButtonStyle } from '../theme/components';
<TouchableOpacity style={createPrimaryButtonStyle(theme)}>
  <Text>Press Me</Text>
</TouchableOpacity>;
```

### Status Badges

```tsx
import { createStatusBadgeStyle, createBadgeTextStyle } from '../theme/components';
<View style={createStatusBadgeStyle(theme, 'Completed')}>
  <Text style={createBadgeTextStyle(theme)}>Completed</Text>
</View>;
```

### Project Cards

```tsx
import {
  createProjectCardStyle,
  createProjectNameStyle,
  createProjectAddressStyle,
} from '../theme/components';

<View style={createProjectCardStyle(theme)}>
  <Text style={createProjectNameStyle(theme)}>Project Name</Text>
  <Text style={createProjectAddressStyle(theme)}>Address</Text>
</View>;
```

### Stat Cards

```tsx
import {
  createStatCardStyle,
  createStatNumberStyle,
  createStatLabelStyle,
} from '../theme/components';

<View style={createStatCardStyle(theme)}>
  <Text style={createStatNumberStyle(theme)}>183.7 kW</Text>
  <Text style={createStatLabelStyle(theme)}>Total Capacity</Text>
</View>;
```

## Full Component Example

```tsx
import { useAppTheme } from '../hooks/useAppTheme';
import { createCardStyle, createStatusBadgeStyle, createBadgeTextStyle } from '../theme/components';

export function MyComponent() {
  const theme = useAppTheme();

  return (
    <View style={[createCardStyle(theme), { margin: theme.spacing.md }]}>
      <Text style={theme.fonts.titleMedium}>Card Title</Text>

      <Text
        style={{
          color: theme.colors.textSecondary,
          marginTop: theme.spacing.sm,
        }}
      >
        Card description
      </Text>

      <View style={createStatusBadgeStyle(theme, 'Completed')}>
        <Text style={createBadgeTextStyle(theme)}>Completed</Text>
      </View>
    </View>
  );
}
```

## Status Badge Types

```tsx
createStatusBadgeStyle(theme, 'Completed'); // Green
createStatusBadgeStyle(theme, 'In Progress'); // Orange
createStatusBadgeStyle(theme, 'Planning'); // Blue
createStatusBadgeStyle(theme, 'Pending'); // Orange
```

## Layout Constants

```tsx
theme.layout.headerHeight; // 56
theme.layout.buttonHeight; // 44
theme.layout.inputHeight; // 48
theme.layout.iconSize; // 24
theme.layout.avatarSize; // 40
```

## Animation Durations

```tsx
Animated.timing(anim, {
  duration: theme.animation.fast, // 150ms
  // or
  duration: theme.animation.normal, // 300ms
  // or
  duration: theme.animation.slow, // 500ms
  useNativeDriver: true,
}).start();
```

## Border Radius Options

```tsx
theme.borderRadius.none; // 0
theme.borderRadius.sm; // 4
theme.borderRadius.md; // 8
theme.borderRadius.lg; // 12
theme.borderRadius.xl; // 16
theme.borderRadius.xxl; // 24
theme.borderRadius.full; // 9999 (circular)
```

## Combining Styles

```tsx
// Multiple styles
<View style={[
  createCardStyle(theme),
  theme.shadows.lg,
  { marginBottom: theme.spacing.md }
]}>
  {/* Content */}
</View>

// Conditional styles
<View style={[
  createCardStyle(theme),
  isActive && { borderWidth: 2, borderColor: theme.colors.primary }
]}>
  {/* Content */}
</View>
```

## Dark Mode

Dark mode is automatic! The theme switches based on system settings.

No extra code needed - just use `theme.colors.background` and it will be white in light mode and dark in dark mode.

## Where to Look

- **All theme files**: `src/theme/`
- **Hook**: `src/hooks/useAppTheme.ts`
- **Guide**: `THEME_SYSTEM.md`
- **Example component**: `src/components/LeadList.tsx`

---

**That's it!** 🎉 Use the theme everywhere for a consistent, maintainable app!
