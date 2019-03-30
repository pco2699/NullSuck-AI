from services import WineAttributeService, PredictionService

class WineAttributeResource:
    def on_get(self, req, resp):
        wine_attributes = WineAttributeService.get_all()
        resp.media = {
            "status": True,
            "wine_attributes": wine_attributes
        }

class PredictionResource:
    async def on_post(self, req, resp):
        data = await req.media()
        res = PredictionService.predict(data)
        resp.media = {
            "status": True,
            "result": res
        }

class HealthCheckResource:
    def on_get(self, req, resp):
        resp.media = {
            "status": True
        }
