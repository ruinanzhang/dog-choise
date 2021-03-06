import React, { Component } from 'react';
import NavbarPage from './NavBar';
import Promotion from './Promotion';
import 'whatwg-fetch';

import {
  getFromStorage,
} from '../utils/storage';

import TopNav from './TopNav';


const p1Style = {
  fontSize: '45px',
  textAlign: 'center',
  color : '#F7649D',
  fontfamily: 'Roboto Slab',
  margin:"8px",
  border: '2px solid pink',
  width : '100%'
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      // token: '',
      rightToken : false
    };
  }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');

    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('/api/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              isLoading: false,
              rightToken : true,
            });
          } else {
            this.setState({
              isLoading: false,
              rightToken : false
            });
          }
        });
    } else {
      this.setState({
        isLoading: true,
      });
    }
  }


  render() {
    const {
      isLoading,
      rightToken
 } = this.state;
   if (!isLoading){
    return (
      <div className="App">
        <TopNav/>
        <NavbarPage />
        <div>
        <h1 style = {p1Style}>Welcom to AirDog!!</h1>
      
        </div>
        <Promotion />
      </div>
    );

   }
  //  else if (!rightToken && !isLoading){
  //    return (
  //     <div>
  //     {window.location.href = "/Login"}
  //     </div>
   
  //    );
  //  }
   else if (isLoading){
     return (<p style = {p1Style}> Still loading</p>)
   }
    
  }
}
export default Home;