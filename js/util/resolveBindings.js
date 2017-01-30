//Resolves component level
//Only keys that we we resolve right now are text + source
import _ from 'underscore';
import getValue from './getValue';

const KEYS = ["text", "source", "count"];
const STARTING_DELIMITER = "{{";
const ENDING_DELIMITER = "}}";

function checkForBinding(val) {
  return val.match(/{{(.*?)}}/g);
}

export default function resolveBindings(props) {
  const { bindingData } = props; //TODO remove
  let newProps = {};
  if(props && bindingData) {
    _.each(KEYS, (key) => {
      let value = getValue(props, key);
      if(value && checkForBinding(value)){
        newProps[key] = replaceBindingsWithBindingValue(value, bindingData);
      }
    });
  }

  return _.defaults(newProps, props);
}

function replaceBindingsWithBindingValue(value = "", variables = {}) {
	var bindings = checkForBinding(value);
	let newValue = _.clone(value);
	_.each(bindings, (binding) => {
		let replacementValue = variables[binding.replace(/{{|}}/g, "")];
		newValue = newValue.replace(binding, replacementValue);
	})
	return newValue;
}

export function resolveBody(body, bindings) {
  if(body) {
    let newBody = _.clone(body);
    _.each(newBody, (value, key) => {
      if(value && checkForBinding(value)){
        newBody[key] = replaceBindingsWithBindingValue(value, bindings);
        console.log("resolveBody: ", newBody[key], bindings);
      }
    });
    return newBody;
  }else {
    console.warn("No body for resolveBody func")
    return {};
  }
}
