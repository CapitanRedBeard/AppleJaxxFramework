//Resolves component level
//Only keys that we we resolve right now are text + source
import _ from 'underscore';
import getValue from './getValue';

const KEYS = ["text", "source", "count"];
const RESOLVER = "@@";

export default function resolveBindings(props) {
  const { bindingData } = props
  let newProps = {}
  if(props && bindingData) {
    _.each(KEYS, (key) => {
      let potentialBinding = getValue(props, key);

      if(potentialBinding && potentialBinding.substring(0,2) === RESOLVER && bindingData[potentialBinding.substring(2)] !== undefined){
        newProps[key] = bindingData[potentialBinding.substring(2)];
      }
    });
  }

  console.log("_.defaults(newProps, props)", _.defaults(newProps, props))
  return _.defaults(newProps, props);
}
