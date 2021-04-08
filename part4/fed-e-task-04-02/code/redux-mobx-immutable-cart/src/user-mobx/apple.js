import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class AppleItem extends Component {
  render() {
    let { apple, eatApple } = this.props;
    return (
      <div className="appleItem">
        <div className="apple">
          <img src={require('../images/apple.png')} alt="" />
        </div>
        <div className="info">
          <div className="name">红苹果 - {apple.id}号</div>
          <div className="weight">{apple.weight}克</div>
        </div>
        <div className="btn-div">
          <button onClick={() => eatApple(apple.id)}> 吃掉 </button>
        </div>
      </div>
    );
  }
}

@observer
class Apple extends Component {
  getAppleItem() {
    let data = [];
    this.props.store.apples.forEach(apple => {
      if (!apple.isEaten) {
        data.push(
          <AppleItem
            eatApple={this.props.store.eatApple}
            apple={apple}
            key={apple.id}
          />
        );
      }
    });
    if (!data.length) return <div>its empth</div>;
    return data;
  }
  render() {
    let { status } = this.props.store;
    let {
      appleNow: { quantity: notEatenQuantity, weight: notEatenWeight },
      appleEaten: { quantity: EatenQuantity, weight: EatenWeight }
    } = status;
    return (
      <div className="appleBusket">
        <div className="title">苹果篮子</div>

        <div className="stats">
          <div className="section">
            <div className="head">当前</div>
            <div className="content">
              {notEatenQuantity}个苹果，{notEatenWeight}克
            </div>
          </div>
          <div className="section">
            <div className="head">已吃掉</div>
            <div className="content">
              {EatenQuantity}个苹果，{EatenWeight}克
            </div>
          </div>
        </div>

        <div className="appleList">{this.getAppleItem()}</div>

        {/* <div className="btn-div">
                <button  className={isPicking ? 'disabled' : ''}  onClick={() => pickApple() } >{buttonText}</button>
            </div> */}
      </div>
    );
  }
}

export default Apple;
