from incidents.models import Incident
from django.test import TestCase


class IncidentsTest(TestCase):

    def setUp(self):
        Incident.objects.create(
            title='Title Teste',
            description='teste',
            value=10,
            value_total=100,
        )
        Incident.objects.create(
            title='Title Teste 2',
            description='teste 2',
            value=20,
            value_total=200,
        )

    def test_get_value_total(self):
        incident_1 = Incident.objects.get(title='Title Teste')
        incident_2 = Incident.objects.get(title='Title Teste 2')
        self.assertEqual(
            incident_1.value_total, 100)
        self.assertEqual(
            incident_2.value_total, 200)

    def test_insert_value_total(self):
        incident_1 = Incident.objects.get(title='Title Teste')
        incident_2 = Incident.objects.get(title='Title Teste 2')

        incident_1.value_total = incident_1.value_total + 10
        incident_1.save()

        incident_2.value_total = incident_2.value_total + 10
        incident_2.save()

        self.assertEqual(
            incident_1.value_total, 110)
        self.assertEqual(
            incident_2.value_total, 210)




