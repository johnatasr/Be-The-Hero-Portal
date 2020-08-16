from django.db import models
from ongs.models import Ong

class Incident(models.Model):
    title = models.CharField('Título', max_length=50, null=True, blank=True)
    description = models.CharField('Descrição', max_length=500, blank=True, null=True)
    value = models.DecimalField('Valor em R$', decimal_places=2, max_digits=30, blank=True, null=True)
    value_total = models.DecimalField('Valor arrecardado', decimal_places=2, max_digits=300, blank=True, null=True)
    ong = models.ForeignKey(Ong, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'{self.title}  -  Valor : R$ {self.value}'