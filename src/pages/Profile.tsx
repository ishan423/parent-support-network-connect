
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { apiService } from "@/services/api";
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

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user, isLoading } = useAuth();
  const [isSaving, setIsSaving] = React.useState(false);

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
      <div className="container max-w-xl mx-auto px-4 py-16">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Your Profile</CardTitle>
            <CardDescription>
              View and edit your profile information
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
    </MainLayout>
  );
};

export default Profile;
