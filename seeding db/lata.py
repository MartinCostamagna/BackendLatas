import pyodbc
import requests
db_file = r'D:\Programas\Ejecutables\Latas\Base de datos Latas.accdb'
driver = '{Microsoft Access Driver (*.mdb, *.accdb)}'
connection_string = f'DRIVER={driver};DBQ={db_file};'
API_BASE_URL = "http://localhost:3000"
url_latas_api = f"{API_BASE_URL}/latas"


def fetch_api_lookup_map(endpoint_url, key_field, value_field='id'):
    try:
        res = requests.get(endpoint_url)
        res.raise_for_status()
        data = res.json()
        return {str(item[key_field]).lower(): item[value_field] for item in data}
    except requests.exceptions.RequestException as e:
        print(
            f"❌ Error fatal: No se pudo obtener el mapa desde {endpoint_url}. Mensaje: {e}")
        exit()


print("✅ Obteniendo mapas de referencia desde la API...")
marcas_map = fetch_api_lookup_map(f"{API_BASE_URL}/marcas", "nombre")
tamanos_map = fetch_api_lookup_map(f"{API_BASE_URL}/tamanos", "volumen")
sabores_map = fetch_api_lookup_map(f"{API_BASE_URL}/sabores", "nombre")
especialidades_map = fetch_api_lookup_map(
    f"{API_BASE_URL}/especialidades", "nombre")
ediciones_especiales_map = fetch_api_lookup_map(
    f"{API_BASE_URL}/ediciones-especiales", "nombre")
descripciones_map = fetch_api_lookup_map(
    f"{API_BASE_URL}/descripciones", "texto")
paises_map = fetch_api_lookup_map(f"{API_BASE_URL}/paises", "nombre")
print("✅ Mapas cargados correctamente desde la API.")


print("\nObteniendo datos de la tabla 'Latas' de Access...")
latas_de_access = []
connection = None
try:
    connection = pyodbc.connect(connection_string)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM Latas")
    latas_de_access = cursor.fetchall()
    print(f"Se encontraron {len(latas_de_access)} latas para procesar.")
finally:
    if connection:
        connection.close()
        print("✅ Conexión a Access cerrada.")


print("\nIniciando proceso de carga a la API...")
for i, lata in enumerate(latas_de_access):
    print(
        f"--- Procesando lata {i+1}/{len(latas_de_access)}: {lata.Marca} {lata.EdicionEspecial} ---")

    marca_id = marcas_map.get(str(lata.Marca).lower())
    tamano_id = tamanos_map.get(str(lata.Tamaño).lower())
    sabores_id = sabores_map.get(str(lata.Sabor).lower())
    especialidad_id = especialidades_map.get(str(lata.Especialidad).lower())
    edicion_especial_id = ediciones_especiales_map.get(
        str(lata.EdicionEspecial).lower())
    descripcion_id = descripciones_map.get(str(lata.Descripcion).lower())
    pais_id = paises_map.get(str(lata.Pais).lower())

    es_ed_limitada = str(lata.EdLimitada).lower() == 'si'

    try:
        numero_caja = int(lata.Caja)
    except (ValueError, TypeError):
        numero_caja = None

    payload = {
        "marcaId": marca_id,
        "tamañoId": tamano_id,
        "saborId": sabores_id,
        "especialidadId": especialidad_id,
        "edicionLimitada": es_ed_limitada,
        "edicionEspecialId": edicion_especial_id,
        "descripcionId": descripcion_id,
        "anio": int(lata.Año),
        "paisId": pais_id,
        "numeroDeCaja": numero_caja,
        "foto1": lata.Foto1,
        "foto2": lata.Foto2,
        "foto3": lata.Foto3,
    }

    try:
        res = requests.post(url_latas_api, json=payload)
        if res.status_code in (200, 201):
            print(f"✅ Lata guardada correctamente.")
        else:
            print(f"❌ Error al guardar: {res.status_code} - {res.text}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error de conexión a la API: {e}")
        break

print("\n--- Proceso finalizado. ---")
