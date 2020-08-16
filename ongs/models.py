from django.db import models
from django.contrib.auth.models import User

class Ong(models.Model):
    id = models.CharField('Id ONG', max_length=50, blank=True, primary_key=True)
    name = models.CharField('Nome', max_length=255, blank=True, null=True)
    email = models.CharField('E-mail', max_length=50, blank=True, null=True)
    whatsapp = models.CharField('WhatsApp', max_length=50, blank=True, null=True)
    city = models.CharField('Cidade', max_length=50, blank=True, null=True)
    uf = models.CharField('Estado', max_length=2, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return f'Nome Incidente: {self.name}   |  ID: {self.id}'
