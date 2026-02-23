from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
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
        read_only_fields = ("id", "is_staff", "is_active")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

    def update(self, instance, validated_data):
        password = self.validated_data.pop(
            "password",
        )
        user = super().update(instance, validated_data)

        if password:
            user.set_password(password)
            user.save()
        return user
