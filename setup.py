from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in k2s_hr/__init__.py
from k2s_hr import __version__ as version

setup(
	name="k2s_hr",
	version=version,
	description="custom app developed on frappe",
	author="k2s.co",
	author_email="info@k2s.com",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
