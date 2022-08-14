import Slider from '@react-native-community/slider';
import { useTheme } from 'react-native-paper';

export default function DurationSlider({ duration, setDuration }) {
  const { colors } = useTheme();
  return (
    <Slider
      value={duration}
      step={0.25} // 15min
      minimumValue={0}
      maximumValue={3}
      onValueChange={setDuration}
      style={{ width: '100%', height: 40 }}
      minimumTrackTintColor={colors.darkBlue}
      maximumTrackTintColor={colors.lightGrey}
    />
  );
}
