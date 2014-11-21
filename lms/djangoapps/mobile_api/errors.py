"""
List of errors that can be returned by the mobile api
"""


def format_error(error_code, message):
    """
    Converts an error_code and message into a response body
    """
    return {"errors": {"id": error_code, "message": message}}

ERROR_INVALID_MODULE_ID = format_error(-1, "Could not find module for module_id")
ERROR_INVALID_COURSE_ID = format_error(-2, "Could not find course for course_id")
ERROR_INVALID_MODIFICATION_DATE = format_error(-3, "Could not parse modification_date")
