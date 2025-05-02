from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from pokedex.services.pokemon_services import fetch_pokemon_detail

class PokemonDetailView(APIView):
    def get(self, request, name_or_id):
        data = fetch_pokemon_detail(name_or_id)

        if data is None:
            return Response({'error': 'Pokémon no encontrado'}, status=status.HTTP_404_NOT_FOUND)

        # Estructura de datos se consume de mi servicio
        detail = {
            'id': data['id'],
            'name': data['name'],
            'sprite': data['sprites']['front_default'],
            'height': data['height'],
            'weight': data['weight'],
            'types': [t['type']['name'] for t in data['types']],
            'abilities': [a['ability']['name'] for a in data['abilities']],
            'stats': {stat['stat']['name']: stat['base_stat'] for stat in data['stats']}
        }

        return Response(detail)