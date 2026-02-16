import numpy as np
import pandas as pd
import pymc as pm
import statsmodels.api as sm


class OilMarketModel:
    def __init__(self, df):
        """
        df must contain:
        - Date
        - Price
        """
        self.df = df.copy()
        self.df['Date'] = pd.to_datetime(self.df['Date'])
        self.df = self.df.sort_values('Date')
        self.df.set_index('Date', inplace=True)

    # -----------------------------------------------------
    # 1️⃣ Log Return Computation
    # -----------------------------------------------------
    def compute_log_returns(self):
        self.df['log_price'] = np.log(self.df['Price'])
        self.df['log_return'] = self.df['log_price'].diff()
        return self.df

    # -----------------------------------------------------
    # 2️⃣ Event Window Modeling
    # -----------------------------------------------------
    def create_event_window(self, event_date, window_days=10):
        """
        Creates a dummy variable for event impact
        """
        event_date = pd.to_datetime(event_date)

        self.df['event_dummy'] = 0
        mask = (
            (self.df.index >= event_date - pd.Timedelta(days=window_days)) &
            (self.df.index <= event_date + pd.Timedelta(days=window_days))
        )
        self.df.loc[mask, 'event_dummy'] = 1

        return self.df

    # -----------------------------------------------------
    # 3️⃣ OLS Event Impact Model
    # -----------------------------------------------------
    def fit_event_regression(self):
        """
        log_return ~ event_dummy
        """
        df_clean = self.df.dropna()

        X = sm.add_constant(df_clean['event_dummy'])
        y = df_clean['log_return']

        model = sm.OLS(y, X).fit()
        return model

    # -----------------------------------------------------
    # 4️⃣ Bayesian Change Point Model
    # -----------------------------------------------------
    def fit_change_point_model(self):
        """
        Single change point Bayesian model
        """
        prices = self.df['Price'].values
        n = len(prices)

        with pm.Model() as model:

            tau = pm.DiscreteUniform("tau", lower=0, upper=n - 1)

            mu1 = pm.Normal("mu1", mu=prices.mean(), sigma=20)
            mu2 = pm.Normal("mu2", mu=prices.mean(), sigma=20)
            sigma = pm.HalfNormal("sigma", sigma=10)

            mu = pm.math.switch(
                np.arange(n) < tau,
                mu1,
                mu2
            )

            obs = pm.Normal("obs", mu=mu, sigma=sigma, observed=prices)

            trace = pm.sample(
                2000,
                tune=1000,
                target_accept=0.9,
                return_inferencedata=True
            )

        return model, trace
