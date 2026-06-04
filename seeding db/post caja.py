import requests

url_bd = "http://localhost:3000/cajas"
lista = [(1, 1, 0), (2, 3, 0), (3, 10, 0), (4, 13, 0), (5, 6, 0), (6, 13, 0), (7, 10, 0), (8, 13, 0), (9, 13, 0), (10, 13, 0), (11, 4, 0), (12, 6, 0),
         (13, 13, 0), (14, 13, 0), (15, 13, 0), (16, 10, 0), (17, 4, 0), (18, 10, 0), (19, 13, 0), (20, 3, 0), (21, 13, 0), (22, 13, 0), (23, 10, 0), (24, 13, 0), (25, 13, 0), (26, 13, 0)]

for elemento in lista:
    payload = {"numeroDeCaja": elemento[0],
               "tamañoId": elemento[1],
               "cantidadActual": elemento[2]}
    res = requests.post(url_bd, json=payload)
    if res.status_code in (200, 201):
        print(f"'{elemento}' guardado correctamente.")
    else:
        print(
            f"Error al guardar '{elemento}': {res.status_code} - {res.text}")
