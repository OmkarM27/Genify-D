import { useState, useEffect } from "react";
import { Download as DownloadIcon } from "lucide-react";

import axios from "axios";

import Tabs from "../../components/ui/Tabs";
import Card, { CardContent } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import {
  Newspaper,
  Search,
  Mail,
  MessageSquare,
  Wand2,
  Send,
  SaveIcon,
  RotateCcw,
  Copy,
} from "lucide-react";

const AiWriter = () => {
  const [keywords, setKeywords] = useState("");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState("medium");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [history, setHistory] = useState([]);
  const user = { email: "omkar@example.com" }; // Temporary hardcoded



  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects");
        setProjects(res.data.projects); // Assumes your API sends back a `projects` array
      } catch (err) {
        console.error("Failed to load projects", err);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
  const fetchHistory = async () => {
    try {
      const res = await axios.get("/api/history", {
        params: { email: user?.email || "omkar@example.com" },
      });
      setHistory(res.data);
    } catch (error) {
      console.error("Failed to load history", error);
    }
  };

  fetchHistory();
}, []);

  

  const generateContent = async () => {
    if (!title) {
      showToast("Please enter a title", "error");
      return;
    }

    if (!selectedProject && !newProjectName) {
      showToast("Please select or create a project", "error");
      return;
    }

    setIsGenerating(true);

    try {
      const response = await axios.post("/api/generate/blog", {
        title,
        keywords,
        tone,
        length,
        project_id: selectedProject !== "__new__" ? selectedProject : null,
        new_project_name: selectedProject === "__new__" ? newProjectName : null,
      });

      setGeneratedContent(response.data.content);
      showToast("Content generated successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast("Failed to generate content", "error");
    } finally {
      setIsGenerating(false);
    }
  };

  // Clear form fields
  const handleReset = () => {
    setTitle("");
    setKeywords("");
    setTone("professional");
    setLength("medium");
    setGeneratedContent("");
  };

  // Copy content to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    showToast("Content copied to clipboard", "success");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${title || "genify-draft"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast("Downloaded as text file", "success");
  };

  // Save content
  const handleSave = () => {
    const newDraft = {
      id: Date.now(),
      title,
      content: generatedContent,
      createdAt: new Date().toISOString(),
    };
    setSavedDrafts([...savedDrafts, newDraft]);
    
    showToast("Content saved to drafts!", "success");
    
  };
  

  const [savedDrafts, setSavedDrafts] = useState([]);
  const [newProjectName, setNewProjectName] = useState("");
  

  const tabContent = {
    blog: (
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Project
          </label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          >
            <option value="">-- Choose Project --</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
            <option value="__new__">+ Create New Project</option>
          </select>
        </div>

        {selectedProject === "__new__" && (
          <div className="mt-2">
            <Input
              label="New Project Name"
              placeholder="Enter project name"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
            />
          </div>
        )}

        <Input
          label="Blog Post Title"
          placeholder="Enter your blog post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          label="Keywords (optional)"
          placeholder="Enter keywords separated by commas"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          helpText="These keywords will be included in your generated content"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="humorous">Humorous</option>
              <option value="formal">Formal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Length
            </label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400"
            >
              <option value="short">Short (~300 words)</option>
              <option value="medium">Medium (~600 words)</option>
              <option value="long">Long (~1200 words)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleReset}
            leftIcon={<RotateCcw size={16} />}
          >
            Reset
          </Button>

          <Button
            variant="primary"
            onClick={generateContent}
            isLoading={isGenerating}
            leftIcon={<Wand2 size={16} />}
          >
            Generate Content
          </Button>
        </div>
      </div>
    ),

    seo: (
      <div className="space-y-6">
        <Input
          label="Target Keyword"
          placeholder="Enter your primary keyword"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          label="Secondary Keywords"
          placeholder="Enter secondary keywords separated by commas"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Content Type
            </label>
            <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400">
              <option value="article">Article</option>
              <option value="product">Product Description</option>
              <option value="landing">Landing Page</option>
              <option value="meta">Meta Description</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Length
            </label>
            <select
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400"
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleReset}
            leftIcon={<RotateCcw size={16} />}
          >
            Reset
          </Button>

          <Button
            variant="primary"
            onClick={generateContent}
            isLoading={isGenerating}
            leftIcon={<Wand2 size={16} />}
          >
            Generate SEO Content
          </Button>
        </div>
      </div>
    ),

    email: (
      <div className="space-y-6">
        <Input
          label="Email Subject"
          placeholder="Enter your email subject"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email Purpose
          </label>
          <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400">
            <option value="newsletter">Newsletter</option>
            <option value="sales">Sales Outreach</option>
            <option value="welcome">Welcome Email</option>
            <option value="followup">Follow-up</option>
            <option value="confirmation">Order Confirmation</option>
          </select>
        </div>

        <Input
          label="Key Points"
          placeholder="Enter key points to include"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Tone
            </label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400"
            >
              <option value="professional">Professional</option>
              <option value="casual">Casual</option>
              <option value="friendly">Friendly</option>
              <option value="urgent">Urgent</option>
              <option value="formal">Formal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Call to Action
            </label>
            <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400">
              <option value="reply">Reply to Email</option>
              <option value="visit">Visit Website</option>
              <option value="purchase">Make a Purchase</option>
              <option value="schedule">Schedule a Call</option>
              <option value="signup">Sign Up</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleReset}
            leftIcon={<RotateCcw size={16} />}
          >
            Reset
          </Button>

          <Button
            variant="primary"
            onClick={generateContent}
            isLoading={isGenerating}
            leftIcon={<Wand2 size={16} />}
          >
            Generate Email
          </Button>
        </div>
      </div>
    ),

    outreach: (
      <div className="space-y-6">
        <Input
          label="Recipient Name/Company"
          placeholder="Enter recipient name or company"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Outreach Type
          </label>
          <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400">
            <option value="sales">Sales Pitch</option>
            <option value="partnership">Partnership Proposal</option>
            <option value="influencer">Influencer Collaboration</option>
            <option value="recruitment">Recruitment</option>
            <option value="networking">Networking</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Your Value Proposition"
            placeholder="What value are you offering?"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Personalization Level
            </label>
            <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400">
              <option value="high">High (Research-Based)</option>
              <option value="medium">Medium</option>
              <option value="low">Low (Generic)</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleReset}
            leftIcon={<RotateCcw size={16} />}
          >
            Reset
          </Button>

          <Button
            variant="primary"
            onClick={generateContent}
            isLoading={isGenerating}
            leftIcon={<Wand2 size={16} />}
          >
            Generate Outreach
          </Button>
        </div>
      </div>
    ),
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Writer</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Generate high-quality content for any purpose
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Settings and editor panel */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <Tabs
                tabs={[
                  {
                    id: "blog",
                    label: "Blog",
                    icon: <Newspaper size={16} />,
                    content: tabContent.blog,
                  },
                  {
                    id: "seo",
                    label: "SEO",
                    icon: <Search size={16} />,
                    content: tabContent.seo,
                  },
                  {
                    id: "email",
                    label: "Email",
                    icon: <Mail size={16} />,
                    content: tabContent.email,
                  },
                  {
                    id: "outreach",
                    label: "Outreach",
                    icon: <MessageSquare size={16} />,
                    content: tabContent.outreach,
                  },
                ]}
                variant="pills"
              />
            </CardContent>
          </Card>
        </div>

        {/* Output panel */}
        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Generated Content</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Copy size={14} />}
                    onClick={handleCopy}
                    disabled={!generatedContent}
                  >
                    Copy
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<SaveIcon size={14} />}
                    onClick={handleSave}
                    disabled={!generatedContent}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<DownloadIcon size={14} />}
                    onClick={handleDownload}
                    disabled={!generatedContent}
                  >
                    Download
                  </Button>
                </div>
              </div>

              {isGenerating ? (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400 mb-4"></div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Generating your content...
                    </p>
                  </div>
                </div>
              ) : generatedContent ? (
                <div className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 rounded-lg p-4 whitespace-pre-wrap">
                  {generatedContent}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="text-center p-6">
                    <div className="mb-4">
                      <Wand2 className="mx-auto h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      No content generated yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Fill out the form and click "Generate Content" to create
                      your content using AI
                    </p>
                  </div>
                </div>
              )}

              {generatedContent && (
                <div className="mt-4 relative">
                  <input
                    type="text"
                    placeholder="Ask a follow-up question or provide feedback..."
                    className="w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <Send size={16} />
                  </button>
                </div>
              )}

              {savedDrafts.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                    Saved Drafts
                  </h4>
                  <ul className="space-y-3 max-h-60 overflow-auto border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
                    {savedDrafts.map((draft) => (
                      <li
                        key={draft.id}
                        className="p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
                      >
                        <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">
                          {draft.title}
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            ({new Date(draft.createdAt).toLocaleString()})
                          </span>
                        </p>
                        <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 line-clamp-4">
                          {draft.content}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
                
                
              )}
              {history.length > 0 && (
  <div className="mt-8">
    <h4 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Content History</h4>
    <ul className="space-y-3 max-h-64 overflow-auto border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900">
      {history.map((item) => (
        <li
          key={item.id}
          className="p-4 rounded-md shadow-sm border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
        >
          <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">
            {item.title}
            <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
              ({new Date(item.created_at).toLocaleString()})
            </span>
          </p>
          <p className="text-sm mt-2 text-gray-700 dark:text-gray-300 line-clamp-3">
            {item.content}
          </p>
        </li>
      ))}
    </ul>
  </div>
)}

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AiWriter;
