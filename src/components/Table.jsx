import React, { useContext } from 'react';
import informationAPI from '../context/DataContext';
import '../styles/table.css';

function Table() {
  const { planets, planetsFiltered } = useContext(informationAPI);
  return (
    <div className="container-table">
      <table>
        <tr>
          <td className="table-title small">Name</td>
          <td className="table-title small">Rotation</td>
          <td className="table-title small">Orbital Period</td>
          <td className="table-title small">Diameter</td>
          <td className="table-title small">Climate</td>
          <td className="table-title large">Gravity</td>
          <td className="table-title large">Terrain</td>
          <td className="table-title small">Surface</td>
          <td className="table-title large">Population</td>
          <td className="table-title small">Films</td>
          <td className="table-title large">Created</td>
          <td className="table-title large">Edited</td>
          <td className="table-title small">Url</td>
        </tr>
        {(planetsFiltered.length !== 0 ? planetsFiltered : planets).map(({
          name,
          rotation_period: rotationPeriod,
          orbital_period: orbitalPeriod,
          diameter,
          climate,
          gravity,
          terrain,
          surface_water: surfaceWater,
          population,
          films,
          created,
          edited,
          url,
        }) => (
          <tr data-testid="planet-name" key={ name }>
            <td>{name}</td>
            <td>{Number(rotationPeriod)}</td>
            <td>{Number(orbitalPeriod)}</td>
            <td>{Number(diameter)}</td>
            <td>{climate}</td>
            <td>{gravity}</td>
            <td>{terrain}</td>
            <td>{Number(surfaceWater)}</td>
            <td data-testid="test-unknown">{population}</td>
            <td><a href={ films }>Link</a></td>
            <td>{created}</td>
            <td>{edited}</td>
            <td><a href={ url }>Link</a></td>
          </tr>

        ))}
      </table>
    </div>
  );
}

export default Table;
