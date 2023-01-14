import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import Planets from './Planets.test';
import userEvent from '@testing-library/user-event';

// const BUTTON_FILTER = 'button-filter';

describe('Testando o comportamento da API', () => {
  test('Chando a API', async() =>  {
    global.fetch = jest.fn(async () => ({
      json: async () => Planets,
    }));
    render(<App />);
    const apiPlanets = 'https://swapi.dev/api/planets';
    const planets = await screen.findByText(/Tatooine/i);

    expect(planets).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledWith(apiPlanets);

    // Verifica o tamanho da tabela
    expect(screen.getAllByRole('row')).toHaveLength(11);

    // Verifica Filtro
    const name= screen.getByTestId('name-filter')
    expect(name).toBeInTheDocument();
    userEvent.type(name, 'oo')
    expect(screen.getAllByRole('row')).toHaveLength(3);
    userEvent.type(name, '')

    // Verificando Inputs
    
    const value = screen.getByTestId('value-filter')
    const button = screen.getByTestId('button-filter')
    const comparison = screen.getByTestId('comparison-filter')
    const column= screen.getByTestId('column-filter')
    //Verificando campos
    expect(value).toBeInTheDocument();
    userEvent.type(value, '23')
    expect(value).toHaveValue(23)
    expect(comparison).toBeInTheDocument();
    userEvent.selectOptions(comparison, 'igual a')
    expect(comparison).toHaveValue('igual a')
    expect(column).toBeInTheDocument();
    userEvent.selectOptions(column, 'rotation_period')
    expect(column).toHaveValue('rotation_period')
    expect(button).toBeInTheDocument();
    userEvent.click(button)

    expect(screen.getAllByRole('row')).toHaveLength(4);

    // Limpando Campos
    userEvent.clear(value)
    const buttonClear = screen.getByRole('button', {name:"Apagar"})
    expect(buttonClear).toBeInTheDocument();
    userEvent.click(buttonClear)

    //Verificando campos
    expect(value).toBeInTheDocument();
    userEvent.type(value, '3000')
    expect(value).toHaveValue(3000)
    expect(comparison).toBeInTheDocument();
    userEvent.selectOptions(comparison, 'maior que')
    expect(comparison).toHaveValue('maior que')
    expect(column).toBeInTheDocument();
    userEvent.selectOptions(column, 'orbital_period')
    expect(column).toHaveValue('orbital_period')
    expect(button).toBeInTheDocument();
    userEvent.click(button)

    expect(screen.getAllByRole('row')).toHaveLength(3); // a linha(head) entra na soma

    // Limpando Campos
    userEvent.clear(value)
    const buttonClear1 = screen.getByRole('button', {name:"Apagar"})
    expect(buttonClear1).toBeInTheDocument();
    userEvent.click(buttonClear1)

    //Verificando campos
    expect(value).toBeInTheDocument();
    userEvent.type(value, '600')
    expect(value).toHaveValue(600)
    expect(comparison).toBeInTheDocument();
    userEvent.selectOptions(comparison, 'menor que')
    expect(comparison).toHaveValue('menor que')
    expect(column).toBeInTheDocument();
    userEvent.selectOptions(column, 'orbital_period')
    expect(column).toHaveValue('orbital_period')
    expect(button).toBeInTheDocument();
    userEvent.click(button)

    expect(screen.getAllByRole('row')).toHaveLength(9); // a linha(head) entra na soma

    // Limpando Campos
    const removeFilters = screen.getByTestId('button-remove-filters')
    expect(removeFilters).toBeInTheDocument();

    const filters = screen.getAllByTestId('filter')
    expect(filters).toHaveLength(1)
    userEvent.click(removeFilters)

    // const filters = screen.getAllByTestId('filter')
    // expect(filters).toHaveLength(0)


    // Verificando Campos de Ordem
    const valueOrder = screen.getByTestId('column-sort')
    const valueAsc = screen.getByTestId('column-sort-input-asc')
    const valueDesc = screen.getByTestId('column-sort-input-desc')
    const buttonOrder = screen.getByTestId('column-sort-button')

    // Ordem Ascendente
    const expectedPlanets = ['Bespin', 'Endor', 'Tatooine', 'Hoth', 'Dagobah', 'Alderaan', 'Yavin IV', 'Coruscant', 'Naboo', 'Kamino'];
    expect(valueOrder).toBeInTheDocument();
    userEvent.selectOptions(valueOrder, 'rotation_period')
    expect(valueOrder).toHaveValue('rotation_period')
    expect(valueAsc).toBeInTheDocument();
    userEvent.click(valueAsc)
    expect(buttonOrder).toBeInTheDocument();
    userEvent.click(buttonOrder)

    let planetsList = screen.getAllByTestId('planet-name')
    expect(planetsList.length).toBe(10)
    expect(planetsList[0]).toHaveTextContent(expectedPlanets[0]);
    expect(planetsList[1]).toHaveTextContent(expectedPlanets[1]);
    expect(planetsList[2]).toHaveTextContent(expectedPlanets[2]);
    expect(planetsList[9]).toHaveTextContent(expectedPlanets[9]);

    // Ordem Descendente
    const planetsListDesc = ['Kamino', 'Naboo', 'Alderaan', 'Yavin IV', 'Coruscant', 'Tatooine', 'Hoth', 'Dagobah', 'Endor', 'Bespin'];
    expect(valueOrder).toBeInTheDocument();
    userEvent.selectOptions(valueOrder, 'rotation_period')
    expect(valueOrder).toHaveValue('rotation_period')
    expect(valueDesc).toBeInTheDocument();
    userEvent.click(valueDesc)
    expect(buttonOrder).toBeInTheDocument();
    userEvent.click(buttonOrder)
    
    planetsList = screen.getAllByTestId('planet-name')
    expect(planetsList.length).toBe(10)
    expect(planetsList[0]).toHaveTextContent(planetsListDesc[0]);
    expect(planetsList[1]).toHaveTextContent(planetsListDesc[1]);
    expect(planetsList[2]).toHaveTextContent(planetsListDesc[2]);
    expect(planetsList[9]).toHaveTextContent(planetsListDesc[9]);

    // Ordem Population
    expect(valueOrder).toBeInTheDocument();
    userEvent.selectOptions(valueOrder, 'population')
    expect(valueOrder).toHaveValue('population')
    expect(valueDesc).toBeInTheDocument();
    userEvent.click(valueDesc)
    expect(buttonOrder).toBeInTheDocument();
    userEvent.click(buttonOrder)


    let planetsUnknown = screen.getAllByTestId("test-unknown")
    expect(planetsUnknown.length).toBe(10)
    expect(planetsUnknown[8]).toHaveTextContent(/unknown/i);
    expect(planetsUnknown[9]).toHaveTextContent(/unknown/i);

    // Ordem Population
    expect(valueOrder).toBeInTheDocument();
    userEvent.selectOptions(valueOrder, 'population')
    expect(valueOrder).toHaveValue('population')
    expect(valueAsc).toBeInTheDocument();
    userEvent.click(valueAsc)
    expect(buttonOrder).toBeInTheDocument();
    userEvent.click(buttonOrder)

    planetsUnknown = screen.getAllByTestId("test-unknown")
    expect(planetsUnknown.length).toBe(10)
    expect(planetsUnknown[8]).toHaveTextContent(/unknown/i);
    expect(planetsUnknown[9]).toHaveTextContent(/unknown/i);




    
  });
});