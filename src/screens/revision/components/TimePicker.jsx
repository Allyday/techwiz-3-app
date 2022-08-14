import { Picker } from '@react-native-picker/picker';

export default function TimePicker({ startTime, setStartTime }) {
  return (
    <Picker
      selectedValue={startTime}
      onValueChange={setStartTime}
      style={{ width: 105 }}
      mode="dropdown"
    >
      {times.map((time) => (
        <Picker.Item key={time} label={time} value={time} />
      ))}
    </Picker>
  );
}

const times = [
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
];
