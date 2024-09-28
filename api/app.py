from flask_openapi3 import OpenAPI, Info
from flask import redirect,request, jsonify
from schema.mobileprice_input import MobilePriceModel
from model.model import MobilePrice
from flask_cors import CORS

info = Info(title="Mobile Price", version="1.0.0")
app = OpenAPI(__name__, info=info)
CORS(app)

classifier = MobilePrice()

@app.get("/")
def home():
    """Documentação.
    """
    return redirect('/openapi/swagger')

    
@app.route("/find-best-mobile-price", methods=["POST"])
def classify1():
    """Classifica e retorna o melhor preço de um celular.
    
    ---
    Request Body:
    - battery_power: Potência da bateria (em mAh).
    - clock_speed: Velocidade do relógio (em GHz).
    - fc: Câmera frontal (em megapixels).
    - int_memory: Memória interna (em GB).
    - n_cores: Número de núcleos do processador.
    - pc: Câmera principal (em megapixels).
    - ram: RAM (em MB).
    - talk_time: Tempo de conversa (em minutos).

    Responses:
    - 200: Retorna a classificação do celular.
    """
    data = request.get_json()
    print(data)
    classification = classifier.return_mobile(data)
    return {"classification": classification[0]}

