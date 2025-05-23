from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import Createserializer,NoteSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Note
class CreateUserView(generics.CreateAPIView):
    queryset=User.objects.all()
    serializer_class =Createserializer
    permission_classes= [AllowAny]
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class=NoteSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.error)

class deleteNote(generics.DestroyAPIView):
    serializer_class= NoteSerializer
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        user= self.request.user
        return Note.objects.filter(author=user)
    