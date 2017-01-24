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
        newProps[key] = replaceBindingsWithVariableValue(value, bindingData);
      }
    });
  }

  return _.defaults(newProps, props);
}

function replaceBindingsWithVariableValue(value = "", variables = {}) {
	var bindings = checkForBinding(value);
	let newValue = _.clone(value);
	_.each(bindings, (binding) => {
		let replacementValue = variables[binding.replace(/{{|}}/g, "")];

		newValue = newValue.replace(binding, replacementValue);
	})
	return newValue;
}
