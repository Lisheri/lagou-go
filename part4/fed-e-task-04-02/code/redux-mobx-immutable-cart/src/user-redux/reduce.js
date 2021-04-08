import { combineReducers } from 'redux';
const initState = [
  {
    id: 0,
    weight: 233,
    isEaten: false
  },
  {
    id: 1,
    weight: 235,
    isEaten: true
  },
  {
    id: 2,
    weight: 256,
    isEaten: false
  }
];

const apples = (state = initState, action) => {
  switch (action.type) {
    case 'EAT_APPLE':
      return state.map(
        m => (m.id === action.appleId ? { ...m, isEaten: !m.isEaten } : m)
      );

    default:
      return state;
  }
};

const root = combineReducers({
  apples
});

export default root;
