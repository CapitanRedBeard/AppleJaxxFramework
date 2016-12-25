export default function onButtonPress(transition, navigations) {
  let {push, pop, jump, reset} = navigations;
  let {type, index, key} = transition;

  switch(type){
    case "push":
      push(key);
      break;
    case "pop":
      pop();
      break;
    case "jump":
      jump(key);
      break;
    case "reset":
      reset(index);
      break;
  }
}
