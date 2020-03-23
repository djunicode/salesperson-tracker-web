<p>
    <h1 align='center'> Salesperson </h1>
</p>

<h4 align='center'>Repository for Unicode 2020 project Salesperson Tracker system. </h4>

<br>
<br>
<br>

## File Structure

```
.
├── LICENSE
├── README.md
├── salespersonTracker/ -> Project configurations
├── salespersonTrackerREST -> Django app for endpoints
├── manage.py
└── requirements.txt
```

## Technology Stack

#### Backend

- Django 2.2+ (Python 3.6+)
- Django REST Framework

<!-- #### Frontend
- React <specify your versions> -->

## Build Instructions

#### Backend

```bash
  pip3 install -r requirements.txt
  python3 manage.py makemigrations
  python3 manage.py migrate
  python3 manage.py runserver
```

<!-- #### Frontend
```bash

``` -->

## Development Instructions

1. Before adding or commiting to git, please run `black .` inside this directory. This is important because we are using Black code formatter for this project and Travis build will fail otherwise.

2. The database we are using is sqllite3 for the prototype. We may change it to PostgreSQL later.

## Team

#### Developers

1. Ali Abbas Kanadia (Backend)
2. Rahil Kadakia (Backend)
3. Virang Parekh (Backend)
4. Jash Shah (Backend)
5. Pruthav Jhaveri (Frontend)
6. Jash Mehta (Frontend)
7. Rohan Mistry (Frontend)
8. Shrey Dedhia (Frontend)
9. Punit Lodha (Designer)

#### Mentors

1. Rashmil Panchani (Backend)
2. Amogh Parab (Backend)
3. Viram Shah (Frontend)
4. Priya Shah (Frontend)
5. Jay Gala (Design)

## License

> MIT License
>
> Copyright (c) 2020 Unicode
>
> Permission is hereby granted, free of charge, to any person obtaining a copy
> of this software and associated documentation files (the "Software"), to deal
> in the Software without restriction, including without limitation the rights
> to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the Software is
> furnished to do so, subject to the following conditions:
> The above copyright notice and this permission notice shall be included in all
> copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
> IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
> FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
> AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
> LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
> OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
> SOFTWARE.
