// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { cache } from "swr";
import server from './__mocks__/msw/server';

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Clear any swr cached data
beforeEach(() => cache.clear());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
