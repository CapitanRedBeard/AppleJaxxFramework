import getValue from './getValue';

const getSpecificScreen = (pages, pageKey, bindings) => {
  const page = _.find(pages, (page) => { return page.key === pageKey });
  // const title = getValue(page, "title");
  const titleImage = getValue(page, "titleImage");
  const animated = getValue(page, "animated");
  const backButtonTitle = getValue(page, "backButtonTitle");
  const backButtonHidden = getValue(page, "backButtonHidden");
  const navigatorStyle = getValue(page, "navigatorStyle");
  const navigatorButtons = getValue(page, "navigatorButtons");
  const passProps = bindings ? {bindingData: bindings} : {};

  return page

};



export {
  getSpecificScreen
}
