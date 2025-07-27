import requests

url_bd = "http://localhost:3000/ediciones-especiales"
lista = ['150 Años', 'Bresh', 'Campeones del Mundo', 'Carnaval', 'Champions League', 'Clubes Argentinos', 'Coke Studio', "Collector's Item", 'Comparte una... con...', 'Copa America 2021', 'Copa America 2024', 'Creations', 'Edicion Estacional', 'Edicion Limitada', 'Edicion Vintage', 'Ferpa', 'Halloween Edition', 'La Cerveza que se Escribe Como la Gente Quiere', 'Lali', 'Lionel Messi',
         'Lo Dice la Lata', 'Lollapalooza', 'Los Pumas', 'Mundial 2018', 'Mundial 2022', 'Music Festival', 'Nastalgic Edition 1959', 'New Edition', 'Nueva', 'Nueva Receta', 'Spreen', 'Star Wars: The Rice of Skywalker', 'The Blue Edition', 'The Green Edition', 'The Red Edition', 'The Summer Edition', 'The Tropical Edition', 'Vendimia 2022', 'World Edition 2018', 'X Nuestra Musica']

for elemento in lista:
    payload = {"nombre": elemento}
    res = requests.post(url_bd, json=payload)
    if res.status_code in (200, 201):
        print(f"✅ '{elemento}' guardado correctamente.")
    else:
        print(
            f"❌ Error al guardar '{elemento}': {res.status_code} - {res.text}")
