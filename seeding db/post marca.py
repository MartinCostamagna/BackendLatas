import requests

url_bd = "http://localhost:3000/marcas"
lista = ['1882', '1890', '1930', '361', '7Up', 'Ala Manchada', 'Amstel', 'Andes', 'Andes Origen', 'Antarctica', 'Antares', 'Aquarius', 'Bacardi', 'Baly', 'Beerdier', 'Blasfemia', 'Blest', 'Block', 'Blue Moon', 'Bohemia', 'Boj', 'Boris', 'Brahma', 'Brauperle', 'Breda', 'Brew House', 'Budweiser', 'Carlsberg', 'Chupa Chups', 'Clausthaler', 'Coca Cola', 'Cordero con Piel de Lobo', 'Cordoba', 'Corona', 'Cusqueña', 'Dab', 'Dada', 'Darguner', 'Del Valle', 'Dia%', 'Dilema', 'Dr Lemon', 'Duff', 'Eichbaum', 'Erdinger', 'Estrella Damm', 'Estrella Galicia', 'Everlast', 'Famous House', 'Fanta', 'Faxe', 'Frizze', 'Gancia', 'Glinter', 'Goose Island', 'Gordon´s', 'Grolsch', 'Guarana Antartica', 'H2oH', 'Heineken', 'Iguana', 'Imperial', 'Iron Maiden', 'Isenbeck',
         'Itaipava', 'Kaiserdom', 'KillSed', 'Konigsbacher', 'Kronenbourg', 'Lit', 'Livenza', 'Lucky Strike', 'Manaos', 'Meet', 'Michel Torino', 'Michelob', 'Milkis', 'Miller', 'Mingo', 'Mirinda', 'Monster Energy', 'Mountain Dew', 'New Age', 'Oettinger', 'Oranjeboom', 'Palermo', 'Paso de los Toros', 'Patagonia', 'Pepsi', 'Peñon Destileria', 'Peñon del Aguila', 'Pritty', 'Pronto', 'Puls', 'Quilmes', 'Rabieta', 'Red Bull', 'Royal Dutch', 'Saint Omer', 'Salta', 'Salta Cautiva', 'Santa Fe', 'Santa Julia', 'Schneider', 'Schofferhofer', 'Schweppes', 'Skol', 'Smirnoff', 'Sol', 'Speed', 'Spoller', 'Sprite', 'Stella Artois', 'Sunkist', 'Sunny 10', 'Temple', 'Terma', 'The Mula', 'Top Beer', 'Tsingtao', 'Very', 'Vitaliza', 'Warsteiner', 'Weidmann', 'X4', 'Yerbeza', 'Z Energy']

for elemento in lista:
    payload = {"nombre": elemento}
    res = requests.post(url_bd, json=payload)
    if res.status_code in (200, 201):
        print(f"✅ '{elemento}' guardada correctamente.")
    else:
        print(
            f"❌ Error al guardar '{elemento}': {res.status_code} - {res.text}")
