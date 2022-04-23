from rest_framework import serializers
from django.conf import settings
from wallet.models import *
from wallet.api import WalletClient
from cryptography.fernet import Fernet


wallet = WalletClient(secret_key="hfucj5jatq8h", public_key="uvjqzm5xl6bw")
fernet = Fernet(settings.ENCRYPTION_KEY)

class WalletSerializer(serializers.Serializer):
    bvn = serializers.CharField()

    # def validate(self, attrs):
    #     return super().validate(attrs)
    
    def create(self, validated_data):
        print(self)
        bvn = validated_data['bvn']

        # make request to create wallet 
        new_wallet = wallet.create_user_wallet(
            first_name= self.request.user.first_name,
            last_name= self.request.user.last_name,
            email= self.request.user.email,
            date_of_birth= self.request.user.date_of_birth.strftime('%Y-%m-%d'),
            bvn= str(bvn) 
        )

        if new_wallet["response"]["responseCode"] == '200':
            # update hasWallet status for the user
            self.request.user.hasWallet = True
            self.request.user.save()

            # create wallet in DB 
            instance = Wallet.objects.create(
                user = self.request.user,
                balance = new_wallet["data"]["availableBalance"],
                account_name = new_wallet["data"]["accountName"],
                account_number = new_wallet["data"]["accountNumber"],
                bank = new_wallet["data"]["bank"],
                phone_number = new_wallet["data"]["phoneNumber"],
                password = fernet.encrypt(new_wallet["data"]["password"].encode())
            )

        return instance






