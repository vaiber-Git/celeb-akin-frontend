import { Component } from "react";
import ParticlesBg from 'particles-bg';
import "./App.css";
import SignIn from "../SignIn/SignIn";
import Register from "../Register/Register";
import Navigation from "../Navigation/Navigation";
import ImageUrl from "../ImageUrl/ImageUrl";
import Entries from "../Entries/Entries";
import ImageComponent from "../ImageComponent/ImageComponent";

const initialState = {
  input: "",
  inputUrl: "",
  route: "signin",
  isSignedIn: false,
  faceIdentified: "",
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
  token: localStorage.getItem('token') || "",
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  loadToken = (data) => {
    localStorage.setItem('token', data); // store JWT
    this.setState({token: data});
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  identifyCelebName = (data) => {
    let celebName = data.outputs[0].data.regions[0].data.concepts[0].name.toUpperCase();
    let percentage = data.outputs[0].data.regions[0].data.concepts[0].value;
    console.log(celebName, '+', percentage);
    let messageToBeDisplayed = `You look ${Math.ceil(
      percentage * 100
    )} % like ${celebName}`;
    this.setState({ faceIdentified: messageToBeDisplayed });
  };

  onButtonSubmit = () => {
    this.setState({inputUrl: this.state.input});
      fetch('https://integrated-backend-api-prod.deltoro.shop/imageurl', {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${this.state.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
	      this.identifyCelebName(response);
        console.log(this.state.token);
        if (response) {
          fetch('https://integrated-backend-api-prod.deltoro.shop/image', {
            method: 'put',
            headers: {
            'Authorization': `Bearer ${this.state.token}`,
            'Content-Type': 'application/json'
        },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count.entries}))
          })
          .catch(err => console.log(err));

        }
      })
      .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      localStorage.removeItem('token');
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const { isSignedIn, inputUrl, route, faceIdentified } = this.state;
    return (
        <div className="App">
          <ParticlesBg type="polygon" bg={true} />

          <Navigation
            isSignedIn={isSignedIn}
            onRouteChange={this.onRouteChange}
          />
          {route === "home" ? (
            <div>
              <Entries
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageUrl
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                faceIdentified={faceIdentified}
              />
              <ImageComponent inputUrl={inputUrl} />
            </div>
          ) : route === "signin" ? (
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} loadToken={this.loadToken}/>
          ) :  (
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )
        }
      </div>
    );
  }
}
export default App;
