 Pokedex Web API – Caronte Challenge Ingreso
	
	Esta aplicación es una Pokédex desarrollada como parte de un challenge técnico.
	

	Requisitos del challenge

	✅ Usar Django 
	✅ Obtener todos los Pokemon de la API
	✅ Mostrar una lista paginada con nombre, sprite, número de habilidades 
	✅ Mostrar perfil completo de cada Pokemon al hacer clic  


 	Pokedex Web API - Proyecto para obtener datos pokemons de la API pública(https://pokeapi.co/).

	Proyecto personal para el consumo de API POKEMON.

	🧪 Tecnologías utilizadas
	🧠 Backend: Python + Django Rest Framework
	🎨 Frontend: React + Vite + Typescript + TailwindCSS

	Requisitos:
	
	🔙 Backend carpeta pokemon_app

	- Python 3.11
	- Django
	- Django REST Framework
	- PokeAPI 
	- CORS Headers

	🔝 Frontend carpeta client-pok

	- React
	- Vite
	- TypeScript
	- Axios
	- TailwindCSS

	📦 Estructura 
		
	BACKEND

	pokemon_app = Configuración general del proyecto Django
	
	pokedex     = lógica del proyecto
	admin.py
	apps.py
	urls.py
		models.py
		serializers.py
		views.py
		services.py
		migration.py

	Frontend

	client-pok

	src
	App.tsx   
	main.tsx                # Punto de entrada de la app
	index.css               # Estilos globales TailwindCSS
	.gitignore              #Ignorar archivos innecesarios
	index.html
	package.json
	tailwind.config.js
	tsconfig.json
	vite.config.ts
		components            # Componentes reutilizables 
		pages                 # Vistas principales 
		services              # Lógica para consumir la API
              	api                   #conexion con la API


	Instalación y despliegue:
//-------------------------------------------------------------------------------------------------------------------------//
	Backend
	#GITHUB Por favor clonar el repositorio
	git clone https://github.com/Gabrielzinho09/Pokemon-web-api.git	
	#Ingresar a la carpeta
	cd pokemon_app
	#crea y activa el entorno virtual
	python -m venv venv
	source venv/bin/activate  # Windows: venv\Scripts\activate
	#instalar dependencias
	pip install -r requirements.txt
	#ejecutar el servidor
	python manage.py runserver
//-----------------------------------------------------------------------------------------------------------------------//	
	Frontend

	#Ingresar a la carpeta
	cd client-pok

	instalar dependencias
	npm install

	correr proy
	npm run dev

//---------------------------------------------------------------------------------------------------------------------------------//
	
	* - Notas adicionales - *

	Se obtuvo problemas en Django al obtener varios pokemons paralelamente para no afectar el tiempo de respuesta al consultar los pokemons ya sea por parámetro de búsqueda
	o listado de todos posterior quedo resuelto con una búsqueda en hilos o paralela que no afecte el rendimiento de la busqueda.
	
	Se usaron algunos componentes de diseño encontrados en línea sobre todo el paginado.

	Todos los endpoints fueron consultados desde la API de pokemons y probados en THUNDER CLIENT.

	La aplicación fue desarrollada en un entorno multiplataforma compatible con Linux y Windows.
	

	
	

	
		
	

	