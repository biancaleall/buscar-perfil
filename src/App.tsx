import './App.css';
import axios from 'axios';
import { useState } from 'react';

type GITHUBResponse = {
  name: string;
  avatar_url: string;
  bio: string;
};

function App() {
  const [userName, setUserName] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('Aguardando..');
  const [avatarURL, setAvatarURL] = useState('');

  const handleSearch = () => {
    axios
      .get<GITHUBResponse>(`https://api.github.com/users/${userName}`)
      .then(res => {
        setName(res.data.name);
        setBio(res.data.bio);
        setAvatarURL(res.data.avatar_url);
      })
      .catch(err => {
        alert('Usuário não encontrado!');
        console.log(err);
      });
  };

  return (
    <div className="container-app">
      <div className="container">
        <header className="header-top">
          <ul>
            <li>
              Buscador de <br /> Perfis do GITHUB
            </li>
          </ul>
        </header>
        <main>
          <div className="form">
            <h1>Faça sua busca abaixo:</h1>
            <input
              type="text"
              placeholder="Digite um username"
              onChange={e => setUserName(e.target.value)}
            />
            <button onClick={handleSearch}>Buscar</button>
          </div>
          <div className="content">
            <div>
              {avatarURL ? (
                <img src={avatarURL} alt="Avatar" />
              ) : (
                <div className="avatar-placeholder"></div>
              )}
              <h1>{name}</h1>
              <p>{bio}</p>
              {name ? (
                <h1>
                  <a target="_blank" href={`https://github.com/${userName}`}>
                    Acesse o perfil
                  </a>
                </h1>
              ) : null}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
