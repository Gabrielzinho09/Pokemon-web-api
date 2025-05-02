

from rest_framework import serializers
#Convierte datos diccionarios a json o viceversa
#formato estructura
class PokemonSerializer(serializers.Serializer):
    name = serializers.CharField()
    sprite = serializers.URLField()
    abilities_count = serializers.IntegerField()
    detail_url = serializers.URLField()