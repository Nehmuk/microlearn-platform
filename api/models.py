from django.db import models
from django.contrib.auth.models import User

# --- LEARNING SYSTEM MODELS ---

class Topic(models.Model):
    CATEGORY_CHOICES = [
        ('Technology', 'Technology'),
        ('Psychology', 'Psychology'),
        ('Finance', 'Finance'),
        ('Design', 'Design'),
    ]

    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    icon = models.CharField(max_length=50)
    description = models.TextField()
    long_description = models.TextField()
    subtopics = models.JSONField(default=list)
    is_started = models.BooleanField(default=False)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.category}: {self.title}"


class Lesson(models.Model):
    STATUS_CHOICES = [
        ('locked', 'Locked'),
        ('in-progress', 'In Progress'),
        ('completed', 'Completed'),
    ]

    topic = models.ForeignKey(Topic, related_name='curriculum', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    day = models.IntegerField()
    time_estimate = models.CharField(max_length=20, default="3 min")
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='locked')
    content_data = models.JSONField(null=True, blank=True)

    class Meta:
        ordering = ['day']

    def __str__(self):
        return f"{self.topic.title} - Day {self.day}: {self.title}"


# --- USER LESSON PROGRESS ---
class UserLessonProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="lesson_progress")
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)
    is_completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        unique_together = ('user', 'lesson')

    def __str__(self):
        return f"{self.user.username} - {self.lesson.title} - {'Done' if self.is_completed else 'Pending'}"


# --- USER STATS ---
class UserProgress(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="progress")
    streak = models.IntegerField(default=0)
    total_points = models.IntegerField(default=0)
    lessons_completed = models.IntegerField(default=0)
    last_activity = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} Progress"


# --- USER PROFILE ---
class UserProfile(models.Model):
    GENDER_CHOICES = [
        ('Male', 'Male'),
        ('Female', 'Female'),
        ('Non-binary', 'Non-binary'),
        ('Prefer not to say', 'Prefer not to say'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    bio = models.TextField(blank=True, default="Digital Designer & Learner")
    location = models.CharField(max_length=100, blank=True, default="Not set")
    occupation = models.CharField(max_length=100, blank=True, default="Developer")
    nickname = models.CharField(max_length=50, blank=True, default="")
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default='Prefer not to say')
    age = models.CharField(max_length=5, blank=True, default="")

    def __str__(self):
        return f"{self.user.username}'s Profile"


# --- SAVED LESSONS ---
class SavedLesson(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="saved_lessons")
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name="saved_by_users")
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'lesson')
        ordering = ['-saved_at']

    def __str__(self):
        return f"{self.user.username} saved {self.lesson.title}"


# ✅ NEW: NOTIFICATION MODEL
class Notification(models.Model):
    # Type controls which icon/colour the frontend shows
    TYPE_CHOICES = [
        ('lesson_complete', 'Lesson Complete'),
        ('streak',          'Streak Milestone'),
        ('welcome',         'Welcome'),
        ('info',            'Info'),
    ]

    user       = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notifications")
    title      = models.CharField(max_length=200)
    message    = models.TextField()
    is_read    = models.BooleanField(default=False)
    notif_type = models.CharField(max_length=30, choices=TYPE_CHOICES, default='info')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']  # newest first

    def __str__(self):
        status = "read" if self.is_read else "unread"
        return f"[{self.notif_type}] {self.user.username}: {self.title} ({status})"


# --- USER FEEDBACK MODELS ---

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    topic = models.CharField(max_length=100, default="General")
    rating = models.IntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.rating} Stars"


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"
