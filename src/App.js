import React, { useState, useEffect } from 'react';
import './App.scss';

import Like from './assets/like.png';
import Trash from './assets/trash.png';
import Vinyl from './assets/vinyl.png';
// import MusicHeart from './assets/music-heart.png';
// import AudioTape from './assets/audio-tape.png';
import Type from './assets/type.png';
import Dance from './assets/dance.png';

import { DATA } from './DATA';

function App() {
  const [data, setData] = useState(DATA);
  const [searchMusic, setSearch] = useState({ search: '' });
  const [musicData, addMusic] = useState({
    id: '',
    like: '',
    title: '',
    subtitle: '',
    media: '',
  });

  const filteredData = data.filter((item) =>
    item.title
      .toLowerCase()
      .includes(searchMusic.search.toString().toLowerCase())
  );

  const removeMusic = (id) => {
    const afterRemovedMusic = data.filter((item) => item.id > id);
    console.log(afterRemovedMusic);
  };

  return (
    <div className='container'>
      <SearchBox searchMusic={searchMusic} setSearch={setSearch} />

      <div className='card-scroll'>
        {filteredData.map((item) => (
          <CardContainer
            key={item.id}
            {...item}
            data={data}
            setData={setData}
            removeMusic={removeMusic}
          />
        ))}
      </div>

      <AddContainer
        data={data}
        setData={setData}
        musicData={musicData}
        addMusic={addMusic}
      />
    </div>
  );
}

const SearchBox = ({ searchMusic, setSearch }) => {
  const { search } = searchMusic;

  const handleChange = (event) => {
    const { value, name } = event.target;
    setSearch({ [name]: value });
  };

  return (
    <div className='search-box'>
      <div className='vinyl'>
        <img src={Vinyl} alt='vinyl' />
      </div>
      <input
        type='search'
        name='search'
        value={search}
        onChange={handleChange}
        placeholder='Search Song'
      />
    </div>
  );
};

const CardContainer = (props) => {
  const { id, like, title, subtitle, data, setData, removeMusic } = props;

  return (
    <div className='card-container'>
      <div className='card'>
        <div className='like'>
          <span className='no-like'>{like}</span>
          <img src={Like} alt='like' />
        </div>
        <div className='name'>
          <span className='title'>{title}</span>
          <span className='sub-title'>{subtitle}</span>
        </div>
        <div className='audio'>
          <audio controls>
            <source
              src='./assets/musics/NewStuff.mp3'
              type='audio/mp3'></source>
          </audio>
        </div>
        <div className='delete' onClick={() => removeMusic(id)}>
          <img src={Trash} alt='trash' />
        </div>
      </div>
    </div>
  );
};

const AddContainer = ({ setData, data, musicData, addMusic }) => {
  const { title, subtitle, media } = musicData;

  const handleSubmit = (event) => {
    event.preventDefault();
    setData([
      ...data,
      {
        ...musicData,
        id: data.length + 1,
        like: 0,
      },
    ]);
    addMusic({
      id: '',
      like: '',
      title: '',
      subtitle: '',
      media: '',
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    addMusic({ ...musicData, [name]: value });
  };

  return (
    <div className='add-container'>
      <form onSubmit={handleSubmit}>
        <div className='add-content'>
          <img className='type' src={Type} alt='type' />
          <input
            required
            type='text'
            name='title'
            value={title}
            onChange={(event) => handleChange(event)}
            placeholder='enter title'
          />
          <input
            required
            type='text'
            name='subtitle'
            value={subtitle}
            onChange={(event) => handleChange(event)}
            placeholder='enter sub title'
          />
          <input
            required
            type='text'
            name='media'
            value={media}
            onChange={(event) => handleChange(event)}
            placeholder='enter link'
          />
          <button>Add media</button>
          <img className='dance' src={Dance} alt='dance' />
        </div>
      </form>
    </div>
  );
};

export default App;
