import { rest } from 'msw';
import { getPokemonList, getPokemonData } from '../../api/endpoints';
import mockGetPokemonListData from '../mockData/getPokemonList';
import mockGetPokemonData from '../mockData/getPokemonData';

const handlers = [
  rest.get(getPokemonList, (req, res, ctx) => res(
    ctx.set('access-control-allow-origin', '*'),
    ctx.status(200),
    ctx.json(mockGetPokemonListData),
  )),

  rest.get(getPokemonData(':pokeName'), (req, res, ctx) => res.once(
    ctx.set('access-control-allow-origin', '*'),
    ctx.status(200),
    ctx.json(mockGetPokemonData),
  )),

  rest.get('*', (req, res, ctx) => {
    // eslint-disable-next-line no-console
    console.log(`Please add request handler for ${req.url.toString()}`);

    return res(
      ctx.status(500),
      ctx.json({ error: 'Please add request handler' }),
    );
  }),
];

export default handlers;
