# urban-barnacle

This repo is used for Datadev Hackathon organized by Tableau.

## Installation

### Required installations

Intentionally, there are 2 ways to install the development environment - with or without Docker containers. However, only the first method (with Docker container) is supported for now.

- [VS Code](https://code.visualstudio.com/) (to use `devcontainer` - read more [here](https://code.visualstudio.com/docs/remote/containers))
- [Docker](https://www.docker.com/)
- [Tableau](https://www.tableau.com/)

### To start development

1. With Docker
   - `git clone` the repository
   - `cd urban-barnacle`
   - `code .` to open the directory with VS Code
   - Install `Remote-Containers` on VS Code
   - Open Command Palette (with `F1`) and select `Remote-Containers: Open Folder in Container`
   - Once the container has been built, start `terminal` and start back end with `python manage.py runserver` and start front end with `cd frontend && npm start`
   - Your app now should be ready at `localhost:3000`
   - The Tableau extension file `trex` is located at `./frontend/extension.trex`
2. Without Docker (currently not supported - however, a PR is more than welcome)
   - ...

Once the environment is installed, just run:

## Ideas

You can add your ideas [here.](https://docs.google.com/document/d/15K2bdA1oAKOudEJVmp944eF42rQfYHd_EV6zTYtiMiY/edit?usp=sharing)

## Contact us

If you have any suggestions, you can contact us via

- [DingCheng](mailto:wang0798@e.ntu.edu.sg)
- [Jason](mailto:jszhang0001@gmail.com)
- [Kelvin](mailto:knguyen@codeuniverse.onmicrosoft.com)
