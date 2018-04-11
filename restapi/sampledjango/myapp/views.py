from django.shortcuts import render, render_to_response
from django.http import HttpResponse, HttpResponseRedirect
from django.views.generic import TemplateView, CreateView, DeleteView, UpdateView
from django.template import RequestContext
from myapp.models import Contacts
from django.contrib import messages
from rest_framework import viewsets
from myapp.serializers import ContactSerializer

# # Create your views here.
# class HomePageView(TemplateView):
	
# 	def get(self, request, **kwargs):
# 		contact = Contacts.objects.all()
# 		if contact:
# 			return render(request, 'index.html', {'contact':contact})
# 		return HttpResponse("ID:1 is not found...")


# class CreateContactView(CreateView):

# 	model = Contacts
# 	template_name = 'createForm.html'
# 	fields = '__all__'

# 	def post(self , request , **kwargs):

# 		con = Contacts()
# 		con.name = request.POST.get('name',None)
# 		con.email = request.POST.get('email', None)
# 		if con.name and con.email:
# 			con.save()
# 			# messages.success(request, 'Contact added successfully!' ,extra_tags='alert')
# 			# return render_to_response('createForm.html', message = 'Contact added successfully!')
# 			# messages.add_message(request, messages.INFO, 'Contact added successfully!')
# 			return HttpResponseRedirect("/index")
# 			# return HttpResponse(messages.success)

# 		return HttpResponse("give valid data")


# class DeleteContactView(DeleteView):
	
# 	model = Contacts
# 	template_name = 'index.html'
# 	fields = '__all__'

# 	def post(self , request , pk):  
		
# 		contact = Contacts.objects.get(id=pk)
# 		if contact:
# 			print contact.id, contact.name
# 			contact.delete()
# 			return HttpResponseRedirect("/index")
# 		return HttpResponse("field is not found...")

# class UpdateContactView(UpdateView):

# 	model = Contacts
# 	template_name = 'index.html'
# 	fields = '__all__'

# 	def post(self, request, pk):
		
# 		contact = Contacts.objects.get(id=pk)

# 		if request.POST:
# 			name = request.POST.get('name', None)
# 			email = request.POST.get('email', None)
# 			if contact.name != name or contact.email != email:
# 				contact.name, contact.email = name, email
# 				contact.save()
# 				return HttpResponseRedirect("/index")
# 			else:
# 				return HttpResponse("same data as in database,please give valid data..")
# 		else:
# 			detail = {'id':contact.id ,'name': contact.name, 'email': contact.email}
# 			return render(request, 'createForm.html', {'detail': detail})






class ContactViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Contacts.objects.all()
    serializer_class = ContactSerializer



