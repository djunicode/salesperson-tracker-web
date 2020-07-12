from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

# -----changed setting for serving media files-----

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("salespersonTrackerREST.urls")),
    path("api-auth/", include("rest_framework.urls")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
