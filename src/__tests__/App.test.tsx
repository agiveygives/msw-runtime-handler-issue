import React from 'react';
import { rest } from 'msw';
import { render, RenderResult, waitForElementToBeRemoved, fireEvent, screen, act } from '@testing-library/react';
import { getPokemonList } from '../api/endpoints';
import server from '../__mocks__/msw/server';
import TestWrapper from '../__testutils__/TestWrapper';
import App from '../App';


describe('loads default handler data', () => {
  let wrapper: RenderResult;

  beforeEach(async () => {
    wrapper = render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    console.log(server.printHandlers());

    await waitForElementToBeRemoved(() => wrapper.getByTestId('loading-spinner'));

    act(() => act(() => { fireEvent.click(screen.getByText('Select a Pokemon')) }));
  });

  it('renders 10 Pokemon options', () => (
    wrapper.findAllByTestId('pokemon-option')
      .then((result) => expect(result.length).toEqual(10))
  ));
});

describe('loads runtime handler data', () => {
  let wrapper: RenderResult;

  beforeEach(async () => {
    server.use(
      rest.get(getPokemonList, (req, res, ctx) => res.once(
        ctx.set('access-control-allow-origin', '*'),
        ctx.status(200),
        ctx.json({
          "count": 1118,
          "next": "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
          "previous": null,
          "results": [
            {
              "name": "mewtwo",
              "url": "https://pokeapi.co/api/v2/pokemon/150/"
            }
          ]
        }),
      ))
    )

    wrapper = render(
      <TestWrapper>
        <App />
      </TestWrapper>
    );

    console.log(server.printHandlers());

    await waitForElementToBeRemoved(() => wrapper.getByTestId('loading-spinner'));

    act(() => act(() => { fireEvent.click(screen.getByText('Select a Pokemon')) }));
  });

  it('renders 1 Pokemon option', () => (
    wrapper.findAllByTestId('pokemon-option')
      .then((result) => expect(result.length).toEqual(1))
  ));
});
