pip install -r requirements.txt



python manage.py migrate 

echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@example.com', 'admin')" | python manage.py shell

python manage.py runserver

wget http://127.0.0.1:8000/Operations/ManagerPopulate
cd client
npm install
npm start 