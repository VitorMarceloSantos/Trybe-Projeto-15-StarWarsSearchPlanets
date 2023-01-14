function verifyFilterNew(planets, filterByNumericValues) {
  let tempPlanet = planets;
  for (let i = 0; i < filterByNumericValues.length; i += 1) {
    if (filterByNumericValues[i].comparison === 'maior que') {
      tempPlanet = (tempPlanet.filter(
        (planet) => Number(planet[filterByNumericValues[i].column])
        > Number(filterByNumericValues[i].value),
      ));
    }
    if (filterByNumericValues[i].comparison === 'menor que') {
      tempPlanet = (tempPlanet.filter(
        (planet) => Number(planet[filterByNumericValues[i].column])
        < Number(filterByNumericValues[i].value),
      ));
    }
    if (filterByNumericValues[i].comparison === 'igual a') {
      tempPlanet = (tempPlanet.filter(
        (planet) => Number(planet[filterByNumericValues[i].column])
        === Number(filterByNumericValues[i].value),
      ));
    }
  }
  return tempPlanet;
}

export default verifyFilterNew;
