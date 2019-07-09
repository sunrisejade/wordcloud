import React, { Component } from 'react';
import {connect } from 'react-redux';
import axios from 'axios';
import {addListToStore} from '../actions';

// UI Lib
import 'antd/dist/antd.css';
import {Input} from 'antd';

const { Search } = Input;

class SearchBar extends Component {

  handelSearch=(url)=>{
    this.axiosPost(url)
  }

  axiosPost=(url)=>{
    return axios({
      method: 'post',
      url: 'http://localhost:5000/',
      data: {
        inputUrl: url
      }
    }).then(res => {
      // console.log('client side receive lists:',res.data) 
      const data = res.data;
      return data
    }).then(data=>this.props.addList(data))
}

  render(){
    return (  
      <div>
          <h2>Input url to generate word cloud:</h2>
          <Search
            placeholder="input search text"
            enterButton="Search"
            size="large"
            onSearch={url =>this.handelSearch(url)}
          />
      </div>   

           
    );
  }  
}

const mapStateToProps = (state) => {
  return {
    data:state
    } 
}
const mapDispatchToProps = (dispatch) =>{
  return {
    addList:(data)=>{
      dispatch(addListToStore(data))
    },
  }
} 

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar);

