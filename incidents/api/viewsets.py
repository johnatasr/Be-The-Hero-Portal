from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
# from rest_framework.permissions import IsAuthenticated
from rest_framework.status import HTTP_200_OK, HTTP_401_UNAUTHORIZED
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from incidents.api.serializers import IncidentSerializer
from ongs.models import Ong
from incidents.models import Incident
from django.core.paginator import Paginator
import json

# Register your viewsets here.
class IncidentsViewSet(viewsets.ModelViewSet):
    queryset = []

    @action(methods=['GET'], detail=False)
    def listIncidents(self, request):
        query_page = request.query_params['page']
        query_id = request.query_params['id']

        queryset = Incident.objects.filter(ong__id=query_id).order_by('id')
        ong = Ong.objects.filter(id=query_id).first()
        serializer = IncidentSerializer(queryset, many=True).data

        total = len(serializer)

        incidents = Paginator(serializer, 8)
        pagina_incidents = incidents.page(query_page)

        lista_incidents = []
        for incident in pagina_incidents.object_list:
            payload = {
                "id": incident['id'],
                "title": incident['title'],
                "description": incident['description'],
                "value": incident['value'],
                "ong": incident['ong'],
                "value_total": incident['value_total']
            }
            lista_incidents.append(payload)

        return Response({'incidents': lista_incidents, 'total': total, 'ong': ong.name}, status=HTTP_200_OK)

    @action(methods=['GET'], detail=False)
    def allIncidents(self, request):
        query_page = request.query_params['page']

        queryset = Incident.objects.all()
        serializer = IncidentSerializer(queryset, many=True).data

        total = len(serializer)

        incidents = Paginator(serializer, 8)

        if query_page is None or '':
            query_page = 1
        pagina_incidents = incidents.page(query_page)

        lista_incidents = []
        for incident in pagina_incidents.object_list:
            payload = {
                "id": incident['id'],
                "title": incident['title'],
                "description": incident['description'],
                "value": incident['value'],
                "ong": incident['ong'] if 'ong' in incident else None,
            }
            lista_incidents.append(payload)

        return Response({'incidents': lista_incidents, 'total': total}, status=HTTP_200_OK)

    @action(methods=['POST'], detail=False)
    def createIncident(self, request):
        user_id = request.auth.payload['user_id']
        dados = request.data

        if isinstance(dados['value'], str):
            valor = float(dados['value'].split('R$')[1].replace('.', '').replace(',', '.'))
        else:
            valor = dados['value']

        if user_id == '' or user_id is None:
            ong = Ong.objects.get(id=dados['ong'])
        else:
            ong = Ong.objects.get(user__id=user_id, id=dados['ong'])

        obj_incident = {
            "title": dados['title'],
            "description": dados['description'],
            "value": valor,
            "ong": ong,
        }

        Incident.objects.create(**obj_incident)

        return Response({"data": "Incidente salvo com sucesso !"}, status=HTTP_200_OK)

    @action(methods=['DELETE'], detail=False)
    def delete_incident(self, request):
        id_incident = request.query_params['id']
        id_ong = request.query_params['ong']
        incident = Incident.objects.filter(id=id_incident, ong__id=id_ong)
        incident.delete()

        total = Incident.objects.filter(ong__id=id_ong).count()

        return Response({"total": total}, status=HTTP_200_OK)

    @action(methods=['GET'], detail=False)
    def searchIncidents(self, request):
        query = request.query_params['title']

        queryset = Incident.objects.filter(title__startswith=query).order_by('id')
        serializer = IncidentSerializer(queryset, many=True).data


        lista_incidents = []
        for incident in serializer:
            payload = {
                "id": incident['id'],
                "title": incident['title'],
                "description": incident['description'],
                "value": incident['value'],
                "value_total": incident['value_total'],
                "ong": incident['ong'],
            }
            lista_incidents.append(payload)

        return Response({'incidents': lista_incidents, 'total': len(serializer)}, status=HTTP_200_OK)

    @action(methods=['POST'], detail=False)
    def sendValueIncident(self, request):
        data = request.data

        queryset = Incident.objects.filter(id=data['idIncident']).first()
        valor_total_incidente = queryset.value_total

        if valor_total_incidente is None:
            valor_total_incidente = 0

        queryset.value_total = float(valor_total_incidente) + float(data['value'])
        queryset.save()

        return Response('Salvo com sucesso !', status=HTTP_200_OK)