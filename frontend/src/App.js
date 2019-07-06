import React, { Component } from 'react'
import axios from 'axios';
import WordCloud from "react-d3-cloud";


class App extends Component {

  state = {
    list: [ ]
  }
 
  componentDidMount() {
    axios.get(`http://localhost:5000/`)
    .then(res => {
      const data = res.data;
      this.setState({ list:data });
    })
 }
  render(){
  
    const fontSizeMapper = word => Math.log2(word.value) * 40;
    const rotate = word => word.value % 360;
    return (
      <div className="App">
        <header className="App-header">
          <h1 style={{textAlign:'center'}}>Wordcloud</h1>
        </header>       
        <WordCloud
          width={1000}
          height={1000}
          data={this.state.list}
          fontSizeMapper={fontSizeMapper}
          rotate={rotate}    
        />
      </div>
    );
  }  
}

export default App;
