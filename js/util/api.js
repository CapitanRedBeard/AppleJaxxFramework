import RNFetchBlob from 'react-native-fetch-blob'
import { Platform } from 'react-native';

export default async function getURL(url){
  try {
    let response = await fetch(url);
    let responseJson = await response.json();
    return responseJson;
    // return fetch(url).then((res) => res.json());
  } catch(error) {
    console.warn("Warning, couldn't find dataSource", error);
    return {}
  }
}

export async function getImage(url){
  try {
    return RNFetchBlob.config({
      fileCache : true,
      appendExt : 'png'  // by adding this option, the temp files will have a file extension
    }).fetch('GET', url).then((res) => {
      // Beware that when using a file path as Image source on Android,
      // you must prepend "file://"" before the file path
      return (Platform.OS === 'android' ? 'file://' + res.path()  : '' + res.path());
    })
  } catch(error) {
    console.warn("Derp Unable to resolve image ", error);
    return {}
  }
}
