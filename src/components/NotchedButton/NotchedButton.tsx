import {Text, TouchableOpacity, View} from 'react-native';
import {NotchedButtonProps} from './NotchedButton.types';
import {styles} from './NotchedButton.styles';

export const NotchedButton = ({onPress, style, text}: NotchedButtonProps) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={style}>
      <View style={styles.cutOffBottomRight} />
      <Text style={{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
