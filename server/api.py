import settings
import models
import responder
from handlers import WineAttributeResource, PredictionResource, HealthCheckResource

models.main()
api = responder.API(
    cors=True,
    allowed_hosts=["*"],
    cors_params= { "allow_origins": "*",
                   "allow_methods": "*",
                   "allow_headers": "*"
                   })

api.add_route('/api/wine_attributes', WineAttributeResource)
api.add_route('/api/predict', PredictionResource)
api.add_route('/api/healthcheck', HealthCheckResource)

if __name__ == '__main__':
    api.run(address="0.0.0.0", port=5432, debug=True)
