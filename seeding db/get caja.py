import pyodbc
db_file = r'D:\Programas\Ejecutables\Latas\Base de datos Latas.accdb'

driver = '{Microsoft Access Driver (*.mdb, *.accdb)}'

connection_string = f'DRIVER={driver};DBQ={db_file};'

connection = None
try:
    connection = pyodbc.connect(connection_string)
    print("¡Conexión exitosa a la base de datos Access!")

    cursor = connection.cursor()

    tabla = 'Caja'
    sql_query = f"SELECT numero, capacidad, cantidadActual FROM {tabla}"

    cursor.execute(sql_query)
    print(f"Resultados de la tabla '{tabla}':")

    salida = []
    for row in cursor.fetchall():
        salida.append(row)
    salida.pop(0)
    print(salida)
except pyodbc.Error as ex:
    sqlstate = ex.args[0]
    print(f"Error al conectar o ejecutar la consulta.")
    print(f"SQLSTATE: {sqlstate}")
    print(f"Mensaje: {ex}")

finally:
    if connection:
        connection.close()
        print("\nLa conexión a la base de datos se ha cerrado.")
