export const fontConfig = {
  // Display - Large prominent text
  displayLarge: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0,
    fontWeight: '700' as const,
    lineHeight: 64,
    fontSize: 57,
  },
  displayMedium: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 0,
    fontWeight: '700' as const,
    lineHeight: 52,
    fontSize: 45,
  },
  displaySmall: {
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0,
    fontWeight: '600' as const,
    lineHeight: 44,
    fontSize: 36,
  },

  // Headline
  headlineLarge: {
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0,
    fontWeight: '600' as const,
    lineHeight: 40,
    fontSize: 32,
  },
  headlineMedium: {
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.15,
    fontWeight: '600' as const,
    lineHeight: 36,
    fontSize: 28,
  },
  headlineSmall: {
    fontFamily: 'Poppins-SemiBold',
    letterSpacing: 0.15,
    fontWeight: '600' as const,
    lineHeight: 32,
    fontSize: 24,
  },

  // Title
  titleLarge: {
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0,
    fontWeight: '500' as const,
    lineHeight: 28,
    fontSize: 22,
  },
  titleMedium: {
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.15,
    fontWeight: '500' as const,
    lineHeight: 24,
    fontSize: 16,
  },
  titleSmall: {
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.1,
    fontWeight: '500' as const,
    lineHeight: 20,
    fontSize: 14,
  },

  // Body - Main content text
  bodyLarge: {
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.15,
    fontWeight: '400' as const,
    lineHeight: 24,
    fontSize: 16,
  },
  bodyMedium: {
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.25,
    fontWeight: '400' as const,
    lineHeight: 20,
    fontSize: 14,
  },
  bodySmall: {
    fontFamily: 'Poppins-Regular',
    letterSpacing: 0.4,
    fontWeight: '400' as const,
    lineHeight: 16,
    fontSize: 12,
  },

  // Label - Small supporting text
  labelLarge: {
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.1,
    fontWeight: '500' as const,
    lineHeight: 20,
    fontSize: 14,
  },
  labelMedium: {
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
    fontWeight: '500' as const,
    lineHeight: 16,
    fontSize: 12,
  },
  labelSmall: {
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.5,
    fontWeight: '500' as const,
    lineHeight: 12,
    fontSize: 10,
  },
};

// Font family constants
export const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
} as const;

// Font size constants
export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  display: 32,
} as const;
