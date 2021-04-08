import React from 'react';
import ReactDOM from 'react-dom';

import Apple from './user-mobx/apple';
import { observable, computed, action, autorun } from 'mobx';

class appleStore {
  @observable
  apples = [
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
  @computed
  get status() {
    let status = {
      appleNow: {
        quantity: 0,
        weight: 0
      },
      appleEaten: {
        quantity: 0,
        weight: 0
      }
    };
    this.apples.forEach(apple => {
      let selected = apple.isEaten ? 'appleNow' : 'appleEaten';
      status[selected].quantity++;
      status[selected].weight += apple.weight;
    });
    return status;
  }
  @action
  eatApple = appleId => {
    this.apples.forEach((apple, index) => {
      if (apple.id == appleId) {
        this.apples[index].isEaten = true;
      }
    });
  };
}

const store = new appleStore();

autorun(() => {
  if (store.isPicking) {
    console.log('is picking');
  }
  console.log(store, 'apples');
});

ReactDOM.render(<Apple store={store} />, document.getElementById('app'));
