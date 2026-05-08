import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  icon: {
    fontSize: theme.fontSizes.icon,
    fontWeight: theme.fontWeights.bold,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextLight: {
    color: theme.colors.textLight,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeIcon: {
    fontSize: theme.fontSizes.icon,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({
  color,
  heading,
  subheading,
  strong,
  icon,
  style,
  ...props
}) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'textLight' && styles.colorTextLight,
    color === 'primary' && styles.colorPrimary,
    heading && styles.fontSizeHeading,
    subheading && styles.fontSizeSubheading,
    strong && styles.fontWeightBold,
    icon && styles.icon,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
