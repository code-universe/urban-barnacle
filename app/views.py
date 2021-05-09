import os
from app import settings
from django.http import HttpResponse

# View to return the static front-end code
def index(request):
    try:
        with open(os.path.join(settings.REACT_APP_DIR, "build", "index.html")) as f:
            return HttpResponse(f.read())
    except FileNotFoundError:
        return HttpResponse(
            """
            This endpoint is not meant to be accessed on development environment.
            Please build the front-end using cd frontend && npm install && npm run build
            """,
            status=501,
        )
