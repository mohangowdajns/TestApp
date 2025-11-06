/**
 * Theme System - Central export point
 * Use this file to export all theme-related utilities and types
 */

// Core theme exports
export { lightTheme, darkTheme, spacing, borderRadius, shadows, layout, animation } from './theme';
export type { Theme } from './theme';

// Colors
export { lightColors, darkColors } from './color';

// Typography
export { fontConfig, fontFamily, fontSize } from './fonts';

// Component utilities
export * from './components';
