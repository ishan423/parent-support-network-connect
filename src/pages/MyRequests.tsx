
import React, { useEffect, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/contexts/AuthContext";
import { apiService, HelpRequest } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MyRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<HelpRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRequests = async () => {
      if (!user) return;
      
      try {
        const userRequests = await apiService.getHelpRequests(user.id);
        setRequests(userRequests);
      } catch (error) {
        console.error("Failed to load requests:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadRequests();
  }, [user]);

  const handleCancelRequest = async (requestId: string) => {
    try {
      await apiService.updateHelpRequestStatus(requestId, "cancelled");
      setRequests(prev => prev.map(req => 
        req.id === requestId ? { ...req, status: "cancelled" } : req
      ));
    } catch (error) {
      console.error("Failed to cancel request:", error);
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">My Requests</h1>
            <Card>
              <CardContent className="p-8 text-center">
                Loading your requests...
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  const getStatusColor = (status: HelpRequest['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500 text-white';
      case 'accepted': return 'bg-green-500 text-white';
      case 'completed': return 'bg-blue-500 text-white';
      case 'cancelled': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">My Requests</h1>
          <p className="text-muted-foreground mb-8">
            Track and manage your help requests
          </p>
          
          {requests.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">You haven't made any help requests yet.</p>
                <Button className="mt-4" onClick={() => window.location.href = "/request-help"}>
                  Request Help
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {requests.map(request => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className={`${getTypeColor(request.type)} text-white`}>
                    <CardTitle className="flex justify-between items-center">
                      <span>{getTypeLabel(request.type)} Request</span>
                      <Badge className={getStatusColor(request.status)}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium">Description</p>
                        <p className="text-muted-foreground">{request.description}</p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-muted-foreground">
                          {request.location.address || "Location shared via GPS"}
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-medium">Created</p>
                        <p className="text-muted-foreground">
                          {new Date(request.createdAt).toLocaleString()}
                        </p>
                      </div>
                      
                      {request.status === 'pending' && (
                        <Button 
                          variant="outline" 
                          className="w-full border-red-500 text-red-500 hover:bg-red-50"
                          onClick={() => handleCancelRequest(request.id)}
                        >
                          Cancel Request
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

// Helper functions
const getTypeColor = (type: HelpRequest['type']) => {
  switch (type) {
    case 'emergency': return 'bg-rose-500';
    case 'medical': return 'bg-blue-500';
    case 'community': return 'bg-green-500';
    default: return 'bg-gray-500';
  }
};

const getTypeLabel = (type: HelpRequest['type']) => {
  switch (type) {
    case 'emergency': return 'Emergency';
    case 'medical': return 'Medical';
    case 'community': return 'Community';
    default: return 'Help';
  }
};

export default MyRequests;
