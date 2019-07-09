import React, { Component } from 'react'
import { Provider } from 'react-redux'
import {createStore} from 'redux';
import InputForm from './components/InputForm';
import GenerateCloud from './components/GenerateCloud';
import reducer from './reducer';


//UI 
import 'antd/dist/antd.css';
import { Layout} from 'antd';
import { Row, Col } from 'antd';
const { Header, Content, Footer} = Layout;


const store=createStore(reducer)

class App extends Component {

  render(){
    
    return (
      <Provider store={ store }>
        <Layout>
          <Header style={{ background: 'dark', padding: 0 }}>
            <h1 style={{textAlign:'center',color:'white',fontSize:30}}>Wordcloud</h1>
          </Header><br/>
            <Content style={{background: '#fff',minHeight:'100vh',padding:20}}>
              <Row style={{display:'flex', justifyContent: 'center'}}>
                <Col span={24} style={{display:'flex', justifyContent: 'center',width:'70%',padding:20}}>
                  <InputForm /> 
                </Col>
              </Row>
              <Row style={{margin:20}}>
                <Col span={24} style={{display:'flex', justifyContent: 'center'}}>
                  <GenerateCloud/>
                </Col>
              </Row>       
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                    Created by SunriseJade
            </Footer>
        </Layout>
      </Provider>
      
      
    );
  }  
}

export default App;
