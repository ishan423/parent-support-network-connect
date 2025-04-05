
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { helperService, Helper } from "@/services/helperService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock, Mail, Phone, Star, User, Award } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const HelperAvailabilityBadge = ({ status }: { status: Helper["availability"]["status"] }) => {
  const variants = {
    available: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
    busy: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
    offline: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
  };
  
  return (
    <Badge className={variants[status]} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const HelperCard = ({ helper }: { helper: Helper }) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex items-center p-4 gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/10">
            <AvatarImage src={helper.profileImage} alt={helper.name} />
            <AvatarFallback>{helper.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-medium">{helper.name}</h3>
                <p className="text-sm text-muted-foreground capitalize">{helper.role} Specialist</p>
              </div>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="fill-amber-500 h-4 w-4" />
                <span className="text-sm font-medium">{helper.rating}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <HelperAvailabilityBadge status={helper.availability.status} />
              {helper.availability.status !== "available" && helper.availability.nextAvailable && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" /> 
                  Available {new Date(helper.availability.nextAvailable).toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full rounded-none border-t h-10">
              View Full Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Helper Profile</DialogTitle>
              <DialogDescription>
                Detailed information about your assigned helper
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-primary/10">
                  <AvatarImage src={helper.profileImage} alt={helper.name} />
                  <AvatarFallback>{helper.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-medium">{helper.name}</h3>
                  <p className="text-muted-foreground capitalize">{helper.role} Specialist</p>
                  <div className="flex items-center gap-1 text-amber-500 mt-1">
                    <Star className="fill-amber-500 h-4 w-4" />
                    <span className="font-medium">{helper.rating}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                  <User className="h-4 w-4" /> Bio
                </h4>
                <p className="text-sm">{helper.bio}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Award className="h-4 w-4" /> Experience & Specialties
                </h4>
                <p className="text-sm">{helper.experience} years of experience</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {helper.specialties.map((specialty, i) => (
                    <Badge key={i} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Contact Information</h4>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{helper.contactInfo.email}</span>
                  </div>
                  {helper.contactInfo.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{helper.contactInfo.phone}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Availability</h4>
                <div className="flex items-center gap-2">
                  <HelperAvailabilityBadge status={helper.availability.status} />
                  {helper.availability.status !== "available" && helper.availability.nextAvailable && (
                    <span className="text-xs text-muted-foreground">
                      Available {new Date(helper.availability.nextAvailable).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export const AssignedHelpers = () => {
  const { user } = useAuth();
  const [helpers, setHelpers] = useState<Helper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHelpers = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const assignedHelpers = await helperService.getAssignedHelpers(user.id);
        setHelpers(assignedHelpers);
      } catch (err) {
        console.error("Error fetching helpers:", err);
        setError("Failed to load your assigned helpers");
      } finally {
        setLoading(false);
      }
    };
    
    fetchHelpers();
  }, [user]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Assigned Helpers</CardTitle>
          <CardDescription>Loading your care team...</CardDescription>
        </CardHeader>
        <CardContent>
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center space-x-4 mb-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Assigned Helpers</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
          <Button variant="outline" className="mt-2" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Assigned Helpers</CardTitle>
        <CardDescription>
          These care providers are assigned to assist you
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {helpers.length > 0 ? (
          helpers.map(helper => (
            <HelperCard key={helper.id} helper={helper} />
          ))
        ) : (
          <div className="text-center py-6">
            <p>You don't have any assigned helpers yet.</p>
            <Button className="mt-2">Request Assistance</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
