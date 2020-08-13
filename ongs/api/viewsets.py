from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED
from rest_framework.response import Response
from ongs.models import Ong
from ongs.api.serializers import OngsSerializer
from ongs.views import randomString
from django.contrib.auth.models import User


# Register your viewsets here.
class OngsViewSet(viewsets.ModelViewSet):

    @action(methods=['GET'], detail=False)
    def list_ongs(self, request):
        try:
            user_id = request.auth.payload['id']
            queryset = Ong.objects.filter(user__id=user_id).order_by('id').distinct()
            serializer = OngsSerializer(queryset, many=True).data
            total = len(serializer)

            lista_ongs = []
            for ong in serializer:
                payload = {
                    "id": ong['id'],
                    "name": ong['name'],
                    "email": ong['email'],
                    "whatsapp": ong['whatsapp'],
                    "city": ong['city'],
                    "uf": ong['uf'],
                    "user": ong['user']
                }
                lista_ongs.append(payload)

            return Response({"lista_ongs": lista_ongs, "total": total}, status=HTTP_200_OK)
        except Exception as error:
            return Response('Error ao carregar ONGs', status=HTTP_401_UNAUTHORIZED)

    @action(methods=['POST'], detail=False)
    def create_ong(self, request):
        user_id = request.auth.payload['id']
        dados = request.data
        id_ong = randomString()

        user = User.objects.filter(id=user_id).first()

        obj_ong = {
            "id": id_ong,
            "name": dados['name'],
            "email": dados['email'],
            "whatsapp": dados['whatsapp'],
            "city": dados['cidade'],
            "uf": dados['uf'],
            "user": user
        }

        Ong.objects.get_or_create(**obj_ong)[0]

        return Response(id_ong, status=HTTP_200_OK)


