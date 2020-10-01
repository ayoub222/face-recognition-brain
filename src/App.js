import React, { Component } from 'react';
import Clarifai from 'clarifai';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from './componets/Navigation/Navigation';
import FaceRecognition from './componets/FaceRecognition/FaceRecognition';
import Logo from './componets/Logo/Logo';
import ImageLinkForm from './componets/ImageLinkForm/ImageLinkForm';
import Signin from './componets/Signin/Signin';
import Register from './componets/Register/Register';
import Rank from './componets/Rank/Rank';
import 'tachyons';



const app = new Clarifai.App({
 apiKey: 'dd6a3c5f99fa4b12b83235d7feb1d1f0'
});


const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends Component {
  constructor()
  {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      box: {},
      route: 'signin',
      isSignin: false

    }
  }

calculateFaceLocation = (data) => {

    const clarfaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('imputimg');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarfaiFace.left_col * width,
      topRow:  clarfaiFace.top_row * height,
      rightCol: width - (clarfaiFace.right_col * width),
      bottomRow: height -(clarfaiFace.bottom_row * height)
    }
}

displayFaceBox = (box) => {
  console.log(box);
  this.setState({box: box});
}

onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

onButtonSubmit = () => {
  this.setState({imgUrl: this.state.input});
  app.models.predict(
     Clarifai.FACE_DETECT_MODEL,
     this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
    
}

onRouteChange = (route) => {
  if(route === 'signout'){
    this.setState({isSignin:false})
  }else if(route === 'home'){
    this.setState({isSignin:true})
  }
  this.setState({route:route});
}

  render(){
     return (
    <div className="App">
    <Particles className='particles' 
              params={particlesOptions}
            />
    <Navigation isSignin={this.state.isSignin} onRouteChange={this.onRouteChange} />
    {
      this.state.route === 'home'
      ? <div>
         <Logo />
         <Rank />
         <ImageLinkForm 
         onInputChange={this.onInputChange}
         onButtonSubmit={this.onButtonSubmit}
         />
         <FaceRecognition box={this.state.box} imgUrl ={this.state.imgUrl} />
        </div>
      :(
         this.state.route === 'signin'
         ? <Signin onRouteChange={this.onRouteChange} /> 
         : <Register onRouteChange={this.onRouteChange} />
        ) 
      
      
    }
    </div>
   );
  }
 
}

export default App;
