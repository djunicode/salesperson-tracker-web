pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
wget http://127.0.0.1:8000/Operations/ManagerPopulate
cd client
npm install
npm start
