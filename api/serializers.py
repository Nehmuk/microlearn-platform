from rest_framework import serializers
from django.utils import timezone
from .models import (
    Review,
    ContactMessage,
    Topic,
    Lesson,
    SavedLesson,
    UserProgress,
    UserLessonProgress,
    UserProfile,
    Notification,    # ✅ NEW
)
from django.contrib.auth.models import User


# --- USER SERIALIZER ---
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name']


# --- LEARNING SYSTEM SERIALIZERS ---

class LessonSerializer(serializers.ModelSerializer):
    time = serializers.CharField(source='time_estimate')
    category = serializers.CharField(source='topic.category', read_only=True)
    topic_title = serializers.CharField(source='topic.title', read_only=True)

    class Meta:
        model = Lesson
        fields = [
            'id', 'day', 'title', 'status', 'time',
            'content_data', 'category', 'topic_title'
        ]


class TopicSerializer(serializers.ModelSerializer):
    longDescription = serializers.CharField(source='long_description')
    isStarted = serializers.BooleanField(source='is_started')
    dateAdded = serializers.DateTimeField(source='date_added')
    curriculum = LessonSerializer(many=True, read_only=True)

    class Meta:
        model = Topic
        fields = [
            'id', 'category', 'title', 'icon', 'description',
            'longDescription', 'subtopics', 'curriculum', 'isStarted', 'dateAdded'
        ]


# --- SAVED LESSONS ---
class SavedLessonSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer(read_only=True)

    class Meta:
        model = SavedLesson
        fields = ['id', 'lesson', 'saved_at']


# --- USER LESSON PROGRESS ---
class UserLessonProgressSerializer(serializers.ModelSerializer):
    lesson = LessonSerializer(read_only=True)

    class Meta:
        model = UserLessonProgress
        fields = ['id', 'lesson', 'is_completed', 'completed_at']


# --- USER STATS ---
class UserProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProgress
        fields = ['streak', 'total_points', 'lessons_completed', 'last_activity']


# --- USER PROFILE ---
class UserProfileSerializer(serializers.ModelSerializer):
    name  = serializers.CharField(source='user.first_name', read_only=True)
    email = serializers.EmailField(source='user.email',     read_only=True)

    class Meta:
        model = UserProfile
        fields = ['name', 'email', 'bio', 'location', 'occupation', 'nickname', 'gender', 'age']


# ✅ NEW: NOTIFICATION SERIALIZER
# Adds a computed `time_ago` string so the frontend doesn't need to do date maths.
class NotificationSerializer(serializers.ModelSerializer):
    time_ago = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ['id', 'title', 'message', 'is_read', 'notif_type', 'created_at', 'time_ago']

    def get_time_ago(self, obj):
        """
        Returns a human-readable relative time string:
        "just now", "5m ago", "2h ago", "3d ago"
        """
        diff = timezone.now() - obj.created_at
        seconds = int(diff.total_seconds())

        if seconds < 60:
            return "just now"
        if seconds < 3600:
            mins = seconds // 60
            return f"{mins}m ago"
        if seconds < 86400:
            hours = seconds // 3600
            return f"{hours}h ago"
        days = seconds // 86400
        if days == 1:
            return "yesterday"
        if days < 30:
            return f"{days}d ago"
        return obj.created_at.strftime("%b %d")


# --- FEEDBACK & CONTACT ---

class ReviewSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.first_name')

    class Meta:
        model = Review
        fields = ['id', 'user', 'user_name', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
