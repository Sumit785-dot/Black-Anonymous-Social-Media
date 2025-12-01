class AnonymizerMiddleware:
    """
    Middleware to aggressively remove IP addresses and location-identifying headers
    from the request object before it reaches any view or logger.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # List of headers that contain IP or Location info
        headers_to_scrub = [
            'REMOTE_ADDR',
            'HTTP_X_FORWARDED_FOR',
            'HTTP_CF_CONNECTING_IP', # Cloudflare IP header
            'HTTP_CF_IPCOUNTRY',     # Cloudflare Country header
            'HTTP_X_REAL_IP',
        ]

        # Remove them from request.META
        for header in headers_to_scrub:
            if header in request.META:
                del request.META[header]

        # Explicitly set a fake IP to prevent any default behavior from finding the real one
        request.META['REMOTE_ADDR'] = '0.0.0.0'

        response = self.get_response(request)
        return response
