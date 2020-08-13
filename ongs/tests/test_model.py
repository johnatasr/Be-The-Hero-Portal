from ongs.models import Ong
from django.test import TestCase


class OngsTest(TestCase):

    def setUp(self):
        Ong.objects.create(
            id='abcd',
            name='ong1',
            email='ong1@ong.com',
            whatsapp='12345678912',
            city='teste',
            uf='RJ',
        )
        Ong.objects.create(
            id='dcba',
            name='ong2',
            email='ong2@ong.com',
            whatsapp='12345678912',
            city='teste2',
            uf='SP',
        )

    def test_get_email(self):
        ong_1 = Ong.objects.get(id='abcd')
        ong_2 = Ong.objects.get(id='dcba')
        self.assertEqual(
            ong_1.email, 'ong1@ong.com')
        self.assertEqual(
            ong_2.email, 'ong2@ong.com')

    def test_get_name(self):
        ong_1 = Ong.objects.get(id='abcd')
        ong_2 = Ong.objects.get(id='dcba')
        self.assertEqual(
            ong_1.name, 'ong1')
        self.assertEqual(
            ong_2.name, 'ong2')

