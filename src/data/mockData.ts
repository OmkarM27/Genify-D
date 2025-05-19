export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}


// Mock Users
export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Johnson",
    email: "alex@genify.com",
    role: "Product Manager",
    avatarUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "user-2",
    name: "Sarah Miller",
    email: "sarah@genify.com",
    role: "Content Manager",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "user-3",
    name: "David Chen",
    email: "david@genify.com",
    role: "AI Engineer",
    avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "user-4",
    name: "Maya Patel",
    email: "maya@genify.com",
    role: "Designer",
    avatarUrl: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
  },
  {
    id: "user-5",
    name: "James Wilson",
    email: "james@genify.com",
    role: "Marketing Lead",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=120&q=80",
  },
];



// Mock Brands
export const mockBrands: Brand[] = [
  { id: "brand-1", name: "EcoTech", color: "#4CAF50" },
  { id: "brand-2", name: "Luxura", color: "#9C27B0" },
  { id: "brand-3", name: "NovaTech", color: "#2196F3" },
  { id: "brand-4", name: "WellnessOne", color: "#FF9800" },
  { id: "brand-5", name: "MetroStyle", color: "#607D8B" },
];

// Generate mock projects
export const mockProjects: Project[] = [
  
  {
    id: "project-1",
    title: "Q2 Marketing Campaign",
    description: "Comprehensive marketing campaign for Q2 product launch",
    brand: mockBrands[2],
    status: "In Progress",
    progress: 65,
    tokensUsed: 2500,
    tokensLimit: 10000,
    createdAt: "2023-04-15T09:00:00Z",
    updatedAt: "2023-04-22T14:30:00Z",
    team: [mockUsers[0], mockUsers[1], mockUsers[4]],
    tasks: [
      {
        id: "task-1-1",
        title: "Define campaign goals",
        description: "Set KPIs and overall objectives for Q2 campaign",
        status: "Done",
        priority: "High",
        dueDate: "2023-04-18",
        assignees: [mockUsers[0]],
        createdAt: "2023-04-15T10:00:00Z",
        updatedAt: "2023-04-17T16:30:00Z",
        projectId: "project-1",
        comments: [
          {
            id: "comment-1-1",
            content: "I've added the social media KPIs we discussed",
            author: mockUsers[1],
            createdAt: "2023-04-16T11:20:00Z",
          }
        ]
      },
      {
        id: "task-1-2",
        title: "Create content calendar",
        description: "Plan out all content for the campaign period",
        status: "In Progress",
        priority: "Medium",
        dueDate: "2023-04-25",
        assignees: [mockUsers[1], mockUsers[4]],
        createdAt: "2023-04-17T09:15:00Z",
        updatedAt: "2023-04-21T13:45:00Z",
        projectId: "project-1",
      },
      {
        id: "task-1-3",
        title: "Design social media assets",
        description: "Create visuals for all platforms",
        status: "To Do",
        priority: "Medium",
        dueDate: "2023-04-30",
        assignees: [mockUsers[3]],
        createdAt: "2023-04-19T14:00:00Z",
        updatedAt: "2023-04-19T14:00:00Z",
        projectId: "project-1",
      },
    ],
    aiContent: [
  {
    id: 'content1',
    title: 'Email Campaign Introduction',
    type: 'Email',
    preview: "Dear valued customer, we're excited to introduce our latest...",
    author: 'Sarah Miller',
    date: 'Apr 20',
  },
  {
    id: 'content2',
    title: 'Product Launch Blog Post',
    type: 'Blog',
    preview: "# Announcing Our Revolutionary New Product...\nToday, we're thrilled to share...",
    author: 'Sarah Miller',
    date: 'Apr 21',
  }
]
,
    chat: [
      {
        id: "chat-1-1",
        content: "Can you summarize the key selling points for our new product?",
        role: "user",
        timestamp: "2023-04-18T13:30:00Z",
      },
      {
        id: "chat-1-2",
        content: "Based on your product specifications, here are the key selling points:\n\n1. Industry-leading efficiency (25% improvement)\n2. User-friendly interface with intuitive controls\n3. Seamless integration with existing systems\n4. Advanced analytics dashboard\n5. 24/7 customer support",
        role: "assistant",
        timestamp: "2023-04-18T13:31:00Z",
      },
    ],
    attachments: [
      {
        id: "attachment-1-1",
        name: "campaign-brief.pdf",
        url: "#",
        type: "application/pdf",
        size: 2458000,
        uploadedBy: mockUsers[0],
        uploadedAt: "2023-04-15T11:30:00Z",
      },
    ],
  },
  {
    id: "project-2",
    title: "Website Redesign",
    description: "Complete overhaul of the main website with new branding",
    brand: mockBrands[0],
    status: "To Do",
    progress: 10,
    tokensUsed: 500,
    tokensLimit: 8000,
    createdAt: "2023-04-10T08:00:00Z",
    updatedAt: "2023-04-12T16:45:00Z",
    team: [mockUsers[3], mockUsers[2]],
    tasks: [
      {
        id: "task-2-1",
        title: "Wireframing",
        description: "Create wireframes for all key pages",
        status: "To Do",
        priority: "High",
        dueDate: "2023-04-28",
        assignees: [mockUsers[3]],
        createdAt: "2023-04-11T09:00:00Z",
        updatedAt: "2023-04-11T09:00:00Z",
        projectId: "project-2",
      }
    ],
    aiContents: [],
    chat: [],
    attachments: [],
  },
  {
    id: "project-3",
    title: "Customer Feedback Analysis",
    description: "Analyzing customer feedback from Q1 surveys",
    brand: mockBrands[3],
    status: "Done",
    progress: 100,
    tokensUsed: 3800,
    tokensLimit: 5000,
    createdAt: "2023-03-01T10:00:00Z",
    updatedAt: "2023-04-01T15:20:00Z",
    team: [mockUsers[0], mockUsers[4]],
    tasks: [
      {
        id: "task-3-1",
        title: "Data collection",
        description: "Gather all survey responses from Q1",
        status: "Done",
        priority: "High",
        dueDate: "2023-03-15",
        assignees: [mockUsers[4]],
        createdAt: "2023-03-02T09:00:00Z",
        updatedAt: "2023-03-14T17:30:00Z",
        projectId: "project-3",
      }
    ],
    aiContents: [
      {
        id: "content-3-1",
        title: "Survey Analysis Report",
        content: "# Q1 Customer Feedback Analysis\n\nThis report summarizes the key findings...",
        type: "Blog",
        model: "GPT-4",
        createdAt: "2023-03-25T14:00:00Z",
        createdBy: mockUsers[0],
        projectId: "project-3",
      }
    ],
    chat: [],
    attachments: [],
  },
  {
    id: "project-4",
    title: "Mobile App Update",
    description: "Version 2.5 with new features and performance improvements",
    brand: mockBrands[2],
    status: "In Progress",
    progress: 45,
    tokensUsed: 1200,
    tokensLimit: 7500,
    createdAt: "2023-04-05T08:30:00Z",
    updatedAt: "2023-04-20T11:15:00Z",
    team: [mockUsers[2], mockUsers[3]],
    tasks: [],
    aiContents: [],
    chat: [],
    attachments: [],
  },
  {
    id: "project-5",
    title: "Investor Presentation",
    description: "Preparing materials for Q2 investor meeting",
    brand: mockBrands[4],
    status: "Review",
    progress: 80,
    tokensUsed: 900,
    tokensLimit: 3000,
    createdAt: "2023-04-08T10:00:00Z",
    updatedAt: "2023-04-19T16:00:00Z",
    team: [mockUsers[0], mockUsers[1]],
    tasks: [],
    aiContents: [],
    chat: [],
    attachments: [],
  },
  {
    id: "project-6",
    title: "Product Launch - XYZ Feature",
    description: "Preparing for the launch of our new XYZ feature",
    brand: mockBrands[1],
    status: "To Do",
    progress: 5,
    tokensUsed: 100,
    tokensLimit: 5000,
    createdAt: "2023-04-21T09:00:00Z",
    updatedAt: "2023-04-21T09:00:00Z",
    team: [mockUsers[0], mockUsers[4]],
    tasks: [],
    aiContents: [],
    chat: [],
    attachments: [],
  },
];


// Helper functions to get mock data
export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(project => project.id === id);
};

export const getFilteredProjects = (
  searchTerm: string = "",
  brandId: string | null = null,
  userId: string | null = null,
  status: Status | null = null
): Project[] => {
  return mockProjects.filter(project => {
    const matchesSearch = searchTerm === "" || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBrand = brandId === null || project.brand.id === brandId;
    
    const matchesUser = userId === null || 
      project.team.some(user => user.id === userId);
    
    const matchesStatus = status === null || project.status === status;
    
    return matchesSearch && matchesBrand && matchesUser && matchesStatus;
  });
};

export const getTasksByStatus = (projectId: string): Record<Status, Project["tasks"]> => {
  const project = getProjectById(projectId);
  
  if (!project) return {
    "To Do": [],
    "In Progress": [],
    "Review": [],
    "Done": []
  };
  
  return {
    "To Do": project.tasks.filter(task => task.status === "To Do"),
    "In Progress": project.tasks.filter(task => task.status === "In Progress"),
    "Review": project.tasks.filter(task => task.status === "Review"),
    "Done": project.tasks.filter(task => task.status === "Done")
  };
};

