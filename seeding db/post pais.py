import requests

url_bd = "http://localhost:3000/paises"
lista = ['Alemania', 'Argentina', 'Brasil', 'China', 'Corea del Sur', 'Dinamarca', 'España',
         'Estados Unidos', 'Francia', 'Holanda', 'Malasia', 'Peru', 'Portugal', 'Reino Unido', 'Rusia']

for elemento in lista:
    payload = {"nombre": elemento}
    res = requests.post(url_bd, json=payload)
    if res.status_code in (200, 201):
        print(f"✅ '{elemento}' guardado correctamente.")
    else:
        print(
            f"❌ Error al guardar '{elemento}': {res.status_code} - {res.text}")
