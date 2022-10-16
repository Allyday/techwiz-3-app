import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StyledScreen({
  children,
  scrollable,
  hasBottomInset,
  ...props
}) {
  const { colors } = useTheme();
  const Screen = scrollable ? ScrollView : View;

  return (
    <>
      <View
        style={{
          backgroundColor: colors.secondary,
          flex: 1,
        }}
      >
        <Screen
          {...props}
          style={[
            {
              backgroundColor: 'white',
              flex: 1,
              borderTopStartRadius: 30,
              borderTopEndRadius: 30,

              overflow: 'hidden',
            },
            props.style,
          ]}
        >
          {children}
        </Screen>
      </View>
      {hasBottomInset && (
        <SafeAreaView edges={['bottom']} style={{ backgroundColor: 'white' }} />
      )}
    </>
  );
}
