from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from django.views.generic import FormView, TemplateView
from django.contrib import messages
from django.urls import reverse_lazy
from .models import ContactMessage

class ContactFormView(FormView):
    template_name = 'contact/contact_form.html'
    success_url = reverse_lazy('contact:contact_success')
    
    def post(self, request, *args, **kwargs):
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        ContactMessage.objects.create(
            name=name,
            email=email,
            subject=subject,
            message=message
        )
        
        messages.success(request, 'Your message has been sent successfully!')
        return redirect(self.success_url)

class ContactSuccessView(TemplateView):
    template_name = 'contact/contact_success.html'