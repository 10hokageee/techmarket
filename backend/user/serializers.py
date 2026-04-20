from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import check_password
from django.core.files.uploadedfile import InMemoryUploadedFile
from rest_framework import serializers
from rest_framework.exceptions import PermissionDenied, ValidationError

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
        data["icon"] = instance.get_avatar
        return data

    def create(self, validated_data):
        return USER_MODEL.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        ...


class ManageUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER_MODEL
        fields = (
            "username",
            "email",
            "first_name",
            "last_name",
            "icon"
        )
        extra_kwargs = {
            "username": {"required": False},
            "email": {"required": False},
            "first_name": {"required": False},
            "last_name": {"required": False},
            "icon": {"required": False},
        }

    def validate(self, attrs):
        if not attrs:
            raise ValidationError(
                {
                    "detail": "You need to supply at least one field.",
                }
            )
        if attrs.get("icon") and not isinstance(attrs["icon"], InMemoryUploadedFile):
            raise ValidationError(
                {
                    "detail": "Icon must be a byte string.",
                }
            )
        return attrs

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data["icon"] = instance.get_avatar
        return data

    def create(self, validated_data):
        ...
