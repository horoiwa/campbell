from pathlib import Path

from jinja2 import Environment, FileSystemLoader

TEMPLATE_DIR = Path(__file__).resolve().parent / "templates"
ENV = Environment(loader=FileSystemLoader(str(TEMPLATE_DIR), encoding='utf8'))
