import {
  musume,
  angerme,
  juice,
  kobushi,
  tsubaki,
  beyo
} from './groupsReducer';

export default (selectedGroup = musume, action) => {
  console.log(action);
  if (action.type === 'SELECTED_GROUP') {
    switch (action.payload) {
      case 'angerme':
        selectedGroup = angerme;
        console.log(selectedGroup);
        return selectedGroup;
      case 'juice':
        selectedGroup = juice;
        console.log(selectedGroup);
        return selectedGroup;
      case 'kobushi':
        selectedGroup = kobushi;
        console.log(selectedGroup);
        return selectedGroup;
      case 'tsubaki':
        selectedGroup = tsubaki;
        console.log(selectedGroup);
        return selectedGroup;
      case 'beyo':
        selectedGroup = beyo;
        console.log(selectedGroup);
        return selectedGroup;
      default:
        return musume;
    }
  }
  return selectedGroup;
};
