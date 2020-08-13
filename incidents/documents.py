from django_elasticsearch_dsl import (
    DocType,
    fields,
    Index,
)

from ..incidents.models import Incident

incident_index = Index('incident')

incident_index.settings(
    number_of_shards=1,
    number_of_replicas=0
)


@incident_index.doc_type
class IncidentDocument(DocType):

    title = fields.StringField(
        attr='incident_title',
        fields={
            'raw': fields.StringField(analyzer='keyword'),
            'suggest': fields.Completion(),
        }
    )

    description = fields.StringField(
        attr='description',
        fields={
            'raw': fields.StringField(analyzer='keyword'),
        }
    )

    class Meta:
        model = Incident
        fields = [
            'id',
            'incident_title',
            'description'
        ]

