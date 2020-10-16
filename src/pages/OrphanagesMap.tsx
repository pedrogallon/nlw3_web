import React, { useEffect, useState } from "react";

import mapMarkerImg from "../img/marker.svg";

import { Link } from "react-router-dom";
import { FiArrowRight, FiPlus } from "react-icons/fi";

import { Map, TileLayer, Marker, Popup } from "react-leaflet";

import "../styles/pages/map.css";
import mapIcon from "../utils/mapIcon";
import api from "../services/api";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  // a lista a ser atualizada e a função para atualizar esta lista
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

  // executa esta função quando uma variavel dentro do array for alterado
  // caso tivesse uma chamada direta, seria chamada toda vez que a pag ou uma pai é atualizada
  // Isso se chama Hooks
  useEffect(() => {
    api.get("orphanages").then((response) => {
      //contem "data", onde vem o json da API
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy Marker" />
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando sua visita </p>
        </header>
        <footer>
          <strong>São Paulo</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <Map
        center={[-23.5016345, -46.5225579]}
        zoom={15}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}

        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />

        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              position={[orphanage.latitude, orphanage.longitude]}
              icon={mapIcon}
            >
              <Popup
                closeButton={false}
                minWidth={240}
                maxWidth={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`/orphanages/${orphanage.id}`}>
                  <FiArrowRight size={32} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          );
        })}
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
