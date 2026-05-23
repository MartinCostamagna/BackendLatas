import bcrypt
import psycopg2


def generar_password_hash(password: str) -> str:
    salt = bcrypt.gensalt(rounds=10)
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


def crear_usuario_administrador():
    email_login = "martinandrecosta@gmail.com"
    password_login = "eR&96$v+TQ31G@I"
    db_config = {
        "dbname": "latas_db",
        "user": "myuser",
        "password": "mypassword",
        "host": "localhost",
        "port": "5433"
    }

    password_hasheada = generar_password_hash(password_login)

    try:
        conn = psycopg2.connect(**db_config)
        cursor = conn.cursor()

        query = """
            INSERT INTO "users" (email, password) 
            VALUES (%s, %s);
        """

        cursor.execute(query, (email_login, password_hasheada))
        conn.commit()

        print("\n=============================================")
        print("¡USUARIO CREADO EXITOSAMENTE EN DOCKER!")
        print(f"Email: {email_login}")
        print(f"Password: {password_login}")
        print("=============================================\n")

        cursor.close()
        conn.close()

    except psycopg2.OperationalError as e:
        print("\n Error de conexión: ¿Está el contenedor de Docker encendido y mapeando el puerto 5432?")
        print(f"Detalle: {e}\n")
    except Exception as e:
        print(f"\n Ocurrió un error al insertar el usuario: {e}\n")


if __name__ == "__main__":
    crear_usuario_administrador()
