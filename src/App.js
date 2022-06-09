import './App.css';
import { Component } from 'react';

class App extends Component {

  visibilityChange = false;

  state = {
    focused: false,
    prevented: false,
  };

  componentDidMount() {
    window.addEventListener('visibilitychange', this.onVisibilityChange);
  }

  onVisibilityChange = (event) => {
    console.log('visibility change event', event);
    this.visibilityChange = true;
    setTimeout(() => this.visibilityChange = false, 3000);
  };

  onInputFocus = (event) => {
    console.log('focus event', event);

    if (this.visibilityChange) {
      console.log('on focus prevented', this.visibilityChange);
      this.visibilityChange = false;
      this.setState({ prevented: true });
      return;
    }

    this.setState({ prevented: false });
    this.setState(
      { focused: true },
      () => {
        setTimeout(() => this.setState({
          focused: false 
        }), 3000);
      }
    );
  };

  render() {

    const appStyle = {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      backgroundColor: '#282c34',
    };

    const titleStyle = {
      margin: 0,
      padding: 24,
      height: 40,
      fontWeight: 700,
    };

    return(
      <div style={appStyle}>
        <input 
          onFocus={this.onInputFocus}
        />
        <h1 style={titleStyle}>
          {this.state.focused && (
            <span style={{color: 'red'}}>From onFocus!!!</span>
          )}
          {this.state.prevented && (
            <span style={{color: 'green'}}>onFocus prevented!!!</span>
          )}
        </h1>
      </div>
    );
  }
}

export default App;
