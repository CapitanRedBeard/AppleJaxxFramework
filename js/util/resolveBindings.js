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
function removeDelimiter(binding) {
  return binding.replace(/{{|}}/g, "");
}

export function resolveBindings(props) {
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


export function resolvePage(page, bindings) {
  let pageString = JSON.stringify(page);
  let matches = checkForBinding(pageString)
  pageString = pageString.replace(/{{(.*?)}}/g, (matched) => {
      return replaceBindingsWithBindingValue(matched, bindings)
    }
  )
  return JSON.parse(pageString)
}

function replaceBindingsWithBindingValue(value = "", variables = {}) {
	var bindings = checkForBinding(value);
	let newValue = _.clone(value);
	_.each(bindings, (binding) => {
		let replacementValue = getValue(variables, removeDelimiter(binding));
    if(replacementValue) {
      newValue = newValue.replace(binding, replacementValue);
    }
	})
	return newValue;
}

export function resolveBody(body, bindings) {
  if(body) {
    let newBody = _.clone(body);
    _.each(newBody, (value, key) => {
      if(value && checkForBinding(value)){
        newBody[key] = replaceBindingsWithBindingValue(value, bindings);
      }
    });
    return newBody;
  }else {
    console.warn("No body for resolveBody func")
    return {};
  }
}
