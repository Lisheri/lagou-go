import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import actions from './action';
import { eatApple } from './action-eat';

function AppleItem({ apple, eatApple }) {
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

@connect(state => ({ apples: state.apples }), { eatApple })
class Apple extends Component {
  constructor(props) {
    super(props);
  }
  getAppleItem(apples) {
    let data = [];
    apples.forEach(apple => {
      if (!apple.isEaten) {
        data.push(
          <AppleItem
            apple={apple}
            // eatApple={this.props.actions.eatApple}
            eatApple={this.props.eatApple}
            key={apple.id}
          />
        );
      }
    });

    if (!data.length)
      data.push(
        <div className="empty-tip" key="empty">
          苹果篮子空空如也
        </div>
      );

    return data;
  }
  calculateStatus() {
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
    this.props.apples.forEach(apple => {
      let selector = apple.isEaten ? 'appleEaten' : 'appleNow';
      status[selector].quantity++;
      status[selector].weight += apple.weight;
    });
    return status;
  }
  render() {
    let { apples, actions } = this.props;
    console.log(apples, 'state apples');
    let status = this.calculateStatus();
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

        <div className="appleList">{this.getAppleItem(apples)}</div>

        {/* <div className="btn-div">
          <button
            className={isPicking ? 'disabled' : ''}
            onClick={actions.pickApple}
          >
            摘苹果
          </button>
        </div> */}
      </div>
    );
  }
}

// const mapStateToProps = state => ({
//   apples: state.apples
// });

// const mapDispatchToProps = dispatch => ({
//   actions: bindActionCreators(actions, dispatch)
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Apple);

export default Apple;
