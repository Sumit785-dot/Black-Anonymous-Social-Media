import logging

logger = logging.getLogger(__name__)

class AnonymizerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Scrub IP address from request META
        request.META['REMOTE_ADDR'] = '0.0.0.0'
        request.META['HTTP_X_FORWARDED_FOR'] = '0.0.0.0'
        return self.get_response(request)

class SimpleAnalyticsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Check for Do Not Track header
        dnt = request.headers.get('DNT')
        
        response = self.get_response(request)

        if dnt == '1':
            return response

        # Log basic info without PII
        # We don't log IP addresses or User IDs here to keep it anonymous
        log_data = {
            'path': request.path,
            'method': request.method,
            'status_code': response.status_code,
            'user_agent': request.META.get('HTTP_USER_AGENT', 'unknown')[:50] # Truncate for privacy/size
        }
        
        # In a real app, this would go to a database or analytics service
        # Here we just log it to standard output/file
        logger.info(f"ANALYTICS: {log_data}")

        return response
