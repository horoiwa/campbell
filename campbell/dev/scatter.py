from IPython.display import display, HTML

from jinja2 import Template


HTML_TEMPLATE = Template("""
    <!DOCTYPE html>
    <html lang="en">

    <style>
    {{CSS}}
    </style>

    <head>
        <meta charset="UTF-8">
        <title>Development</title>
        <link rel="stylesheet" type="text/css" href="style.css">
    </head>
    <body>
        <h1>TEST</h1>
        {{CHART_DIV}}
        <script src="https://d3js.org/d3.v5.js"></script>
        <script>{{SCRIPT}}</script>
    </body>

    </html>
    """)


class SimpleScatter:

    def __init__(self, data, jupyter=False):

        self.data = data

        self.jupyter = jupyter

    def plot(self, jupyter=True):

        html_template = HTML_TEMPLATE

        css = self.get_stylesheet()

        chart_div = self.get_chart_div()

        script = self.get_script()

        html = html_template.render({"CSS": css,
                                     "CHART_DIV": chart_div,
                                     "SCRIPT": script})

        print(html)
        if self.jupyter:
            html = HTML(html)

        return html

    def get_stylesheet(self):
        return '''
            .tooltip {
                position: absolute;
                text-align: center;
                width: auto;
                height: auto;
                padding: 5px;
                font-size: 10px;
                background: white;
                box-shadow: 0px 0px 10px lightgray;
                visibility: hidden;
              }
            '''

    def get_chart_div(self):
        return '<div id="chart"></div>'

    def get_script(self):
        SCRIPT_TEMPLATE = Template(
            '''
            console.log("{{word}}");
            ''')

        script = SCRIPT_TEMPLATE.render(
            {"word": 'console.log("hello world")'})

        return script
