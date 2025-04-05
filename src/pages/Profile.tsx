
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/services/api";
import { isGeminiApiKeyValid } from "@/services/geminiAiService";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssignedHelpers } from "@/components/profile/AssignedHelpers";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, CheckCircle2, Key } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, isLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  const [apiKeyStatus, setApiKeyStatus] = useState<"checking" | "valid" | "invalid" | "none">("checking");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  React.useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        email: user.email,
      });
    }
  }, [user, form]);

  useEffect(() => {
    const checkApiKey = async () => {
      try {
        const isValid = await isGeminiApiKeyValid();
        setApiKeyStatus(isValid ? "valid" : "invalid");
      } catch (error) {
        setApiKeyStatus("invalid");
      }
    };
    
    checkApiKey();
  }, []);

  const onSubmit = async (values: ProfileFormValues) => {
    if (!user) return;
    
    setIsSaving(true);
    try {
      await apiService.updateUserProfile(user.id, values);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update profile");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading || !user) {
    return <MainLayout>
      <div className="container mx-auto px-4 py-16">
        <Card>
          <CardContent className="p-8 text-center">
            Loading profile...
          </CardContent>
        </Card>
      </div>
    </MainLayout>;
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">Personal Profile</TabsTrigger>
            <TabsTrigger value="helpers">Care Team</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold">Personal Information</CardTitle>
                    <CardDescription>
                      Update your personal information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6 p-4 bg-primary/10 rounded flex items-center space-x-4">
                      <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                      </div>
                    </div>
                    
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={isSaving}>
                          {isSaving ? "Saving..." : "Update Profile"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Key className="h-5 w-5" />
                      AI Assistant Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {apiKeyStatus === "checking" && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Checking API key...
                      </div>
                    )}
                    
                    {apiKeyStatus === "valid" && (
                      <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-900">
                        <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                        <AlertTitle>Connected</AlertTitle>
                        <AlertDescription>
                          Your Gemini AI Assistant is working properly
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {apiKeyStatus === "invalid" && (
                      <Alert className="bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-900">
                        <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        <AlertTitle>API Key Issue</AlertTitle>
                        <AlertDescription>
                          There's a problem with your Gemini API key
                          <Button variant="link" className="p-0 h-auto text-amber-600 dark:text-amber-400 font-normal" asChild>
                            <a href="/help">Fix connection</a>
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                    
                    {apiKeyStatus === "none" && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Not Connected</AlertTitle>
                        <AlertDescription>
                          Connect Gemini AI to enable the assistant
                          <Button variant="link" className="p-0 h-auto font-normal" asChild>
                            <a href="/help">Set up now</a>
                          </Button>
                        </AlertDescription>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    <Button variant="outline" className="justify-start">
                      Request Medical Assistance
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Request Emotional Support
                    </Button>
                    <Button variant="outline" className="justify-start">
                      Submit a New Help Request
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="helpers">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="md:col-span-2">
                <AssignedHelpers />
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Request New Helper</CardTitle>
                    <CardDescription>
                      Request additional assistance based on your needs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full" variant="outline">
                      Request Medical Helper
                    </Button>
                    <Button className="w-full" variant="outline">
                      Request Emotional Support
                    </Button>
                    <Button className="w-full" variant="outline">
                      Request Physical Assistance
                    </Button>
                    
                    <Separator />
                    
                    <div className="text-sm text-muted-foreground">
                      <p>Need a different type of assistance?</p>
                      <Button variant="link" className="p-0 h-auto">
                        Contact Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <h4 className="font-medium">Notification Preferences</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure how you want to receive notifications
                    </p>
                  </div>
                  <div>
                    <Button variant="outline">Manage Notifications</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <h4 className="font-medium">Privacy Settings</h4>
                    <p className="text-sm text-muted-foreground">
                      Control your data sharing preferences
                    </p>
                  </div>
                  <div>
                    <Button variant="outline">Manage Privacy</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <h4 className="font-medium">Account Security</h4>
                    <p className="text-sm text-muted-foreground">
                      Update your password and security settings
                    </p>
                  </div>
                  <div>
                    <Button variant="outline">Security Settings</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
