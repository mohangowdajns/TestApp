import { ViewStyle, TextStyle } from 'react-native';
import { Theme } from './theme';

/**
 * Pre-built styled components and utilities for consistent theming
 */

// ============= CARD STYLES =============
export const createCardStyle = (theme: Theme, elevated: boolean = true): ViewStyle => ({
  backgroundColor: theme.colors.surface as string,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing.md,
  ...(elevated ? theme.shadows.md : {}),
});

// ============= BUTTON STYLES =============
export const createPrimaryButtonStyle = (theme: Theme): ViewStyle => ({
  backgroundColor: theme.colors.primary as string,
  paddingVertical: 12,
  paddingHorizontal: theme.spacing.lg,
  borderRadius: theme.borderRadius.md,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: theme.layout.buttonHeight,
  ...theme.shadows.sm,
});

export const createSecondaryButtonStyle = (theme: Theme): ViewStyle => ({
  backgroundColor: theme.colors.surfaceVariant as string,
  paddingVertical: 12,
  paddingHorizontal: theme.spacing.lg,
  borderRadius: theme.borderRadius.md,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: theme.layout.buttonHeight,
  ...theme.shadows.sm,
});

export const createOutlineButtonStyle = (theme: Theme): ViewStyle => ({
  backgroundColor: 'transparent',
  borderWidth: 2,
  borderColor: theme.colors.primary as string,
  paddingVertical: 12,
  paddingHorizontal: theme.spacing.lg,
  borderRadius: theme.borderRadius.md,
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: theme.layout.buttonHeight,
});

// ============= INPUT STYLES =============
export const createInputStyle = (theme: Theme, focused: boolean = false): ViewStyle => ({
  height: theme.layout.inputHeight,
  borderRadius: theme.borderRadius.md,
  borderWidth: 1,
  borderColor: focused ? (theme.colors.primary as string) : (theme.colors.border as string),
  backgroundColor: theme.colors.surface as string,
  paddingHorizontal: theme.spacing.md,
  paddingVertical: theme.spacing.sm,
});

// ============= BADGE STYLES =============
export const createBadgeStyle = (
  theme: Theme,
  type: 'success' | 'warning' | 'error' | 'info' | 'primary' = 'info',
): ViewStyle => {
  const colorMap = {
    success: theme.colors.success as string,
    warning: theme.colors.warning as string,
    error: theme.colors.error as string,
    info: theme.colors.info as string,
    primary: theme.colors.primary as string,
  };

  return {
    backgroundColor: colorMap[type],
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.full,
  };
};

export const createBadgeTextStyle = (theme: Theme): TextStyle => ({
  fontSize: theme.spacing.xs + 2, // 12px
  fontWeight: '600',
  color: '#FFFFFF',
});

// ============= STATUS BADGE STYLES =============
export const getStatusColors = (theme: Theme, status: string) => {
  const statusMap: Record<string, { bg: string; text: string }> = {
    completed: { bg: theme.colors.success as string, text: '#FFF' },
    'in progress': { bg: theme.colors.warning as string, text: '#FFF' },
    planning: { bg: theme.colors.info as string, text: '#FFF' },
    pending: { bg: theme.colors.warning as string, text: '#FFF' },
    inactive: { bg: theme.colors.textTertiary as string, text: '#FFF' },
    default: { bg: theme.colors.surfaceVariant as string, text: theme.colors.text as string },
  };

  return statusMap[status.toLowerCase()] || statusMap.default;
};

export const createStatusBadgeStyle = (theme: Theme, status: string): ViewStyle => {
  const colors = getStatusColors(theme, status);
  return {
    backgroundColor: colors.bg,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  };
};

// ============= DIVIDER STYLES =============
export const createDividerStyle = (theme: Theme): ViewStyle => ({
  height: 1,
  backgroundColor: theme.colors.divider as string,
  marginVertical: theme.spacing.md,
});

// ============= HEADER STYLES =============
export const createHeaderStyle = (theme: Theme): ViewStyle => ({
  backgroundColor: theme.colors.primary as string,
  paddingVertical: theme.spacing.lg,
  paddingHorizontal: theme.spacing.md,
  borderRadius: theme.borderRadius.lg,
  ...theme.shadows.md,
});

export const createHeaderTextStyle = (theme: Theme): TextStyle => ({
  fontSize: 18,
  fontWeight: 'bold',
  color: '#FFFFFF',
});

// ============= STAT CARD STYLES =============
export const createStatCardStyle = (theme: Theme): ViewStyle => ({
  flex: 1,
  backgroundColor: theme.colors.surface as string,
  padding: theme.spacing.md,
  borderRadius: theme.borderRadius.lg,
  alignItems: 'center',
  justifyContent: 'center',
  marginHorizontal: theme.spacing.xs,
  ...theme.shadows.md,
});

export const createStatNumberStyle = (theme: Theme): TextStyle => ({
  fontSize: 20,
  fontWeight: 'bold',
  marginTop: theme.spacing.sm,
  color: theme.colors.primary as string,
});

export const createStatLabelStyle = (theme: Theme): TextStyle => ({
  fontSize: 12,
  color: theme.colors.textSecondary as string,
  marginTop: theme.spacing.xs,
});

// ============= PROJECT CARD STYLES =============
export const createProjectCardStyle = (theme: Theme): ViewStyle => ({
  backgroundColor: theme.colors.surface as string,
  borderRadius: theme.borderRadius.lg,
  padding: theme.spacing.md,
  marginBottom: theme.spacing.md,
  ...theme.shadows.md,
});

export const createProjectNameStyle = (theme: Theme): TextStyle => ({
  fontSize: 16,
  fontWeight: '600',
  marginBottom: theme.spacing.xs,
  color: theme.colors.text as string,
});

export const createProjectAddressStyle = (theme: Theme): TextStyle => ({
  fontSize: 14,
  color: theme.colors.textSecondary as string,
  marginBottom: theme.spacing.sm,
});

// ============= CONTAINER STYLES =============
export const createContainerStyle = (theme: Theme): ViewStyle => ({
  flex: 1,
  backgroundColor: theme.colors.background as string,
});

export const createPaddedContainerStyle = (theme: Theme): ViewStyle => ({
  flex: 1,
  backgroundColor: theme.colors.background as string,
  padding: theme.spacing.md,
});

// ============= TEXT STYLES =============
export const createHeadingStyle = (theme: Theme, level: 1 | 2 | 3 = 1): TextStyle => {
  const sizes: Record<number, number> = { 1: 28, 2: 24, 3: 20 };
  return {
    fontSize: sizes[level],
    fontWeight: 'bold',
    color: theme.colors.text as string,
  };
};

export const createBodyTextStyle = (theme: Theme): TextStyle => ({
  fontSize: 14,
  color: theme.colors.text as string,
  lineHeight: 20,
});

export const createSecondaryTextStyle = (theme: Theme): TextStyle => ({
  fontSize: 14,
  color: theme.colors.textSecondary as string,
});

export const createSmallTextStyle = (theme: Theme): TextStyle => ({
  fontSize: 12,
  color: theme.colors.textTertiary as string,
});

// ============= LAYOUT UTILITIES =============
export const createHorizontalDividerStyle = (theme: Theme, indent: boolean = false): ViewStyle => ({
  height: 1,
  backgroundColor: theme.colors.divider as string,
  marginVertical: theme.spacing.md,
  ...(indent && {
    marginHorizontal: theme.spacing.md,
  }),
});

export const createSpacingValue = (
  theme: Theme,
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | 'xxxl',
): number => {
  return theme.spacing[size];
};
