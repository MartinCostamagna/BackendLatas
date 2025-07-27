import requests

url_bd = "http://localhost:3000/sabores"
lista = ['Agua', 'Agua Tonica', 'Anana', 'Cereza y Frutos Rojos', 'Cerveza APA', 'Cerveza IPA', 'Cerveza IPA Roja', 'Cerveza Negra', 'Cerveza Roja', 'Cerveza Rubia', 'Cerveza de Arandano', 'Cerveza de Arroz', 'Cerveza de Frambuesa', 'Cerveza de Lima', 'Cerveza de Maracuya', 'Cerveza de Miel', 'Cerveza de Naranja', 'Cerveza de Pomelo', 'Cerveza de Trigo', 'Cerveza de Vino', 'Cerveza de Yerba', 'Cherry', 'Cigarrillos Rubios', 'Citrus', 'Cola', 'Cola y Café', 'Cola y Coco', 'Cola y Limon', 'Durazno - Frutilla', 'Fernet & Cola', 'Fizzy Cookie Flavored', 'Fruity Fantasy', 'Fruta del Dragon', 'Frutal', 'Frutilla y Crema', 'Frutos Rojos', 'Future', 'Gin & Tonic',
         'Gin Tonic de Frutos del Bosque', 'Gin Tonic de Maracuya', 'Ginger Ale', 'Guarana', 'Hibiscus', 'Hibiscus y Frutos Rojos', 'Kiwi', 'Kiwi, Lima y Pepino', 'Lima', 'Lima-Limon', 'Limon', 'Mango', 'Manzana Verde', 'Maracuya', 'Maracuyá, Naranja y Guayaba', 'Melon', 'Mojito', 'Naranja', 'Naranja y Lima', 'Naranja y Pomelo', 'Pixel', 'Pomelo', 'Pomelo y Lima', 'Ponche', 'Red Berries', 'Ron & Cola', 'Sandia', 'Sandia y Frutilla', 'Sidra', 'Tonica y Limon', 'Tropical', 'Uva', 'Vainilla y Strawberry', 'Vino Blanco', 'Vino Dulce Rosado', 'Vino Espumante', 'Vino Espumante de Limon', 'Vino Espumante de Pomelo', 'Vino Tinto', 'Vino Tinto + Soda', 'Vodka', 'Vodka & Citrus']

for elemento in lista:
    payload = {"nombre": elemento}
    res = requests.post(url_bd, json=payload)
    if res.status_code in (200, 201):
        print(f"✅ '{elemento}' guardado correctamente.")
    else:
        print(
            f"❌ Error al guardar '{elemento}': {res.status_code} - {res.text}")
