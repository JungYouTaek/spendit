import React, { Component } from 'react';
import 'styles/css/Breakdown.css';

class Breakdown extends Component {
  render() {
    return (
      <div className="breakdown">
        <h2 className="breakdown__heading">조회 기록</h2>
        <button id="breakdown__reset" className="breakdown__reset" onClick={this.props.resetAlert}>초기화</button>
        <div id="breakdown" className="breakdown__div"></div>
      </div>
    );
  }
}

export default Breakdown;