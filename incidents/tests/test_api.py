from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from incidents.models import Incident
from ongs.models import Ong


class IncidentsListCreateAPIViewTestCase(APITestCase):

    def setUp(self):
        self.username = "test"
        self.email = "testn@test.com"
        self.password = "Test123@"
        self.user = User.objects.create_user(self.username, self.email, self.password)
        response = self.client.post('/core/token/obtain/', {'username': self.username, 'password': self.password}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)
        self.token = response.data['access']

        # Cria incidente 2
        self.incident = Incident.objects.create(
            title='Teste 1',
            description='des 1',
            value=10
        )

        # Ong
        self.ong_obj = Ong.objects.create(
            id='abcd',
            name='ong_teste',
            email='t1@ong.com',
            user=self.user
        )

    def test_create_incident(self):
        data = {
            'title': 'Teste 2',
            'description': 'teste 2',
            'value': 20,
            'ong': 'abcd'
        }
        response = self.client.post('/api/incidents/createIncident/', data=data,
                                    format='json', HTTP_AUTHORIZATION='JWT ' + self.token)
        self.assertEqual(200, response.status_code)
        incident = Incident.objects.filter(title='Teste 2')
        self.assertEqual(incident.exists(), True)


    def test_all_incidents_mobile(self):
        Incident.objects.create(
            title='Teste 3',
            description="Teste 3",
            value=30,
        )
        response = self.client.get('/api/incidents/allIncidents/', {'page': 1},
                                   format='json', HTTP_AUTHORIZATION='JWT ' + self.token)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['total'], Incident.objects.count())


    def test_incident_value_total_update(self):
        response = self.client.post('/api/incidents/sendValueIncident/',
                                    {"idIncident": self.incident.id, "value": '10'},
                                    format='json',
                                    HTTP_AUTHORIZATION='JWT ' + self.token)
        self.assertEqual(200, response.status_code)


    def test_incident_search_field(self):
        response = self.client.get('/api/incidents/searchIncidents/',
                                    {'title': 'Teste 1', 'idIncident': self.incident.id},
                                   format='json',  HTTP_AUTHORIZATION='JWT ' + self.token)
        self.assertEqual(200, response.status_code)
        incident = Incident.objects.get(id=self.incident.id)
        self.assertEqual(response.data['incidents'][0].get("title"), incident.title)

    def test_incident_object_delete(self):
        response = self.client.delete(f'/api/incidents/delete_incident/?id={self.incident.id}&ong={self.ong_obj.id}',
                                      HTTP_AUTHORIZATION='JWT ' + self.token)
        self.assertEqual(200, response.status_code)