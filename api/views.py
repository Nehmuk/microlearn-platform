from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from django.utils.timezone import now

from .models import (
    Review,
    ContactMessage,
    Topic,
    Lesson,
    SavedLesson,
    UserProgress,
    UserLessonProgress,
    UserProfile,
    Notification,       # ✅ NEW
)

from .serializers import (
    ReviewSerializer,
    ContactSerializer,
    TopicSerializer,
    SavedLessonSerializer,
    UserProgressSerializer,
    UserLessonProgressSerializer,
    UserProfileSerializer,
    NotificationSerializer,  # ✅ NEW
)


# ─────────────────────────────────────────────────────────────────────────────
# HELPER: create a notification for a user in one line.
# Called internally by complete_lesson and signup_view.
# ─────────────────────────────────────────────────────────────────────────────
def _create_notification(user, title, message, notif_type='info'):
    Notification.objects.create(
        user=user,
        title=title,
        message=message,
        notif_type=notif_type,
    )


# --- LEARNING CONTENT VIEWS ---

class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Topic.objects.all().prefetch_related('curriculum').order_by('date_added')
    serializer_class = TopicSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context


# --- SAVED LESSONS SYSTEM ---

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_saved_lessons(request):
    saved_items = SavedLesson.objects.filter(
        user=request.user
    ).select_related('lesson', 'lesson__topic')
    serializer = SavedLessonSerializer(saved_items, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggle_save_lesson(request):
    lesson_id = request.data.get('lessonId')
    if not lesson_id:
        return Response({"error": "lessonId is required"}, status=status.HTTP_400_BAD_REQUEST)

    lesson = get_object_or_404(Lesson, id=lesson_id)
    saved_entry = SavedLesson.objects.filter(user=request.user, lesson=lesson)

    if saved_entry.exists():
        saved_entry.delete()
        return Response({"isSaved": False, "message": "Removed from saved"})
    else:
        SavedLesson.objects.create(user=request.user, lesson=lesson)
        return Response({"isSaved": True, "message": "Saved successfully"})


# --- USER STATS API ---

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_stats(request):
    progress, _ = UserProgress.objects.get_or_create(user=request.user)
    return Response({
        "streak": progress.streak or 0,
        "lessons_done": progress.lessons_completed or 0,
        "points": progress.total_points or 0,
        "last_activity": progress.last_activity
    })


# --- COMPLETE LESSON ---
# ✅ UPDATED: now fires notifications after lesson completion and streak milestones

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def complete_lesson(request):
    lesson_id = request.data.get('lessonId')
    if not lesson_id:
        return Response({"error": "lessonId required"}, status=status.HTTP_400_BAD_REQUEST)

    lesson = get_object_or_404(Lesson, id=lesson_id)
    progress, _ = UserProgress.objects.get_or_create(user=request.user)

    lesson_progress, created = UserLessonProgress.objects.get_or_create(
        user=request.user,
        lesson=lesson
    )

    if lesson_progress.is_completed:
        return Response({
            "message": "Already completed",
            "streak": progress.streak,
            "points": progress.total_points,
            "lessons_done": progress.lessons_completed
        })

    lesson_progress.is_completed = True
    lesson_progress.completed_at = now()
    lesson_progress.save()

    quiz_score = request.data.get('score', 10)
    try:
        quiz_score = max(0, min(int(quiz_score), 100))
    except (TypeError, ValueError):
        quiz_score = 10

    progress.lessons_completed += 1
    progress.total_points += quiz_score

    today = now().date()
    if progress.last_activity:
        diff = (today - progress.last_activity).days
        if diff == 1:
            progress.streak += 1
        elif diff > 1:
            progress.streak = 1
    else:
        progress.streak = 1

    progress.last_activity = today
    progress.save()

    # ✅ NOTIFICATION: lesson completed (always fires on first completion)
    _create_notification(
        user=request.user,
        title="Lesson Complete! 🎉",
        message=f"You finished \"{lesson.title}\" and earned {quiz_score} points.",
        notif_type='lesson_complete',
    )

    # ✅ NOTIFICATION: streak milestones (3, 7, 14, 30 days)
    STREAK_MILESTONES = {
        3:  ("3-Day Streak! 🔥", "You've studied 3 days in a row. Keep it going!"),
        7:  ("Week Warrior! 🔥🔥", "7 days straight — you're building a real habit."),
        14: ("Two-Week Streak! 💪", "14 days! You're unstoppable."),
        30: ("30-Day Legend! 🏆", "A whole month of daily learning. Incredible."),
    }
    if progress.streak in STREAK_MILESTONES:
        title, message = STREAK_MILESTONES[progress.streak]
        _create_notification(
            user=request.user,
            title=title,
            message=message,
            notif_type='streak',
        )

    return Response({
        "message": "Lesson completed",
        "streak": progress.streak,
        "points": progress.total_points,
        "lessons_done": progress.lessons_completed
    })


# --- LESSON PROGRESS FETCH ---

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_lesson_progress(request):
    progress = UserLessonProgress.objects.filter(
        user=request.user
    ).select_related('lesson', 'lesson__topic')
    serializer = UserLessonProgressSerializer(progress, many=True)
    return Response(serializer.data)


# --- PROFILE ---

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    profile, _ = UserProfile.objects.get_or_create(user=request.user)

    name = request.data.get('name')
    if name is not None:
        request.user.first_name = name.strip()
        request.user.save(update_fields=['first_name'])

    updatable_fields = ['bio', 'location', 'occupation', 'nickname', 'gender', 'age']
    for field in updatable_fields:
        value = request.data.get(field)
        if value is not None:
            setattr(profile, field, value)

    profile.save()
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)


