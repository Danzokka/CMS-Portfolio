'use server'

export const getProjects = async () => {  {
  try {
    // Simulate fetching projects from an API or database
    const projects = [
      {
        id: '1',
        name: "Project Alpha",
        description: "A web application for managing tasks",
        icon: "https://example.com/icons/project-alpha.png",
        category: "Web Development",
        level: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: "Project Beta",
        description: "A mobile app for tracking fitness activities",
        icon: "https://example.com/icons/project-beta.png",
        category: "Mobile Development",
        level: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}
