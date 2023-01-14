import { useState, React } from 'react';
import PropTypes from 'prop-types';
import informationAPI from './DataContext';

const URL = 'https://swapi.dev/api/planets';
function DataContexProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [planetsFiltered, setPlanetsFiltered] = useState([]);
  const [filterByName, setFilterByName] = useState({});
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [order, setOrder] = useState({});

  const fetchAPI = async () => {
    const response = await fetch(`${URL}`);
    const data = await response.json();
    setPlanets((data.results)
      .filter((result) => delete result.residents)); // removendo a chave residents do objeto
  };

  const valueContext = {
    planets,
    fetchAPI,
    planetsFiltered,
    setPlanetsFiltered,
    filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues,
    order,
    setOrder,
  };
  return (
    <informationAPI.Provider value={ valueContext }>
      {children}
    </informationAPI.Provider>
  );
}

DataContexProvider.propTypes = {
  children: PropTypes.node.isRequired, // o node significa um nó do DOM React
};

export default DataContexProvider;
