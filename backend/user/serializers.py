from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied

USER_MODEL = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER_MODEL
        fields = (
            "id",
            "username",
            "password",
            "icon",
            "email",
            "first_name",
            "last_name",
            "is_staff",
        )
        read_only_fields = ("id", "is_staff")
        extra_kwargs = {"password": {"write_only": True}}

    def to_representation(self, instance):
        data = super().to_representation(instance)
        if data["icon"]:
            data["icon"] = instance.icon.build_url(
                fetch_format="auto", quality="auto"
            ).rsplit(".", 1)[0]
        return data

    def create(self, validated_data):
        return USER_MODEL.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = self.validated_data.pop(
            "password",
        )
        if check_password(password, instance.password):
            user = super().update(instance, validated_data)
            user.set_password(password)
            user.save()
            return user
        raise PermissionDenied(
            {
                "Password": "Password incorrect",
            }
        )
