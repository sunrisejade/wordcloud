import React, { Component } from 'react';
import {connect } from 'react-redux';
import axios from 'axios';
import {addListToStore} from '../actions';

import 'antd/dist/antd.css';
import { Form,Button,Input} from 'antd';

const { Search } = Input;

class InputForm extends Component {

  state = {
    input:'',
  }
 

  handelSearch=(url)=>{

    console.log(url)
    this.axiosPost(url)
    this.setState({
      input:''    
    })
  }
    
  // hangleChange=(e)=>{
  //   this.setState({
  //     input:e.target.value
  //   })
  // }

  axiosPost=(url)=>{
    return axios({
      method: 'post',
      url: 'http://localhost:5000/',
      data: {
        inputUrl: url
      }
    }).then(res => {
      console.log('client side add data receive res?',res.data) 
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

export default connect(mapStateToProps,mapDispatchToProps)(InputForm);

