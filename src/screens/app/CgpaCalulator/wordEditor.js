import React, {useState, useRef} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import Input from '../../../components/Input';
import styles from '../../../components/Input/styles';
import colors from '../../../constants/colors';

const WordEditor = () => {
  const [text, setText] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const [textColor, setTextColor] = useState('black');
  const [fontFamily, setFontFamily] = useState('sans-serif');
  const fontSizeDropdownRef = useRef(null);
  const textColorDropdownRef = useRef(null);
  const fontFamilyDropdownRef = useRef(null);

  const handleTextChange = newText => {
    setText(newText);
  };

  const handleBoldButtonPress = () => {
    setIsBold(!isBold);
  };

  const handleItalicButtonPress = () => {
    setIsItalic(!isItalic);
  };

  const handleUnderlineButtonPress = () => {
    setIsUnderline(!isUnderline);
  };

  const handleFontSizeSelect = (index, value) => {
    setFontSize(parseInt(value, 10));
    fontSizeDropdownRef.current && fontSizeDropdownRef.current.hide();
  };

  const handleTextColorSelect = (index, value) => {
    setTextColor(value.toLowerCase());
    textColorDropdownRef.current && textColorDropdownRef.current.hide();
  };

  const handleFontFamilySelect = (index, value) => {
    setFontFamily(value.toLowerCase());
    fontFamilyDropdownRef.current && fontFamilyDropdownRef.current.hide();
  };

  const getTextStyle = () => {
    let textStyle = {};
    if (isBold) {
      textStyle.fontWeight = 'bold';
    }
    if (isItalic) {
      textStyle.fontStyle = 'italic';
    }
    if (isUnderline) {
      textStyle.textDecorationLine = 'underline';
    }
    textStyle.fontSize = fontSize;
    textStyle.color = textColor;
    textStyle.fontFamily = fontFamily;
    return textStyle;
  };

  const handleFormattedText = () => {
    // Here, you can handle the formatted text
    // For example, you can send it to the backend or store it in a state variable
    console.log('Formatted Text:', text);
    // Perform further actions with the formatted text as needed
  };

  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={handleBoldButtonPress}
          style={{
            paddingHorizontal: 10,
            backgroundColor: isBold ? 'gray' : 'transparent',
            borderRadius: 5,
          }}>
          <Text>Bold</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleItalicButtonPress}
          style={{
            paddingHorizontal: 10,
            backgroundColor: isItalic ? 'gray' : 'transparent',
            borderRadius: 5,
          }}>
          <Text>Italic</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleUnderlineButtonPress}
          style={{
            paddingHorizontal: 10,
            backgroundColor: isUnderline ? 'gray' : 'transparent',
            borderRadius: 5,
          }}>
          <Text>Underline</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>Font Size:</Text>
        <ModalDropdown
          ref={fontSizeDropdownRef}
          options={[...Array(15)].map((_, index) => (index + 1).toString())}
          defaultValue={fontSize.toString()}
          onSelect={handleFontSizeSelect}
          dropdownStyle={{width: 150, height: 'auto'}}
          style={{marginLeft: 10}}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>Text Color:</Text>
        <ModalDropdown
          ref={textColorDropdownRef}
          options={[
            'black',
            'white',
            'red',
            'blue',
            'green',
            'yellow',
            'orange',
            'purple',
            'gray',
            'pink',
            'brown',
            'cyan',
            'magenta',
            'silver',
            'gold',
          ]}
          defaultValue={textColor}
          onSelect={handleTextColorSelect}
          dropdownStyle={{width: 150, height: 'auto'}}
          style={{marginLeft: 10}}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text>Font Family:</Text>
        <ModalDropdown
          ref={fontFamilyDropdownRef}
          options={[
            'Arial',
            'Helvetica',
            'Times New Roman',
            'Courier New',
            'Verdana',
            'Georgia',
            'Palatino',
            'Comic Sans MS',
            'Trebuchet MS',
            'monospace',
            'serif',
          ]}
          defaultValue={fontFamily}
          onSelect={handleFontFamilySelect}
          style={{marginLeft: 10}}
          dropdownStyle={{width: 150, height: 'auto'}}
          dropdownTextStyle={{fontSize: 14}}
        />
      </View>

      <Input
        style={[getTextStyle(), styles.input, styles.outlined]}
        placeholderTextColor={colors.grey}
        onChangeText={handleTextChange}
        value={text}
        multiline
        placeholder="Type Notes"
        numberOfLines={10}
      />
      <Text>Formatted Text: {text}</Text>

      <TouchableOpacity onPress={handleFormattedText}>
        <Text>Store Formatted Text</Text>
      </TouchableOpacity>
      {/* Render the formatted text in a Text component */}
      <Text style={getTextStyle()}>{text}</Text>
    </View>
  );
};

export default WordEditor;

/** 

import React, {useState} from 'react';
import {View, TextInput, Button} from 'react-native';
import {Text} from 'react-native-paper';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Input from '../../../components/Input';
import colors from '../../../constants/colors';
import styles from '../../../components/Input/styles';

const WordEditor = () => {
  const [text, setText] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const handleTextChange = newText => {
    setText(newText);
  };

  const handleBoldButtonPress = () => {
    setIsBold(!isBold);
  };

  const handleItalicButtonPress = () => {
    setIsItalic(!isItalic);
  };

  const handleUnderlineButtonPress = () => {
    setIsUnderline(!isUnderline);
  };

  const getTextStyle = () => {
    let textStyle = {};
    if (isBold) {
      textStyle.fontWeight = 'bold';
    }
    if (isItalic) {
      textStyle.fontStyle = 'italic';
    }
    if (isUnderline) {
      textStyle.textDecorationLine = 'underline';
    }
    return textStyle;
  };

  return (
    <PaperProvider>
      <SafeAreaView style={{flex: 1}}>
        <StatusBar barStyle="dark-content" />
        <View>
          <View style={{flexDirection: 'row'}}>
            <Button title="Bold" onPress={handleBoldButtonPress} />
            <Button title="Italic" onPress={handleItalicButtonPress} />
            <Button title="Underline" onPress={handleUnderlineButtonPress} />
            
          </View>
          <Input
            style={[getTextStyle(), styles.input, styles.outlined]}
            placeholderTextColor={colors.grey}
            onChangeText={handleTextChange}
            value={text}
            multiline
            placeholder="Type Notes"
            numberOfLines={4}
          />
          <Text>Formatted Text: {text}</Text>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default WordEditor;
*/
