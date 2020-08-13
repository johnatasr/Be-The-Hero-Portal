from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APITestCase
from ongs.models import Ong


class OngAPIViewTestCase(APITestCase):

    def setUp(self):
        self.username = "test"
        self.email = "testn@test.com"
        self.password = "Test123@"
        self.user = User.objects.create_user(self.username, self.email, self.password)
        response = self.client.post('/core/token/obtain/', {'username': self.username, 'password': self.password},
                                    format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue('access' in response.data)
        self.token = response.data['access']

    def test_create_ong(self):
        data = {
            "name": "Teste1",
            "email": "contato@teste1.com",
            "whatsapp": "123434343234",
            "city": "Fortaleza",
            "uf": "CE"
        }

        response = self.client.post('/api/ongs/createOng/', data=data,
                                    format='json', HTTP_AUTHORIZATION='JWT ' + self.token)
        self.assertEqual(200, response.status_code)

    def test_all_ongs(self):
        Ong.objects.create(
            id='abcde',
            name='ong3',
            email='ong3@ong.com',
            whatsapp='12345678912',
            city='teste3',
            uf='CE',
            user=self.user
        )
        response = self.client.get('/api/ongs/list_ongs/', {'id': self.user.id})
        self.assertTrue(response.data['total'] == Ong.objects.all().count())

