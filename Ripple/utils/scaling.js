import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

// Base dimensions from iPhone 13 (baseline design)
const baseWidth = 390;
const baseHeight = 844;

// Check if device is an iPad
const isIPad = Platform.OS === 'ios' && Platform.isPad;

// Scaling factors with iPad adjustment
const scale = (size) => {
  if (isIPad) {
    // For iPad, we use a more moderate scaling to prevent elements from becoming too large
    return (Math.min(width, height) / baseWidth) * size * 0.8;
  }
  return (width / baseWidth) * size;
};

const verticalScale = (size) => {
  if (isIPad) {
    // For iPad, we use a more moderate vertical scaling
    return (Math.min(width, height) / baseHeight) * size * 0.8;
  }
  return (height / baseHeight) * size;
};

const moderateScale = (size, factor = 0.5) => {
  if (isIPad) {
    // For iPad, we use a more conservative moderation factor
    factor = 0.3;
  }
  return size + (scale(size) - size) * factor;
};

export { scale, verticalScale, moderateScale, isIPad }; 