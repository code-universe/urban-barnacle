ARG VARIANT
FROM ubuntu:${VARIANT}

ENV PYTHONUNBUFFERED 1

RUN apt-get update && apt-get install -y curl gnupg ca-certificates sudo git
# [Option] Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash - \
    && apt-get install --yes nodejs \
    && apt-get install --yes build-essential

# Utils
RUN apt-get update && apt install -y git vim nano

# Install Python
RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    python3.8 python3-pip python3.8-dev
# Install Python packages
COPY requirements.txt /tmp/pip-tmp/
COPY requirements-dev.txt /tmp/pip-tmp/
RUN pip3 --disable-pip-version-check --no-cache-dir install -r /tmp/pip-tmp/requirements-dev.txt \
    && rm -rf /tmp/pip-tmp

# Clean up
RUN apt-get autoremove -y \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Alias python
RUN echo "alias python=python3" >> ~/.bashrc
