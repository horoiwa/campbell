from IPython.display import display, HTML
from pprint import pprint

import pandas as pd
import panel as pn

from campbell.constants import ENV, D3_FILE


class SimpleScatter:

    def __init__(self, df: pd.DataFrame, is_jupyter=True):

        self.data = df.to_json(orient="records")

        self.is_jupyter = is_jupyter

        self.template = ENV.get_template("simple_scatter.html")

    def plot(self, width=400, height=400, marker_size=6):
        html = self.template.render({"DATASET": self.data,
                                     "WIDTH": width,
                                     "HEIGHT": height,
                                     "MARKER_SIZE": marker_size})
        if self.is_jupyter:
            html = pn.pane.HTML(html)

        return html
