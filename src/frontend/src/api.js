const BASE_URL = "http://localhost:5000/api";

export const fetchPrices = async (params = "") =>
  fetch(`${BASE_URL}/prices${params}`).then((res) => res.json());

export const fetchEvents = async () =>
  fetch(`${BASE_URL}/events`).then((res) => res.json());

export const fetchChangePoints = async () =>
  fetch(`${BASE_URL}/change-points`).then((res) => res.json());

export const fetchMetrics = async () =>
  fetch(`${BASE_URL}/metrics`).then((res) => res.json());
