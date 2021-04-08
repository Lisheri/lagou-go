export const EAT_APPLE = 'EAT_APPLE';

let actions = {
  eatApple: appleId => ({
    type: 'EAT_APPLE',
    appleId
  })
};

export default actions;
