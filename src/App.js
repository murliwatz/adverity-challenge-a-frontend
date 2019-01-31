import React, { Component } from 'react';
import './App.css';

import TrendsApiService from './TrendsApiService';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import IotChart from './IotChart';

class App extends Component {

  constructor(props) {
    super(props);
    this.keywordsField = React.createRef();
    this.api = new TrendsApiService();
    this.state = {
      chartVisible: false,
      responseData: null,
      keywords: []
    }
  }

  refreshChart = () => {
    if(this.state.keywords.length > 0) {
      let keywords = this.state.keywords.join(',');
      this.api.getInterestOverTime(keywords).then(res => {
        this.setState({
          chartVisible: true,
          responseData: res.data.data
        })
      }).catch(err => {
        alert(err)
      })
    } else {
      this.setState({
        chartVisible: false,
      })
    }
  }

  onAddClicked = () => {
    const keyword = this.keywordsField.value;
    if(keyword.length > 0) {
      this.setState(prevState => ({
        keywords: [...prevState.keywords, keyword]
      }), () => {
        this.keywordsField.value = "";
        this.refreshChart();
      })
    }
  }

  removeKeyword = (keyword) => {
      var keywords = [...this.state.keywords];
      var index = keywords.indexOf(keyword)
      if (index !== -1) {
        keywords.splice(index, 1);
        this.setState({keywords: keywords}, () => {
          this.refreshChart();
        });
      }
  }

  onKeywordFieldKeyUp = (e) => {
    if(e.keyCode === 13) {
      this.onAddClicked();
    }
  }

  render() {

    const keywords = this.state.keywords.map((keyword) =>
      <span key={keyword}>{keyword} <button onClick={() => this.removeKeyword(keyword)}><FontAwesomeIcon icon={faTrash} /></button></span>
    );

    return (
      <div className="App">
        <header className="App-header">
          Adverity Challenge A
        </header>
        <section className="App-content">
          <div className="add-container">
          <input className="txt-keywords" type="text" ref={input => this.keywordsField = input} onKeyUp={this.onKeywordFieldKeyUp}/>
          <button className="btn btn-add" onClick={this.onAddClicked}><FontAwesomeIcon icon={faPlus} /> Add keyword</button>
          </div>

          <div className="keywords">{keywords}</div>
        
          {this.state.chartVisible && <IotChart data={this.state.responseData} />}
        </section>
      </div>
    );
  }
}

export default App;
