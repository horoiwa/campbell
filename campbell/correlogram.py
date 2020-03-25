import pandas as pd
import panel as pn

from campbell.constants import ENV, D3_FILE


class Correlogram:

    def __init__(self, df: pd.DataFrame, is_jupyter=True):

        self.df = df

        self.is_jupyter = is_jupyter

        self.template = ENV.get_template("correlogram.html")

    def plot(self, width=400, height=400, marker_size=6,
             sort_by=None, max_col=10, font_size=12):

        if sort_by:
            indices = list(self.df.corr()[sort_by][:max_col].index)
            df = self.df[indices]
        else:
            df = self.df.iloc[:, :max_col]

        data_json = df.to_json(orient="records")
        corr_json = df.corr().to_json(orient="index")

        html = self.template.render({"CORR_JSON": corr_json,
                                     "DATA_JSON": data_json,
                                     "WIDTH": width,
                                     "HEIGHT": height,
                                     "MARKER_SIZE": marker_size,
                                     "FONTSIZE": font_size})
        if self.is_jupyter:
            html = pn.pane.HTML(html)

        return html
