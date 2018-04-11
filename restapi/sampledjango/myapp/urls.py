# myapp/urls.py
from django.conf.urls import url
from myapp import views

urlpatterns = [
    url(r'^$', views.HomePageView.as_view()),
    url(r'^index/$', views.HomePageView.as_view()),
    url(r'^create/$', views.CreateContactView.as_view(), name='create'),
    url(r'^update/(?P<pk>[0-9]+)/$', views.UpdateContactView.as_view(), name='update'),
    url(r'^delete/(?P<pk>[0-9]+)/$', views.DeleteContactView.as_view(), name='delete'),
]
