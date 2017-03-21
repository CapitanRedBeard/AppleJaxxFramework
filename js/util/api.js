import RNFetchBlob from 'react-native-fetch-blob'
import { Platform } from 'react-native';

export default async function getURL(url, oAuthProvider, oAuthManager){
  try {
    if(oAuthProvider) {
      return oAuthManager.makeRequest(oAuthProvider, url).then(response => {
        if(response.status >= 400) {
          console.error('Error in getURL', response)
        }
        return response.data;
      });
    }else {
      let response = await fetch(url);
      let responseJson = await response.json();
      if(responseJson.errors) {
        console.warn("Warning, couldn't find dataSource", responseJson.errors);
        return {};
      }
      return responseJson;
    }
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
    }).catch( (err) => {
        console.debug("Unable to find image ", err);
        return null;
      });
  } catch(error) {
    console.debug(" Unable to blob ", error);
    return null
  }
}


export async function urlPost(params){
  let {url, body} = params;
  try {
    let response = await fetch(url, {
    	method: 'post',
    	body: getJSONString(body)
    })
    console.debug("Post successful:  ", response, body);

    return response;
  } catch(error) {
    console.warn("Unable to POST ", error);
    return {}
  }
}

function getJSONString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return JSON.stringify(str);
    }
    return str;
}
