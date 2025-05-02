from django.urls import path
from pokedex.views.pokemon_list import PokemonListView
from pokedex.views.pokemon_detail import PokemonDetailView

urlpatterns = [
    path('pokemons/', PokemonListView.as_view(), name='pokemon-list'),
    path('pokemons/<str:name_or_id>/', PokemonDetailView.as_view(), name='pokemon-detail'),

]