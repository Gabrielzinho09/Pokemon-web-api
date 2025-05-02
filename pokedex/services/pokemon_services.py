import requests
from django.core.cache import cache
from concurrent.futures import ThreadPoolExecutor, as_completed




 #Obtengo datos por nombre o ID para el detalle del pokemon

def fetch_pokemon_detail(name_or_id):
    
    url = f'https://pokeapi.co/api/v2/pokemon/{name_or_id}/'
    response = requests.get(url)
    return response.json() if response.status_code == 200 else None

#obtengo todos los pokemon tambien los mantengo en cache para no retrasar el time request
def fetch_all_pokemon_names():
    
    cache_key = "all_pokemon_names"
    cached = cache.get(cache_key)
    if cached:
        return cached

    url = "https://pokeapi.co/api/v2/pokemon?limit=1200&offset=0"
    response = requests.get(url)
    if response.status_code != 200:
        return None

    data = response.json()['results'] #obtengo objeto
    # tiempo de espera una hora
    cache.set(cache_key, data, timeout=60*60)  
    #obtengo data
    return data

def fetch_pokemon_list(page=1, page_size=50, search=None):
    
    #reutilizo la lista de pokemon
    all_pokemons = fetch_all_pokemon_names()
    if all_pokemons is None:
        return None

    # busqueda por parametro en la asignacion anterior 
    if search:
        all_pokemons = [
            p for p in all_pokemons
            if search.lower() in p['name'].lower()
        ]
    #calcula coincidencias de pokemon con ese parametro o trae la lista completa de pokemons en la var all_pokemons
    total = len(all_pokemons)
    offset = (page - 1) * page_size
    page_items = all_pokemons[offset: offset + page_size]

    results = []
    
    #trabajamos con el detalle del pokemon
    # Ejecutamos las peticiones en paralelo
    with ThreadPoolExecutor(max_workers=page_size) as executor:
        # mapea cada futuro a la entrada original
        #trabaja en la pagina actual paginada obteniendo el objeto, guarda en el diccionario p
        futures = {executor.submit(fetch_pokemon_detail, p['name']): p for p in page_items}

        for future in as_completed(futures):
            original = futures[future]
            #nos retorna una promesa cumplida la cual trabaja en hilos para no retrasar la busqueda
            #luego renderiza de uno en uno 
            detail = future.result()
            if not detail:
                continue
            results.append({
                'name': detail['name'],
                'sprite': detail['sprites']['front_default'],
                'abilities_count': len(detail['abilities']),
                'detail_url': original['url'],
            })

    # trabajamos con links next y previous pagina siguiente y pagina anterior
    def make_link(pn):
        max_page = (total - 1) // page_size + 1
        #validacion de pagina menor a 1 y mayor que maximo
        if pn < 1 or pn > max_page:
            return None
        link = f"/api/pokemons/?page={pn}&page_size={page_size}"
        if search:
            link += f"&search={search}"
        return link

    return {
        #pokemons total
        'count': total,
        'next': make_link(page + 1),
        'previous': make_link(page - 1),
        #pokemo actual pag
        'results': results,
    }