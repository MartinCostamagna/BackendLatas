import requests

url_bd = "http://localhost:3000/cajas"
lista = [(1, 1, 20), (2, 3, 18), (3, 10, 30), (4, 13, 12), (5, 6, 25), (6, 13, 15), (7, 10, 10), (8, 13, 16), (9, 13, 10), (10, 13, 16), (11, 4, 15), (12, 6, 13),
         (13, 13, 16), (14, 13, 16), (15, 13, 16), (16, 10, 10), (17, 4, 7), (18, 10, 10), (19, 13, 10), (20, 3, 2), (21, 13, 16), (22, 13, 3), (23, 10, 1)]

for elemento in lista:
    payload = {"numeroDeCaja": elemento[0],
               "tamañoId": elemento[1],
               "cantidadActual": elemento[2]}
    res = requests.post(url_bd, json=payload)
    if res.status_code in (200, 201):
        print(f"✅ '{elemento}' guardado correctamente.")
    else:
        print(
            f"❌ Error al guardar '{elemento}': {res.status_code} - {res.text}")
