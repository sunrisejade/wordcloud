import React, { Component } from 'react';
import {connect } from 'react-redux';
import WordCloud from "react-d3-cloud";



class GenerateCloud extends Component {

  render(){
    const lists=this.props.data
    const fontSizeMapper = word => Math.log2(word.value) * 40;
    const rotate = word => word.value % 360;

    return (
          <div> 
            {(!lists)? null:
                <WordCloud
                  width={700}
                  height={700}
                  data={lists}
                  fontSizeMapper={fontSizeMapper}
                  rotate={rotate}    
              /> 
            }             
          </div>          
    )
  }  
}

const mapStateToProps = (state) => {
  return {
    data:state
    } 
}


export default connect(mapStateToProps)(GenerateCloud);


// react-d3-cloud's data shape:
// const data = [
//   { text: 'Hey', value: 1000 },
//   { text: 'lol', value: 200 },
// ];
// fontSizeMapper:use to adjust each element's size (px