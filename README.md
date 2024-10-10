# AngWithDotNet

stripe login
stripe listen --forward-to <https://localhost:5001/api/payments/webhook> -e payment_intent.succeeded

cd API
dotnet publish -c Release -o ./bin/Publish
Send to Azure Publish folder

dotnet ef migrations add AddedPhotosRelations -p Infrastructure -s API -o Migrations
