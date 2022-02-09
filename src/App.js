import './App.css';
import SpotifyPlayer from 'react-spotify-player';
import SpotifyWebApi from 'spotify-web-api-node';

function App() {
  const size = {
    width: '80%',
    height: 80,
  };
  return (
    <div className="App">
    <SpotifyPlayer
      uri="spotify:track:6ozxplTAjWO0BlUxN8ia0A"
      size={size}
    />
      
    </div>
  );
}

export default App;
