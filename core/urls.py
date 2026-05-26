"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
"""
URL configuration for the MicroLearn project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from api.views import (
    login_view,
    signup_view,
    review_list,
    contact_view,
    TopicViewSet,

    # Saved lessons
    get_saved_lessons,
    toggle_save_lesson,

    # Dashboard
    get_user_stats,
    complete_lesson,
    get_lesson_progress,

    # Profile
    get_profile,
    update_profile,

    # ✅ Notifications
    get_notifications,
    mark_notification_read,
    mark_all_notifications_read,
)

router = DefaultRouter()
router.register('topics', TopicViewSet, basename='topic')

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include([
        path('', include(router.urls)),

        path('login/',   login_view),
        path('signup/',  signup_view),
        path('reviews/', review_list),
        path('contact/', contact_view),

        path('saved-lessons/',       get_saved_lessons),
        path('lessons/toggle-save/', toggle_save_lesson),

        # Dashboard
        path('user-stats/',      get_user_stats),
        path('complete-lesson/', complete_lesson),
        path('lesson-progress/', get_lesson_progress),

        # Profile
        path('profile/',        get_profile),
        path('profile/update/', update_profile),

        # ✅ Notifications
        path('notifications/',                get_notifications),
        path('notifications/mark-read/',      mark_notification_read),
        path('notifications/mark-all-read/',  mark_all_notifications_read),
    ])),
]

