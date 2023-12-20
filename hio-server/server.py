import falcon
from hio.base import doing
from hio.core import http
from os import environ

class Resource:
    def on_get(self, req: falcon.Request, resp: falcon.Response):
        print(req.params)
        resp.status = falcon.HTTP_204

app = falcon.App()
app.add_route('/', Resource())

port = int(environ.get("PORT") or "8081")
server = http.Server(port=port, app=app)
server.reopen()
doer = http.ServerDoer(server)

tock = 0.03125
print(f"Create server on port http://localhost:{port}")
doist = doing.Doist(tock=tock, real=True)
doist.do(doers=[doer])
