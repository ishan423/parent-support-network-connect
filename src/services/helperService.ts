
// Types for our helpers
export interface Helper {
  id: string;
  name: string;
  role: "medical" | "emotional" | "physical";
  profileImage: string;
  rating: number;
  bio: string;
  specialties: string[];
  experience: number; // in years
  assignedTo: string[]; // array of user IDs
  contactInfo: {
    email: string;
    phone?: string;
  };
  availability: {
    status: "available" | "busy" | "offline";
    nextAvailable?: Date;
  };
}

// Mock helpers data
const MOCK_HELPERS: Helper[] = [
  {
    id: "helper_1",
    name: "Dr. Sarah Johnson",
    role: "medical",
    profileImage: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 4.9,
    bio: "Board-certified physician with over 15 years of experience in geriatric care. Specializes in managing chronic conditions and preventive care for seniors.",
    specialties: ["Geriatric Medicine", "Chronic Disease Management", "Preventive Care"],
    experience: 15,
    assignedTo: ["1"],
    contactInfo: {
      email: "sarah.johnson@example.com",
      phone: "555-123-4567"
    },
    availability: {
      status: "available"
    }
  },
  {
    id: "helper_2",
    name: "James Wilson",
    role: "emotional",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.7,
    bio: "Licensed therapist with a specialization in elder psychology and emotional support. Experienced in helping seniors navigate life transitions and emotional challenges.",
    specialties: ["Elder Psychology", "Grief Counseling", "Anxiety Management"],
    experience: 10,
    assignedTo: ["1"],
    contactInfo: {
      email: "james.wilson@example.com",
      phone: "555-987-6543"
    },
    availability: {
      status: "busy",
      nextAvailable: new Date(Date.now() + 3600000) // 1 hour from now
    }
  },
  {
    id: "helper_3",
    name: "Maria Rodriguez",
    role: "physical",
    profileImage: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.8,
    bio: "Certified physical therapist specializing in mobility assistance and rehabilitation for seniors. Focuses on improving quality of life through appropriate physical activities.",
    specialties: ["Mobility Training", "Fall Prevention", "Strength Building"],
    experience: 8,
    assignedTo: ["2"],
    contactInfo: {
      email: "maria.rodriguez@example.com",
      phone: "555-456-7890"
    },
    availability: {
      status: "offline",
      nextAvailable: new Date(Date.now() + 86400000) // 24 hours from now
    }
  }
];

// Helper service functions
export const helperService = {
  // Get helpers assigned to a specific user
  async getAssignedHelpers(userId: string): Promise<Helper[]> {
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
    return MOCK_HELPERS.filter(helper => helper.assignedTo.includes(userId));
  },

  // Get a specific helper by ID
  async getHelperById(helperId: string): Promise<Helper | undefined> {
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
    return MOCK_HELPERS.find(helper => helper.id === helperId);
  },
  
  // Request a new helper
  async requestHelper(userId: string, role: Helper["role"]): Promise<Helper> {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simulate API delay
    
    // Find an available helper with the requested role
    const availableHelper = MOCK_HELPERS.find(
      h => h.role === role && !h.assignedTo.includes(userId)
    );
    
    if (availableHelper) {
      // In a real app, we'd make an API call here
      availableHelper.assignedTo.push(userId);
      return availableHelper;
    } else {
      throw new Error(`No available ${role} helpers at the moment`);
    }
  }
};
