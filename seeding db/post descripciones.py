import requests

url_bd = "http://localhost:3000/descripciones"
lista = ['0.0', '100% Malta', '12', '2019-2020', '2021-2022', '2024-2025', '7.1', '99 Kcal', 'Abrazo de Oso', 'Abstemia IPA', 'Amber Lager', 'American Pilsener', 'Ana', 'Arandano Sour', 'BB-8', 'Bavarian Pilsener Lager', 'Bazinga Session IPA', 'Better Citric', 'Bizarrap', 'Black', 'Blanche', 'Blue', 'Boca Juniors', 'Bock', 'Bohemian Pilsener', 'Brahama', 'Brama', 'Byte', 'Caballeros de Ren', 'Cacao IPA', 'Campeón', 'Campeón del Mundo', 'Caravana Session IPA', 'Cazzu', 'Cero Azucares', 'Clasica', 'Con Agua de Mar', 'Copa', 'Copa Libertadores', 'Cosmica', 'Covent Gin', 'Cream Stout', 'Criolla', 'Das Galaxias', 'Doble Malta', 'Dorada', 'Duki', 'Ed Selección 2002', 'Ed Selección 2006', 'Edicion Aniversario', 'Edition Limitee', 'Estamos Como Queremos', 'Euge', 'Extra Lager', 'Fido Dido', 'Finn', 'Flashear Planes Juntos', 'Fresquita', 'Frost', 'Gabi', 'Golden', 'Grape Fruit', 'Guitarra', 'Hefe Weibbier', 'Hefetrub', 'Honey', 'Hoppy Lager', 'IPA Andina', 'Ice', 'Isidra', 'K-Wave', 'Kilometro 24.7', 'Kune', 'Kylo Ren', 'L-gante', 'La Joaqui', 'La Mejor Hinchada del Mundo', 'Lali', 'Lider', 'Limonada',
         'Limonada Citrus', 'Limonata', 'Lionel Messi', 'Lucy Bronze', 'Magia, Algo Rico', 'Mango Loco', 'Maracuya Sour', "Marshmello's", 'Mexican Lager', 'Miel', 'Misterio', 'Modo Finde', 'Move Rosalia', 'Negra', 'Nicki Nicole', 'Noire', 'Octubrefest', 'Oktoberfest', 'Oreo', 'Original', 'Pablito Lescano', 'Pacific Punch', 'Paul Pogba', 'Pipeline Punch', 'Playa Grande', 'Pomelada', 'Premium', 'Premium Lager', 'Puro Malte', 'Red', 'Reserve White Pineapple', 'Rey', 'River Plate', 'Roja', 'Rojita', 'Rojo+Soda', 'Rosario Central', 'Royal Export', 'Rubia', 'Rubia Adorada', 'Rubia Oro', 'Sem Azucar', 'Sendero Sur', 'Sin Alcohol', 'Sin Azucar', 'Sin Azucares', 'Slam', 'Sol Citra', 'Soltar Todo', 'Sparkly Pink', 'Stout', 'Sub Zero', 'Subite a la Schhhcaloneta', 'SugarFree', 'Sweet', 'Tiago PZK', 'Tintillo', 'Tradicion Historica', 'Travesia Sureña', 'Trigueña', 'Trooper', 'Tropical Gin', 'Trueno', 'Twist', 'Twist Black', 'Ultra', 'Ultra Paradise', 'Ultra Sunrise', 'Ultra Watermelon', 'VR46 The Doctor', 'Vera IPA', 'Watermelon Punch', 'Weizen', 'Wolf IPA', 'World Cup Qatar', 'World Lager', 'Y3000', 'Zero']

for elemento in lista:
    payload = {"texto": elemento}
    res = requests.post(url_bd, json=payload)
    if res.status_code in (200, 201):
        print(f"✅ '{elemento}' guardado correctamente.")
    else:
        print(
            f"❌ Error al guardar '{elemento}': {res.status_code} - {res.text}")
