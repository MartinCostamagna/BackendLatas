import requests

url_bd = "http://localhost:3000/tamanos"
lista = [220, 222, 250, 269, 290, 310, 330, 345,
         350, 354, 355, 410, 473, 500, 710, 1000]

for elemento in lista:
    payload = {"volumen": elemento}
    res = requests.post(url_bd, json=payload)
    if res.status_code in (200, 201):
        print(f"✅ '{elemento}' guardado correctamente.")
    else:
        print(
            f"❌ Error al guardar '{elemento}': {res.status_code} - {res.text}")
