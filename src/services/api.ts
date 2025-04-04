
import { toast } from "sonner";

// Mock backend delay to simulate API calls
const mockDelay = (ms: number = 800) => new Promise(resolve => setTimeout(resolve, ms));

// Types for our help requests
export interface HelpRequest {
  id: string;
  userId: string;
  type: "emergency" | "medical" | "community";
  status: "pending" | "accepted" | "completed" | "cancelled";
  description: string;
  location: {
    latitude?: number;
    longitude?: number;
    address?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  helpDetails: Record<string, any>;
}

// Mock database
let helpRequests: HelpRequest[] = [];

export const apiService = {
  // Help request APIs
  async createHelpRequest(data: Omit<HelpRequest, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<HelpRequest> {
    await mockDelay();
    
    const now = new Date();
    const newRequest: HelpRequest = {
      ...data,
      id: `request_${Date.now()}`,
      status: "pending",
      createdAt: now,
      updatedAt: now
    };
    
    helpRequests.push(newRequest);
    
    // In a real app, we'd send this to a server
    console.log("Created help request:", newRequest);
    return newRequest;
  },
  
  async getHelpRequests(userId: string): Promise<HelpRequest[]> {
    await mockDelay();
    return helpRequests.filter(req => req.userId === userId);
  },
  
  async updateHelpRequestStatus(requestId: string, status: HelpRequest['status']): Promise<HelpRequest> {
    await mockDelay();
    
    const index = helpRequests.findIndex(req => req.id === requestId);
    if (index === -1) {
      throw new Error("Request not found");
    }
    
    helpRequests[index] = {
      ...helpRequests[index],
      status,
      updatedAt: new Date()
    };
    
    return helpRequests[index];
  },
  
  // User profile APIs
  async updateUserProfile(userId: string, data: {name?: string, email?: string}): Promise<boolean> {
    await mockDelay();
    // In a real app, we'd update user data in the database
    console.log(`Updating profile for user ${userId}:`, data);
    return true;
  }
};
