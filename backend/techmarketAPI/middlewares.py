from user_agents.parsers import UserAgent


class TechMarketSessionParametersMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.ip_seeker = "http://ip-api.com/json/"

    def get_device_type(self, ua: UserAgent) -> str:
        from analytics.models import DeviceChoices

        return (
            DeviceChoices.BOT
            if ua.is_bot
            else (
                DeviceChoices.MOBILE
                if ua.is_mobile
                else (
                    DeviceChoices.TABLET
                    if ua.is_tablet
                    else DeviceChoices.DESKTOP if ua.is_pc else DeviceChoices.UNKNOWN
                )
            )
        )

    def get_browser(self, ua: UserAgent) -> str:
        from analytics.models import BrowserChoices

        browser = ua.browser.family.upper()
        return next(
            (
                browser_choice
                for browser_choice, _ in BrowserChoices.choices
                if browser_choice in browser
            ),
            BrowserChoices.OTHER,
        )

    def get_continent_and_country_by_ip(
        self, ip: str
    ) -> tuple[str, str] | tuple[None, None]:
        import requests
        from urllib.parse import urljoin

        url = urljoin(self.ip_seeker, ip)
        res = requests.get(
            url,
            params={"fields": "status,continent,countryCode"},
        )
        if res.status_code == 200 and (data := res.json()).get("status") == "success":
            return data["continent"].upper(), data["countryCode"]
        return None, None

    def __call__(self, request):
        req_path = request.path
        response = self.get_response(request)

        if req_path in ("/user/login/", "/user/register/") and (
            refresh := response.data.get("refresh")
        ):
            import user_agents

            from rest_framework_simplejwt.tokens import RefreshToken
            from analytics.models import SessionParameters
            from ipware import get_client_ip

            ip, is_routable = get_client_ip(request)
            if is_routable:
                user_agent = user_agents.parse(request.META.get("HTTP_USER_AGENT", ""))

                device_type = self.get_device_type(ua=user_agent)
                browser = self.get_browser(ua=user_agent)
                continent, country = self.get_continent_and_country_by_ip(ip=ip)

                if device_type != "BOT":
                    refresh = RefreshToken(refresh)
                    user_id = refresh.payload.get("user_id")

                    SessionParameters.objects.create(
                        device=device_type,
                        browser=browser,
                        continent=continent,
                        country=country,
                        user_id=user_id,
                        access_token=response.data.get("access"),
                    )
        return response
