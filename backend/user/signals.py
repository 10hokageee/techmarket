from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from analytics.models import SessionParameters


@receiver(user_logged_in)
def on_login_for_analytic(request, user, **_):
    if id_ := request.session.get("_ses_param"):
        SessionParameters.objects.filter(id=id_).update(user=user)
