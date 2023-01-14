/* eslint-disable react/jsx-max-depth */
import React, { useContext, useEffect, useState } from 'react';
import informationAPI from '../context/DataContext';
import verifyFilterNew from '../functions/verifyFilterNew';
import Table from './Table';
import '../styles/tablePlanets.css';
import LightSaber from './LightSaber';

const optionsArray = [
  'orbital_period', 'diameter', 'rotation_period', 'surface_water', 'population'];
function TablePlanets() {
  const { planets, fetchAPI, planetsFiltered, setPlanetsFiltered, filterByName,
    setFilterByName, setFilterByNumericValues, filterByNumericValues, // order,
    setOrder } = useContext(informationAPI);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  const [optionsValues, setOptionsValues] = useState(optionsArray);
  const [orderOption, setOrderOption] = useState('population');
  const [orderDirection, setOrderDirection] = useState('ASC');
  useEffect(() => {
    fetchAPI();
  }, []); // caso não coloque será um laço infinito
  const verifyFilter = () => {
    if (typeof filterByName.name !== 'undefined') {
      setPlanetsFiltered(planets.filter(({ name }) => name.toLowerCase()
        .includes(filterByName.name)));
    }
  };
  useEffect(() => {
    verifyFilter();
  }, [filterByName]);
  const handleOnChange = ({ target }) => {
    setFilterByName({ name: (target.value).toLowerCase() });
  };
  const verifyFilterComponent = (tempPlanet) => {
    if (comparison === 'maior que') {
      setPlanetsFiltered(tempPlanet.filter(
        (planet) => Number(planet[column]) > Number(value),
      ));
    }
    if (comparison === 'menor que') {
      setPlanetsFiltered(tempPlanet.filter(
        (planet) => (Number(planet[column]) < Number(value)),
      ));
    }
    if (comparison === 'igual a') {
      setPlanetsFiltered(tempPlanet.filter(
        (planet) => Number(planet[column]) === Number(value),
      ));
    }
  };
  const verifyFilterOptions = () => {
    const tempPlanet = planetsFiltered.length !== 0 ? planetsFiltered : planets;
    setOptionsValues((prevState) => prevState.filter((option) => option !== column));
    verifyFilterComponent(tempPlanet);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFilterByNumericValues((prevState) => [...prevState, ({
      column: column.toLowerCase(),
      comparison: comparison.toLowerCase(),
      value,
    })]);
    verifyFilterOptions();
  };
  const removeFilter = (index) => {
    setOptionsValues((prevState) => [...prevState, index.column]);
    setFilterByNumericValues(filterByNumericValues
      .filter((filter) => filter.column !== index.column));
  };
  useEffect(() => {
    if (filterByNumericValues.length === 0) {
      setPlanetsFiltered(planets);
    } else {
      setPlanetsFiltered(verifyFilterNew(planets, filterByNumericValues));
    }
  }, [filterByNumericValues]);

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setPlanetsFiltered(planets);
  };
  const buttonOrder = () => {
    setOrder({ order: { column: orderOption, sort: orderDirection } });
    const tempPlanet = planetsFiltered.length !== 0 ? planetsFiltered : planets;
    const magicNumber = -1;
    function compare(a, b) {
      if (Number(a[orderOption]) < Number(b[orderOption])) {
        return magicNumber;
      }
      if (Number(a[orderOption]) > Number(b[orderOption])) {
        return 1;
      }
      return 0;
    }
    if (orderOption !== 'population') {
      if (orderDirection === 'ASC') {
        const temp = ((tempPlanet
          .sort((a, b) => compare(a, b))));
        setPlanetsFiltered([...temp]);
      } else {
        const temp = (((tempPlanet
          .sort((b, a) => compare(a, b)))));
        setPlanetsFiltered([...temp]);
      }
    } else {
      const arrayUnknown = planets.filter((planet) => planet.population === 'unknown');
      const notUnknown = planets.filter((planet) => planet.population !== 'unknown');
      if (orderDirection === 'ASC') {
        setPlanetsFiltered([...notUnknown
          .sort((a, b) => compare(a, b)), arrayUnknown[1], arrayUnknown[0]]);
      } else {
        setPlanetsFiltered([...notUnknown
          .sort((b, a) => compare(a, b)), arrayUnknown[1], arrayUnknown[0]]);
      }
    }
  };
  return (
    <div className="container-global">
      {planets.length !== 0 ? (
        <div>
          <div className="container-filter">
            <div className="container-options-filter">
              <form>
                <input
                  type="text"
                  onChange={ handleOnChange }
                  data-testid="name-filter"
                />
                <select
                  id="column-filter"
                  data-testid="column-filter"
                  onChange={ (e) => (setColumn(e.target.value)) }
                  value={ column }
                >
                  {optionsValues
                    .map((optionValue) => (
                      <option
                        value={ optionValue }
                        key={ optionValue }
                      >
                        {`${optionValue}`}
                      </option>
                    ))}
                </select>
                <select
                  id="comparison-filter"
                  data-testid="comparison-filter"
                  onChange={ (e) => (setComparison(e.target.value)) }
                  value={ comparison }
                >
                  <option value="maior que">maior que</option>
                  <option value="menor que">menor que</option>
                  <option value="igual a">igual a</option>
                </select>
                <input
                  type="number"
                  data-testid="value-filter"
                  onChange={ (e) => (setValue(e.target.value)) }
                  value={ value }
                />
              </form>
              <div>
                <input
                  type="submit"
                  value="Filtrar"
                  data-testid="button-filter"
                  onClick={ handleSubmit }
                />
                <input
                  type="button"
                  value="Remover Filtros"
                  onClick={ removeAllFilters }
                  data-testid="button-remove-filters"
                />
              </div>
            </div>
            <div className="container-order">
              <div>
                <label htmlFor="column-sort">
                  <select
                    id="column-sort"
                    data-testid="column-sort"
                    onChange={ (e) => setOrderOption(e.target.value) }
                  >
                    <option value="population">population</option>
                    <option value="orbital_period">orbital_period</option>
                    <option value="diameter">diameter</option>
                    <option value="rotation_period">rotation_period</option>
                    <option value="surface_water">surface_water</option>
                  </select>
                </label>
                <label htmlFor="orderAsc">
                  <input
                    type="radio"
                    name="orderRadio"
                    id="orderAsc"
                    value="ASC"
                    data-testid="column-sort-input-asc"
                    onChange={ (e) => setOrderDirection(e.target.value) }
                  />
                  Ascendente
                </label>
                <label htmlFor="orderDesc">
                  <input
                    type="radio"
                    name="orderRadio"
                    id="orderDesc"
                    value="DESC"
                    data-testid="column-sort-input-desc"
                    onChange={ (e) => setOrderDirection(e.target.value) }
                  />
                  Descendente
                </label>
              </div>

              <input
                type="button"
                value="Ordenar"
                data-testid="column-sort-button"
                onClick={ buttonOrder }
              />
            </div>
            <ol className="list-filters">
              {filterByNumericValues.length !== 0 && (
                filterByNumericValues
                  .map((filter, index) => (
                    <div key={ index }>
                      <li data-testid="filter">
                        {Object.values(filter)}
                        <button
                          type="button"
                          onClick={ () => removeFilter(filterByNumericValues[index]) }
                        >
                          Apagar
                        </button>
                      </li>
                    </div>))
              )}
            </ol>
          </div>
          {Table()}
        </div>
      ) : <LightSaber /> }
    </div>
  );
}

export default TablePlanets;
