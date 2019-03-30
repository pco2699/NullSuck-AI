from db_config import session
from models import WineAttribute, WineAttributeSchema, Prediction
import pickle
from pandas import DataFrame


class WineAttributeService:
    @staticmethod
    def get_all():
        wine_attributes = []
        try:
            wine_attributes = session.query(
                WineAttribute
            ).all()
        except Exception as e:
            print(e)
        finally:
            session.close()
            return WineAttributeSchema().dump(wine_attributes, many=True)

class PredictionService:
    model = pickle.load(open('nullsuckAi_01model.sav', mode='rb'))

    @staticmethod
    def predict(data):
        # とりあえずpredictionにデータを突っ込む
        # prediction = Prediction()
        # session.add(prediction)
        # session.commit()

        df = DataFrame.from_dict(PredictionService.convert_dict(data), orient='columns')

        predict = PredictionService.model.predict_proba([df['value']])
        predict_value =  round(float(predict[0][1]) * 100)

        return predict_value

    @staticmethod
    def convert_dict(data):
        converted = {'id': [], 'value': []}
        for k in data:
            converted['id'].append(k['id'])
            converted['value'].append(k['value'])

        return converted
