from IPython.display import display, HTML
from pprint import pprint

import pandas as pd
import panel as pn
from jinja2 import Template

from campbell.constants import ENV, D3_FILE


class SimpleScatter:

    def __init__(self, df: pd.DataFrame, jupyter: bool):

        self.data = df.to_json(orient="records")

        self.is_jupyter = jupyter

        self.template = ENV.get_template("simple_scatter.html")

    def plot(self):
        html = self.template.render({"D3_FILE": D3_FILE, "DATASET": self.data})
        #pprint(html)
        if self.is_jupyter:
            html = HTML(html)
        else:
            html = pn.pane.HTML(html)
        return html



if __name__ == "__main__":
    from sklearn.datasets import load_boston

    bos = load_boston()
    df = pd.DataFrame(bos.data, columns=bos.feature_names)
    df = df.iloc[:20, :]

    app = SimpleScatter(df=df, jupyter=False)
    print(app.plot())
