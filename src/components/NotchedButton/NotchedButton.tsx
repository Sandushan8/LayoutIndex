import {Text, TouchableOpacity, View} from 'react-native';
import {NotchedButtonProps} from './NotchedButton.types';
import {styles} from './NotchedButton.styles';

export const NotchedButton = ({onPress, style, text}: NotchedButtonProps) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={style}>
      <View style={styles.cutOffBottomRight} />
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
