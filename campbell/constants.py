from pathlib import Path

from jinja2 import Environment, FileSystemLoader

HOME = Path(__file__).resolve().parent
TEMPLATE_DIR = str(HOME / "templates")
D3_FILE = str(HOME / "static" / "d3.min.js")
ENV = Environment(loader=FileSystemLoader(TEMPLATE_DIR, encoding='utf8'))
