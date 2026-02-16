import unittest
import pandas as pd
from importlib import import_module


backend = import_module('src.backend.app')
app = backend.app


class BackendAPITest(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_get_prices(self):
        resp = self.client.get('/api/prices')
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)
        self.assertIn('Price', data[0])
        self.assertIn('Date', data[0])

    def test_get_prices_with_filters(self):
        resp = self.client.get('/api/prices?start=2000-01-01')
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        dates = pd.to_datetime([item['Date'] for item in data])
        self.assertTrue((dates >= pd.to_datetime('2000-01-01')).all())

    def test_get_events(self):
        resp = self.client.get('/api/events')
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertIsInstance(data, list)

    def test_get_change_points(self):
        resp = self.client.get('/api/change-points')
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertTrue(isinstance(data, (list, dict)))

    def test_get_metrics(self):
        resp = self.client.get('/api/metrics')
        self.assertEqual(resp.status_code, 200)
        data = resp.get_json()
        self.assertIn('volatility', data)
        self.assertIn('average_price', data)


if __name__ == '__main__':
    unittest.main()
