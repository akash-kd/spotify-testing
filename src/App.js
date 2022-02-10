import './App.css';
import SpotifyPlayer from 'react-spotify-player';
import SpotifyWebApi from 'spotify-web-api-node';
import { useHotkeys,isHotkeyPressed} from 'react-hotkeys-hook';
import Modal from 'react-modal'
import { useEffect, useState } from 'react';
import { ModifierBitMasks } from '@blueprintjs/core/lib/esm/components/hotkeys/hotkeyParser';

function App() {
  const [tracks,setTracks] = useState([])
  const [searchText,setSearchText] = useState("")
  const [track,setTrack] = useState("spotify:track:6ozxplTAjWO0BlUxN8ia0A")
  const [modalOpen,setModalOpen] = useState(false);

  const size = {
    width: '50%',
    height: 80,
  };

  var spotifyApi = new SpotifyWebApi({
    clientId: 'de0201ebd0c1400894a08d4bb18621bf',
    clientSecret: 'de0201ebd0c1400894a08d4bb18621bf',
  });

  let token = 'BQBzGI3PnMyQAcPgoITfq4vc-t4nzB2xAFx7s94xyopEfnIs5w09gR2SGYk01hkr_vZckJLGwc8lVgRkB-35j20B6B6CvZajTh5qKc9bR-01HvVscin2_lZKFrGag2uo5-5v1ahSTsCH5ehq20aiytXSX6al21bHU6t8XaZQIwKFnl-wYkriFhP9sQEUgDFrDeYLpwZ5cP2Ui6uB2Hfg6NIs0PQQYg'

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



  useHotkeys('shift+s',() => setModalOpen(!modalOpen));
  useHotkeys('esc',()=>setModalOpen(false))

  return (
      <div className="App" >
        <SpotifyPlayer
          uri={track || "spotify:track:6ozxplTAjWO0BlUxN8ia0A"}
          size = {size}
        />
        <button onClick={()=>setModalOpen(true)}>Search or Shift + S</button>
      <Modal
        isOpen={modalOpen}
        className="modal"
        onClick={()=>setModalOpen(true)}

      >
        <div className='RecBox'>
          <div className='RecBtns'>
          <button onClick={()=>setModalOpen(false)}>close</button>
          <input key="input" type="text" onChange={(e) => setSearchText(e.target.value)} />
            {
              tracks.map((item,i) => {
                return (
                  <>
                    <button className="btn" key={item.uri} onClick={(e) => {setTrack(e.target.value);setModalOpen(false)}}  value={item.uri} >{item.name}</button>
                  </>
                )
              })
            }
          </div>
        </div>
        </Modal>
      </div>
  );

}
export default App;
