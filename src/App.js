import './App.css';
import SpotifyPlayer from 'react-spotify-player';
import SpotifyWebApi from 'spotify-web-api-node';
import { useEffect, useState } from 'react';

function App() {
  const [tracks,setTracks] = useState([])
  const [searchText,setSearchText] = useState("")
  const [track,setTrack] = useState("spotify:track:6ozxplTAjWO0BlUxN8ia0A")

  const size = {
    width: '50%',
    height: 80,
  };

  var spotifyApi = new SpotifyWebApi({
    clientId: 'de0201ebd0c1400894a08d4bb18621bf',
    clientSecret: 'de0201ebd0c1400894a08d4bb18621bf',
  });

  let token = 'BQAV22tJSlmOwJ8pWjDxgFqnD5ZSFxu7ejLKoXxvxhnPmxNCNA-Xfm_DVIaQIoFo1VTCG989DebyNoLc5RlF02nZqLWAUx58B3CrdU69f1gi_K82epgpFMYAsrWVeQMIhI-oqdc5BajTzZAq34R5uUA4UHG4i3fRbwp9_2jebCcSezrGLomoOBdq_U7wabyNqR2iZNNcLeyIMJ4L'

  spotifyApi.setAccessToken(token);

  useEffect(()=>{
    console.log(searchText)
    if(searchText.length > 1){
      spotifyApi.searchTracks(searchText)
      .then( (data) => {
        setTracks(data.body.tracks.items);
      });  
    }
    // eslint-disable-next-line
  },[searchText]);

  return (
      <div className="App">
        <SpotifyPlayer
          uri={track || "spotify:track:6ozxplTAjWO0BlUxN8ia0A"}
          size = {size}
        />
        <div className='RecBox'>
          <input type="text" onChange={(e) => setSearchText(e.target.value)}/>
          <div className='RecBtns'>
            {
              tracks.map((item,i) => {
                return (
                  <>
                    <button className="btn" key={item.uri} onClick={(e) => setTrack(e.target.value)}  value={item.uri} >{item.name}</button>
                  </>
                )
              })
            }
          </div>
        </div>
      </div>
  );

}
export default App;
