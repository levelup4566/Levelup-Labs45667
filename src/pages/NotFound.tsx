
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

/**
 * NotFound Component - Displayed when users navigate to non-existent routes
 * 
 * Features:
 * - Error logging for route access attempts
 * - User-friendly 404 message
 * - Navigation options back to safety
 */
const NotFound = () => {
  const location = useLocation();

  // Log navigation attempts to non-existent routes for monitoring
  useEffect(() => {
    try {
      console.error(
        "404 Error: User attempted to access non-existent route:",
        location.pathname
      );
      
      // Optional: Could integrate with an error tracking service here
      // errorTrackingService.captureEvent({
      //   type: '404_error',
      //   path: location.pathname,
      //   timestamp: new Date().toISOString()
      // });
    } catch (error) {
      // Ensure error logging itself doesn't break
      console.error("Failed to log 404 error:", error);
    }
  }, [location.pathname]);

  // Handle user return to previous page
  const handleBack = () => {
    try {
      window.history.back();
    } catch (error) {
      // Fallback to home if history navigation fails
      console.error("Failed to navigate back:", error);
      window.location.href = "/";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-6 py-8">
        <Alert variant="destructive" className="mb-6">
          <AlertTitle className="text-2xl font-bold mb-2">404 - Page Not Found</AlertTitle>
          <AlertDescription>
            The page you're looking for doesn't exist or has been moved.
          </AlertDescription>
        </Alert>
        
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you were trying to access.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button 
              onClick={handleBack} 
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Button>
            
            <Button 
              onClick={() => window.location.href = "/"} 
              variant="default"
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
