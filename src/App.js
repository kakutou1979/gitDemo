/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from './common/axios';

const {width} = Dimensions.get('window');
const cols = 2;
const vMargin = 20;
const hMargin = 25;
const cellWH = (width - 2 * vMargin - 15) / cols;

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = () => {
    axios
      .get('/v1/jp/hashtag?result_limit=20&page=1&ie_cache_fix=1605685192594')
      .then((response) => {
        setData(response.data.hashtag_list);
      })
      .catch((error) => {
        console.log(error.messages);
      });
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={0.5}>
        <View style={styles.item}>
          <Image source={{uri: item.source_image_url}} style={styles.img} />
          {/* <Text style={{ marginTop: 5, textAlign: 'center' }} numberOfLines={1}>{item.title}</Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 15,
  },

  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  item: {
    width: cellWH,
    marginTop: hMargin,
    alignItems: 'center',
  },

  img: {
    width: cellWH,
    height: cellWH,
    borderRadius: 5,
  },
});

export default App;
