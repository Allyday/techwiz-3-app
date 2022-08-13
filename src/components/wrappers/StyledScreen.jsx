import { ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function StyledScreen({ children, scrollable, ...props }) {
  const { colors } = useTheme();
  const Screen = scrollable ? ScrollView : View;

  return (
    <View style={{ backgroundColor: colors.secondary, flex: 1 }}>
      <Screen
        {...props}
        style={[
          {
            backgroundColor: 'white',
            flex: 1,
            borderTopEndRadius: 30,
            overflow: 'hidden',
          },
          props.style,
        ]}
      >
        {children}
      </Screen>
    </View>
  );
}
