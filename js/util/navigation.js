import getValue from './getValue';

const getSpecificScreen = (pages, pageKey) => {
  const page = _.find(pages, (page) => { return page.key === pageKey });
  const title = getValue(page, "title");
  const titleImage = getValue(page, "titleImage");
  const animated = getValue(page, "animated");
  const backButtonTitle = getValue(page, "backButtonTitle");
  const backButtonHidden = getValue(page, "backButtonHidden");
  const navigatorStyle = getValue(page, "navigatorStyle");
  const navigatorButtons = getValue(page, "navigatorButtons");
  const passProps = getValue(page, "passProps");

  return {
    screen: pageKey,
    title,
    titleImage,
    passProps,
    animated,
    backButtonTitle,
    backButtonHidden,
    navigatorStyle,
    navigatorButtons
  }
};



export {
  getSpecificScreen
}
