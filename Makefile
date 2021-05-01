# This Makefile is only applicable for Unix environment
SHELL:= /bin/bash
BASE_DIR=$(shell pwd)

clean:  # => Delete current build environment and latest build
	$(info[*] Who needs all that anyway? Destroying environment....)
	deactivate || true
	find . -type d -name '*pycache*' -exec rm -rf {} +
	find . -name '*.pyc' -exec rm --force {} \;
	rm -rf .venv

install:
	$(info[+] Installing dependencies...")
	python -m venv .venv
	.venv/bin/pip install --upgrade pip
	.venv/bin/pip install -U -r requirements.txt
