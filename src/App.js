import './App.css';
import SpotifyPlayer from 'react-spotify-player';
import SpotifyWebApi from 'spotify-web-api-node';
import { useHotkeys} from 'react-hotkeys-hook';
import Modal from 'react-modal'
import { useEffect, useState } from 'react';

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

  let token = 'BQAAjPMb6HGtWSQb5Ff1G9jADyFEnMMXQc2nqfpVXVE2VewMUQk9sOkoRWa25uUYK4j98gsxt-oFp7A-nsyYf28WjgLumHQjYmITcxEX4yltj2RiyCBoNiETynuOZfJtdeePG-8cWi5c4gqm6oWPVtrxFEkITDWprzfDXbPRp-WAgE6cdNC_doVpaunSoLy5aA6RKqfRd9hNKRUcTvFQFOpoNWGn0A'

  spotifyApi.setAccessToken(token);

  useEffect(()=>{
    console.log(searchText)
    if(searchText.length > 1){

      spotifyApi.searchAlbums(searchText)
      .then( (data) => {
        console.log(data)
        // setTracks(data.body.tracks.items);
      });  
    }
    // eslint-disable-next-line
  },[searchText]);



  useHotkeys('shift+s',() => setModalOpen(!modalOpen));
  useHotkeys('esc',()=>setModalOpen(false))

  return (
      <div className="App" >
        <SpotifyPlayer
          uri={"spotify:track:6ozxplTAjWO0BlUxN8ia0A"}
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