# ─────────────────────────────────────────────────────────────────────────────
# ✅ NEW: NOTIFICATION ENDPOINTS
# ─────────────────────────────────────────────────────────────────────────────

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notifications(request):
    """
    Returns the 20 most recent notifications for the logged-in user.
    Also returns unread_count as a convenience field so the frontend
    can update the badge without counting client-side.
    """
    notifications = Notification.objects.filter(
        user=request.user
    ).order_by('-created_at')[:20]

    unread_count = Notification.objects.filter(
        user=request.user, is_read=False
    ).count()

    serializer = NotificationSerializer(notifications, many=True)
    return Response({
        "notifications": serializer.data,
        "unread_count": unread_count,
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_notification_read(request):
    """
    Marks a single notification as read.
    Body: { "id": <notification_id> }
    Only the owning user can mark their own notifications.
    """
    notif_id = request.data.get('id')
    if not notif_id:
        return Response({"error": "id is required"}, status=status.HTTP_400_BAD_REQUEST)

    notification = get_object_or_404(Notification, id=notif_id, user=request.user)
    notification.is_read = True
    notification.save(update_fields=['is_read'])

    return Response({"success": True, "id": notif_id})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_all_notifications_read(request):
    """
    Marks ALL unread notifications for the logged-in user as read.
    Uses bulk update for efficiency.
    """
    updated = Notification.objects.filter(
        user=request.user, is_read=False
    ).update(is_read=True)

    return Response({"success": True, "marked_read": updated})


# --- AUTH ---

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)

    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "name": user.first_name or user.username,
            "email": user.email
        })

    return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def signup_view(request):
    email    = request.data.get('email')
    password = request.data.get('password')
    name     = request.data.get('name')

    if not email or not password:
        return Response(
            {"error": "Email and password are required"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=email).exists():
        return Response({"error": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=email, email=email, password=password, first_name=name
    )
    token, _ = Token.objects.get_or_create(user=user)

    # ✅ Welcome notification for new users
    _create_notification(
        user=user,
        title="Welcome to MicroLearn! 👋",
        message="Start your first lesson and build your streak. You've got this!",
        notif_type='welcome',
    )

    return Response({
        "token": token.key,
        "name": user.first_name,
        "email": user.email
    }, status=status.HTTP_201_CREATED)


# --- REVIEWS ---

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def review_list(request):
    if request.method == 'GET':
        reviews = Review.objects.all().order_by('-created_at')
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)

    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --- CONTACT ---

@api_view(['POST'])
@permission_classes([AllowAny])
def contact_view(request):
    serializer = ContactSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "We have received your message and will get back to you soon!"},
            status=status.HTTP_201_CREATED
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
