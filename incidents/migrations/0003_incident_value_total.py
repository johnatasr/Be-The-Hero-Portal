# Generated by Django 3.0.3 on 2020-08-06 02:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('incidents', '0002_incident_ong'),
    ]

    operations = [
        migrations.AddField(
            model_name='incident',
            name='value_total',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=300, null=True, verbose_name='Valor arrecardado'),
        ),
    ]