import getValue from './getValue';

const getSpecificScreen = (pages, pageKey, bindings) => {
  const page = _.find(pages, (page) => { return page.key === pageKey });
  const bindingData = bindings ? {bindingData: bindings} : {};

  return _.defaults(bindingData, page);

};



export {
  getSpecificScreen
}
