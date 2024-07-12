from django.urls import path

from myapp.views import *

urlpatterns = [
    path('MovieCRUD/',MoviesCRUD.as_view()),
    path('MoviesDataUpload/',MoviesDataUpload.as_view()),
    path('TopGrossMovies/',TopGrossMovies.as_view()),
    path('TopVotesMovies/',TopVotesMovies.as_view()),
    path('TopRatingMovies/',TopRatingMovies.as_view()),
    path('Moviesyears/',Moviesyears.as_view()),


]