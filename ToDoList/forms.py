from django import forms

class ToDoForm(forms.Form):
	Task=forms.CharField(max_length=100,widget=forms.TextInput(
		attrs={'class':'form-control input-lg mb-3','placeholder':'What do you need to do today?','id':'Item_input'}
	))