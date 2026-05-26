from django.contrib import admin
from .models import Review, ContactMessage, Topic, Lesson, SavedLesson, UserProfile, Notification


class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 4
    fields = ['day', 'title', 'time_estimate', 'status', 'content_data']


@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'date_added')
    list_filter = ('category',)
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    fields = (
        'title', 'slug', 'category', 'icon',
        'description', 'long_description', 'subtopics', 'is_started'
    )
    inlines = [LessonInline]


@admin.register(SavedLesson)
class SavedLessonAdmin(admin.ModelAdmin):
    list_display = ('user', 'lesson', 'saved_at')
    list_filter = ('user', 'lesson')
    search_fields = ('user__username', 'lesson__title')


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'topic', 'rating', 'created_at')
    list_filter = ('rating', 'topic')


@admin.register(ContactMessage)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'email', 'created_at')
    readonly_fields = ('created_at',)


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'occupation', 'location', 'gender')
    search_fields = ('user__username', 'user__email')


# ✅ NEW
@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display  = ('user', 'title', 'notif_type', 'is_read', 'created_at')
    list_filter   = ('notif_type', 'is_read')
    search_fields = ('user__username', 'title', 'message')
    readonly_fields = ('created_at',)
    # Allow admins to manually create notifications for testing
    fields = ('user', 'title', 'message', 'notif_type', 'is_read', 'created_at')
