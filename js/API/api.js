export default async function getURL(url){
  console.log("Fetching ", url);
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
