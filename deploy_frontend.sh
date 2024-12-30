sudo docker build -t gcr.io/cld-1-proj/frontend .
sudo docker push gcr.io/cld-1-proj/frontend
gcloud run deploy frontend --image=gcr.io/cld-1-proj/frontend --platform=managed --region=us-central1 --allow-unauthenticated


