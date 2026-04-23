from django.contrib.auth.signals import user_logged_in
from django.dispatch import receiver
from analytics.models import SessionParameters

@receiver(user_logged_in)
def on_login_for_analytic(request, user, **kwargs):
    SessionParameters.objects.filter(id=request.session["_ses_param"]).update(user=user)
