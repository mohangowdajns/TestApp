# 📂 Theme System File Structure

## Theme Directory

```
src/theme/
├── index.ts                 # Central export point
├── color.ts                 # Light/dark color definitions
├── fonts.ts                 # Typography system (Poppins)
├── theme.ts                 # Main theme with spacing, shadows, layout
├── components.ts            # Pre-built component style creators
└── utils.ts                 # (Optional utility functions)
```

## Context & Hooks

```
src/context/
└── ThemeContext.tsx         # Theme provider (already configured)

src/hooks/
└── useAppTheme.ts          # Custom hook to access theme
```

## Example Components

```
src/components/
├── LeadList.tsx             # ✅ Updated to use theme
├── CustonButton.tsx         # ✅ Updated to use theme
├── LeadForm.tsx             # (Can be updated next)
├── LanguageModal.tsx        # (Can be updated next)
└── ...
```

## Navigation

```
src/navigation/
└── AppNavigator.tsx         # ✅ Already wrapped with PaperProvider
```

## Documentation

```
/
├── THEME_SYSTEM.md          # 📖 Comprehensive guide
├── QUICK_START.md           # 🚀 Quick reference
├── IMPLEMENTATION_COMPLETE.md # ✅ Summary
└── package.json             # (Dependencies already installed)
```

---

## How to Use

### 1. Import useAppTheme Hook

```tsx
import { useAppTheme } from '../hooks/useAppTheme';
```

### 2. Import Pre-built Component Styles

```tsx
import {
  createCardStyle,
  createProjectCardStyle,
  createStatusBadgeStyle,
  createBadgeTextStyle,
  // ... more as needed
} from '../theme/components';
```

### 3. Use in Component

```tsx
export function MyComponent() {
  const theme = useAppTheme();

  return (
    <View style={createCardStyle(theme)}>
      <Text style={theme.fonts.titleMedium}>Title</Text>
      <Text style={theme.fonts.bodyMedium}>Content</Text>
    </View>
  );
}
```

---

## What's Already Done

✅ **Core Theme System**

- Color definitions (light/dark)
- Typography system
- Spacing, shadows, border-radius
- Layout constants
- Animation durations

✅ **Component Utilities**

- Card styles
- Button variants
- Badge styles
- Status badges
- Input styles
- Header styles
- Stat card styles
- Project card styles
- Text styles

✅ **Setup**

- AppNavigator with PaperProvider
- ThemeContext configured
- Custom useAppTheme hook
- Example components updated

✅ **Documentation**

- THEME_SYSTEM.md (comprehensive)
- QUICK_START.md (reference)
- IMPLEMENTATION_COMPLETE.md (summary)

---

## What to Do Next

1. **LoginScreen.tsx** - Update to use theme colors
2. **AppNavigator.tsx** - Update drawer header to use theme
3. **MainTabs.tsx** - Update tab styling
4. **All other screens** - Gradually migrate to theme
5. **Test dark mode** - Toggle theme and verify

---

## Key Files to Reference

| File               | Purpose                | Updated |
| ------------------ | ---------------------- | ------- |
| `theme.ts`         | Main theme definitions | ✅      |
| `color.ts`         | Color palette          | ✅      |
| `fonts.ts`         | Typography             | ✅      |
| `components.ts`    | Pre-built styles       | ✅      |
| `useAppTheme.ts`   | Custom hook            | ✅      |
| `ThemeContext.tsx` | Provider               | ✅      |
| `AppNavigator.tsx` | Navigation setup       | ✅      |
| `LeadList.tsx`     | Example                | ✅      |
| `CustonButton.tsx` | Example                | ✅      |

---

## Imports Cheat Sheet

```tsx
// Get theme in any component
import { useAppTheme } from '../hooks/useAppTheme';
const theme = useAppTheme();

// Pre-built component styles
import {
  createCardStyle,
  createProjectCardStyle,
  createStatusBadgeStyle,
  createBadgeTextStyle,
  createStatCardStyle,
  createStatNumberStyle,
  createStatLabelStyle,
  createPrimaryButtonStyle,
  createSecondaryButtonStyle,
  createOutlineButtonStyle,
  createInputStyle,
  createHeaderStyle,
  createHeadingStyle,
  createBodyTextStyle,
} from '../theme/components';

// Theme type (if you need it)
import { Theme } from '../theme/theme';

// All theme exports
import {
  lightTheme,
  darkTheme,
  spacing,
  borderRadius,
  shadows,
  layout,
  animation,
  lightColors,
  darkColors,
  fontConfig,
  fontFamily,
  fontSize,
} from '../theme';
```

---

## Quick Command Reference

```bash
# To see what's available in theme
grep -r "export" src/theme/

# To find components using old styles
grep -r "#FFFFFF\|#000000\|#3A5FE8" src/components/

# To check if component uses theme
grep -r "useAppTheme\|theme\." src/screens/
```

---

## File Size Reference

| File             | Lines | Purpose           |
| ---------------- | ----- | ----------------- |
| `theme.ts`       | ~200  | Main theme config |
| `color.ts`       | ~60   | Color definitions |
| `fonts.ts`       | ~100  | Typography        |
| `components.ts`  | ~280  | Pre-built styles  |
| `useAppTheme.ts` | ~10   | Hook              |

**Total**: ~650 lines of clean, reusable theme code

---

**Everything is ready to use!** 🎉

Start using the theme in your components today!
