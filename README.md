# AngWithDotNet

stripe login
stripe listen --forward-to <https://localhost:5001/api/payments/webhook> -e payment_intent.succeeded

dotnet publish -c Release -o ./bin/Publish

dotnet ef migrations add AddedPhotosRelations -p Infrastructure -s API -o Migrations
