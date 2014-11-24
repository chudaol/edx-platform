"""
Views related to EdxNotes.
"""
import json
from django.contrib.auth.decorators import login_required
from django.core.urlresolvers import reverse
from django.http import HttpResponse, Http404
from django.conf import settings
from edxmako.shortcuts import render_to_response
from opaque_keys.edx.locations import SlashSeparatedCourseKey
from courseware.courses import get_course_with_access
from edxnotes.helpers import (
    get_token,
    get_notes,
    is_feature_enabled,
    search
)


@login_required
def edxnotes(request, course_id):
    """
    Displays the EdxNotes page.
    """
    course_key = SlashSeparatedCourseKey.from_deprecated_string(course_id)
    course = get_course_with_access(request.user, "load", course_key)

    if not is_feature_enabled(course):
        raise Http404

    notes = get_notes(request.user, course)
    context = {
        # Use camelCase to name keys.
        "course": course,
        "search_endpoint": reverse("search_notes", kwargs={"course_id": course_id}),
        "notes": notes,
        "token": get_token(request.user),
        "debug": json.dumps(settings.DEBUG),
    }

    return render_to_response("edxnotes/edxnotes.html", context)


@login_required
def search_notes(request, course_id):
    """
    Handles search requests.
    """
    course_key = SlashSeparatedCourseKey.from_deprecated_string(course_id)
    course = get_course_with_access(request.user, "load", course_key)

    if not is_feature_enabled(course):
        raise Http404

    if not "text" in request.GET:
        raise Http404

    query_string = request.GET["text"]
    return HttpResponse(search(request.user, course, query_string))
