import requests

url_bd = "http://localhost:3000/especialidades"
lista = ['APA', 'Americano', 'Bitt', 'Cero Alcohol', 'Chenin Dulce', 'Chenin Torrontes', 'Cigarrillos', 'Demi-Sec', 'Energizante', 'Energizante Sin Azucar', 'Espumante', 'Fernet', 'Gaseosa', 'Gaseosa Ligth', 'Gaseosa Sin Azucar', 'Gin Tonic', 'Golden Ale', 'Golden Lager', 'Grape Lager', 'Hard Seltzer', 'Honigbier', 'IPA', 'IPA Roja', 'IPA de Cacao', 'Jugo',
         'Kolsch', 'Lager', 'Ligth Lager', 'Malbec', 'Malbec Bonarda', 'Malzbier', 'Mojito', 'Pale Ale', 'Pilsen', 'Red Ale', 'Red Lager', 'Ron', 'Schwarz Bier', 'Scottish', 'Shake', 'Sidra', 'Sin Gas', 'Sour', 'Spritz + Soda', 'Stout', 'Torrontes', 'Vienna Lager', 'Vino Espumante', 'Vodka', 'Vodka Limon', 'Vodka Spritz', 'Waldbier', 'Weisse', 'Wheat Ale', 'Witbier']

for elemento in lista:
    payload = {"nombre": elemento}
    res = requests.post(url_bd, json=payload)
    if res.status_code in (200, 201):
        print(f"✅ '{elemento}' guardado correctamente.")
    else:
        print(
            f"❌ Error al guardar '{elemento}': {res.status_code} - {res.text}")
