import {
  musume,
  angerme,
  juice,
  kobushi,
  tsubaki,
  beyo,
} from './groupsReducer';

export default (selectedGroup = musume, action) => {
  if (action.type === 'SELECTED_GROUP') {
    switch (action.payload) {
      case 'angerme':
        selectedGroup = angerme;
        return selectedGroup;
      case 'juice':
        selectedGroup = juice;
        return selectedGroup;
      case 'kobushi':
        selectedGroup = kobushi;
        return selectedGroup;
      case 'tsubaki':
        selectedGroup = tsubaki;
        return selectedGroup;
      case 'beyo':
        selectedGroup = beyo;
        return selectedGroup;
      default:
        return musume;
    }
  }
  return selectedGroup;
};
