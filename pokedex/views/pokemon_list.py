from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from pokedex.services.pokemon_services import fetch_pokemon_list

class PokemonListView(APIView):

    def get(self, request):
        #Parámetros de paginacion y busqueda
        page      = int(request.query_params.get('page', 1))
        page_size = int(request.query_params.get('page_size', 10))
        search    = request.query_params.get('search', None)

        # 2) Llamamos al servicio con dos parametros uno de busqueda y otro de paginacion 
        data = fetch_pokemon_list(page=page, page_size=page_size, search=search)

        
        if data is None:
            return Response(
                {'error': 'Error al obtener datos de la PokeAPI'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        
        return Response(data, status=status.HTTP_200_OK)