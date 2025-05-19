import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "../../context/ToastContext";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Tabs from "../../components/ui/Tabs";
import Modal from "../../components/ui/Modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { HexColorPicker } from "react-colorful";
import {
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Hash,
  SlidersHorizontal,
  Calendar,
  Image as ImageIcon,
  Plus,
  Trash2,
  Wand2,
  SaveIcon,
  Copy,
  Upload,
  Pencil,
  MoveVertical,
  X,
} from "lucide-react";

// Helper function to generate a unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

const SocialTools = () => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState("captions");

  // Caption Generator state
  const [captionPrompt, setCaptionPrompt] = useState("");
  const [captionPlatform, setCaptionPlatform] = useState("instagram");
  const [captionTone, setCaptionTone] = useState("casual");
  const [captionLength, setCaptionLength] = useState("medium");
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);

  // Hashtag Generator state
  const [hashtagTopic, setHashtagTopic] = useState("");
  const [hashtagCount, setHashtagCount] = useState(15);
  const [hashtagPopularity, setHashtagPopularity] = useState("mixed");
  const [generatedHashtags, setGeneratedHashtags] = useState<
    { tag: string; popularity: number }[]
  >([]);
  const [isGeneratingHashtags, setIsGeneratingHashtags] = useState(false);

  // Carousel Builder state
  const [carouselSlides, setCarouselSlides] = useState<
    {
      id: string;
      imageUrl: string | null;
      title: string;
      content: string;
      bgColor: string;
    }[]
  >([
    {
      id: generateId(),
      imageUrl:
        "https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Welcome to our new product line",
      content: "Discover the future of innovation with our latest collection.",
      bgColor: "#6d28d9",
    },
    {
      id: generateId(),
      imageUrl:
        "https://images.pexels.com/photos/5082580/pexels-photo-5082580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      title: "Features that stand out",
      content: "Our products are designed with your needs in mind.",
      bgColor: "#8b5cf6",
    },
  ]);
  const [editingSlide, setEditingSlide] = useState<string | null>(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [tempColor, setTempColor] = useState("#6d28d9");

  // Content Calendar state
  const [calendarEvents, setCalendarEvents] = useState<
    {
      id: string;
      title: string;
      date: string;
      platform: string;
      status: "draft" | "scheduled" | "published";
    }[]
  >([
    {
      id: generateId(),
      title: "New Product Launch",
      date: "2025-05-15",
      platform: "instagram",
      status: "scheduled",
    },
    {
      id: generateId(),
      title: "Weekly Tips & Tricks",
      date: "2025-05-18",
      platform: "twitter",
      status: "draft",
    },
    {
      id: generateId(),
      title: "Company Update",
      date: "2025-05-10",
      platform: "linkedin",
      status: "published",
    },
  ]);

  // Modal state
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<{
    id: string;
    imageUrl: string | null;
    title: string;
    content: string;
    bgColor: string;
  } | null>(null);

  // Generate captions
  const handleGenerateCaptions = async () => {
    if (!captionPrompt) {
      showToast("Please enter a prompt for your caption", "warning");
      return;
    }

    setIsGeneratingCaption(true);

    try {
      const res = await fetch("http://localhost:8000/generate/caption", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post: captionPrompt,
          tone: captionTone,
          length: captionLength,
          platform: captionPlatform,
        }),
      });

      const data = await res.json();

      if (res.ok && data.caption) {
        setGeneratedCaptions([data.caption]);
        showToast("✅ Captions generated successfully!", "success");
      } else {
        setGeneratedCaptions([]);
        showToast("⚠️ Failed to generate caption.", "error");
      }
    } catch (err) {
      console.error("❌ API error:", err);
      showToast("❌ Server error while generating caption.", "error");
    } finally {
      setIsGeneratingCaption(false);
    }
  };

  // Generate hashtags
  const handleGenerateHashtags = async () => {
    if (!hashtagTopic) {
      showToast("Please enter a topic for your hashtags", "warning");
      return;
    }

    setIsGeneratingHashtags(true);

    try {
      const res = await fetch("http://localhost:8000/generate/hashtags", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: hashtagTopic,
          count: hashtagCount,
          popularity: hashtagPopularity,
        }),
      });

      const data = await res.json();

      if (res.ok && data.hashtags) {
        setGeneratedHashtags(data.hashtags);
        showToast("✅ Hashtags generated successfully!", "success");
      } else {
        showToast("⚠️ Failed to generate hashtags.", "error");
      }
    } catch (error) {
      console.error("❌ API error:", error);
      showToast("❌ Server error while generating hashtags", "error");
    } finally {
      setIsGeneratingHashtags(false);
    }
  };

  // Copy generated hashtags
  const handleCopyHashtags = () => {
    const hashtagString = generatedHashtags.map((h) => h.tag).join(" ");
    navigator.clipboard.writeText(hashtagString);
    showToast("Hashtags copied to clipboard!", "success");
  };

  // Copy a caption
  const handleCopyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
    showToast("Caption copied to clipboard!", "success");
  };

  // Add a new slide to the carousel
  const handleAddSlide = () => {
    const newSlide = {
      id: generateId(),
      imageUrl: null,
      title: "New Slide",
      content: "Enter your content here",
      bgColor: "#6d28d9",
    };

    setCarouselSlides([...carouselSlides, newSlide]);
    setCurrentSlide(newSlide);
    setIsSlideModalOpen(true);
  };

  // Delete a slide from the carousel
  const handleDeleteSlide = (id: string) => {
    setCarouselSlides(carouselSlides.filter((slide) => slide.id !== id));
    showToast("Slide deleted successfully", "success");
  };

  // Edit a slide
  const handleEditSlide = (slide: (typeof carouselSlides)[0]) => {
    setCurrentSlide(slide);
    setTempColor(slide.bgColor);
    setIsSlideModalOpen(true);
  };

  // Save slide changes
  const handleSaveSlide = () => {
    if (!currentSlide) return;

    setCarouselSlides(
      carouselSlides.map((slide) =>
        slide.id === currentSlide.id ? currentSlide : slide
      )
    );

    setIsSlideModalOpen(false);
    showToast("Slide updated successfully", "success");
  };

  // Handle drag and drop for carousel slides
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(carouselSlides);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCarouselSlides(items);
  };

  // Save all carousel slides
  const handleSaveCarousel = () => {
    showToast("Carousel saved successfully!", "success");
  };

  // Generate content for calendar
  const handleCalendarAction = (
    action: string,
    event?: (typeof calendarEvents)[0]
  ) => {
    if (action === "add") {
      showToast("New post added to calendar", "success");
    } else if (action === "delete" && event) {
      setCalendarEvents(calendarEvents.filter((e) => e.id !== event.id));
      showToast("Post removed from calendar", "success");
    } else if (action === "publish" && event) {
      setCalendarEvents(
        calendarEvents.map((e) =>
          e.id === event.id ? { ...e, status: "published" as const } : e
        )
      );
      showToast("Post published successfully", "success");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Social Tools</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Create and manage your social media content
        </p>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          {
            id: "captions",
            label: "Caption Generator",
            icon: <Instagram size={16} />,
            content: (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Caption Generator Form */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Generate Captions</CardTitle>
                    <CardDescription>
                      Create engaging captions for your social media posts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      label="What's your post about?"
                      placeholder="E.g., New product launch, behind the scenes, etc."
                      value={captionPrompt}
                      onChange={(e) => setCaptionPrompt(e.target.value)}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Platform
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[
                          {
                            id: "instagram",
                            icon: <Instagram size={16} />,
                            label: "Instagram",
                          },
                          {
                            id: "twitter",
                            icon: <Twitter size={16} />,
                            label: "Twitter",
                          },
                          {
                            id: "linkedin",
                            icon: <Linkedin size={16} />,
                            label: "LinkedIn",
                          },
                          {
                            id: "facebook",
                            icon: <Facebook size={16} />,
                            label: "Facebook",
                          },
                        ].map((platform) => (
                          <button
                            key={platform.id}
                            type="button"
                            onClick={() => setCaptionPlatform(platform.id)}
                            className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs
                              ${
                                captionPlatform === platform.id
                                  ? "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-800"
                                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                              }
                            `}
                          >
                            {platform.icon}
                            <span className="mt-1">{platform.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Tone
                      </label>
                      <select
                        value={captionTone}
                        onChange={(e) => setCaptionTone(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400"
                      >
                        <option value="casual">Casual</option>
                        <option value="professional">Professional</option>
                        <option value="friendly">Friendly</option>
                        <option value="enthusiastic">Enthusiastic</option>
                        <option value="humorous">Humorous</option>
                        <option value="informative">Informative</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Length
                      </label>
                      <select
                        value={captionLength}
                        onChange={(e) => setCaptionLength(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400"
                      >
                        <option value="short">Short</option>
                        <option value="medium">Medium</option>
                        <option value="long">Long</option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="primary"
                      onClick={handleGenerateCaptions}
                      isLoading={isGeneratingCaption}
                      fullWidth
                      leftIcon={<Wand2 size={16} />}
                    >
                      Generate Captions
                    </Button>
                  </CardFooter>
                </Card>

                {/* Generated Captions */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Generated Captions</CardTitle>
                    <CardDescription>
                      Choose the caption that best fits your content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isGeneratingCaption ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400 mb-4"></div>
                          <p className="text-gray-600 dark:text-gray-400">
                            Generating your captions...
                          </p>
                        </div>
                      </div>
                    ) : generatedCaptions.length > 0 ? (
                      <div className="space-y-4">
                        {generatedCaptions.map((caption, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex">
                                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400 mr-2">
                                  {index + 1}
                                </div>
                                <div className="pt-1 flex-1">
                                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                                    Option {index + 1}
                                  </span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                leftIcon={<Copy size={14} />}
                                onClick={() => handleCopyCaption(caption)}
                              >
                                Copy
                              </Button>
                            </div>
                            <div className="mt-3 space-y-2 text-sm text-gray-800 dark:text-gray-200">
                              {Array.isArray(caption)
                                ? caption.map((line, i) => (
                                    <div
                                      key={i}
                                      className="flex items-start space-x-2"
                                    >
                                      <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center text-xs font-bold">
                                        {i + 1}
                                      </div>
                                      <span>{line}</span>
                                    </div>
                                  ))
                                : typeof caption === "string" && (
                                    <div className="text-sm text-gray-700 dark:text-gray-300">
                                      {caption}
                                    </div>
                                  )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Instagram className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                          No captions generated yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                          Fill out the form and click "Generate Captions" to
                          create engaging captions for your social media posts
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ),
          },
          {
            id: "hashtags",
            label: "Hashtag Creator",
            icon: <Hash size={16} />,
            content: (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Hashtag Generator Form */}
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Generate Hashtags</CardTitle>
                    <CardDescription>
                      Find relevant hashtags for your social media posts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      label="Topic or Keyword"
                      placeholder="E.g., fashion, marketing, fitness, etc."
                      value={hashtagTopic}
                      onChange={(e) => setHashtagTopic(e.target.value)}
                    />

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Number of Hashtags
                      </label>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="5"
                          max="30"
                          value={hashtagCount}
                          onChange={(e) =>
                            setHashtagCount(Number(e.target.value))
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400 min-w-[2rem] text-center">
                          {hashtagCount}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Popularity
                      </label>
                      <select
                        value={hashtagPopularity}
                        onChange={(e) => setHashtagPopularity(e.target.value)}
                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400"
                      >
                        <option value="top">Top hashtags only</option>
                        <option value="mixed">Mix of popular and niche</option>
                        <option value="niche">
                          Niche hashtags (less competition)
                        </option>
                      </select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="primary"
                      onClick={handleGenerateHashtags}
                      isLoading={isGeneratingHashtags}
                      fullWidth
                      leftIcon={<Wand2 size={16} />}
                    >
                      Generate Hashtags
                    </Button>
                  </CardFooter>
                </Card>

                {/* Generated Hashtags */}
                <Card className="lg:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Generated Hashtags</CardTitle>
                      <CardDescription>
                        Click to copy individual hashtags or copy all
                      </CardDescription>
                    </div>
                    {generatedHashtags.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Copy size={14} />}
                        onClick={handleCopyHashtags}
                      >
                        Copy All
                      </Button>
                    )}
                  </CardHeader>
                  <CardContent>
                    {isGeneratingHashtags ? (
                      <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400 mb-4"></div>
                          <p className="text-gray-600 dark:text-gray-400">
                            Generating your hashtags...
                          </p>
                        </div>
                      </div>
                    ) : generatedHashtags.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        
                        {generatedHashtags.length > 0 && (
  <div className="flex flex-wrap gap-2">
    {generatedHashtags[0].tag
      .split(",") // split comma-separated string
      .map((tag, index) => {
        const cleanedTag = tag.trim(); // remove spaces
        return (
          <span
            key={index}
            onClick={() => {
              navigator.clipboard.writeText(cleanedTag);
              showToast(`Copied: ${cleanedTag}`, "success");
            }}
            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-3 py-1.5 m-1 rounded-full cursor-pointer text-sm font-medium"
          >
            {cleanedTag}
          </span>
        );
      })}
  </div>
)}

                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Hash className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                          No hashtags generated yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                          Fill out the form and click "Generate Hashtags" to
                          discover trending and relevant hashtags
                        </p>
                      </div>
                    )}
                  </CardContent>
                  {generatedHashtags.length > 0 && (
                    <CardFooter className="border-t dark:border-gray-700 px-6 py-4">
                      <div className="w-full">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                          Popularity Guide:
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400">
                            80-100: Very High
                          </span>
                          <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                            60-79: High
                          </span>
                          <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400">
                            40-59: Medium
                          </span>
                          <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                            0-39: Low
                          </span>
                        </div>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              </div>
            ),
          },
          {
            id: "carousel",
            label: "Carousel Builder",
            icon: <SlidersHorizontal size={16} />,
            content: (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Carousel Builder</CardTitle>
                      <CardDescription>
                        Create engaging slide carousels for Instagram and
                        LinkedIn
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        leftIcon={<Plus size={14} />}
                        onClick={handleAddSlide}
                      >
                        Add Slide
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<SaveIcon size={14} />}
                        onClick={handleSaveCarousel}
                      >
                        Save Carousel
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {carouselSlides.length > 0 ? (
                      <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable
                          droppableId="carousel-slides"
                          direction="horizontal"
                        >
                          {(provided) => (
                            <div
                              className="flex overflow-x-auto pb-4 gap-4"
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {carouselSlides.map((slide, index) => (
                                <Draggable
                                  key={slide.id}
                                  draggableId={slide.id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      className="flex-shrink-0 w-64 rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700"
                                    >
                                      <div
                                        className="h-40 relative"
                                        style={{
                                          backgroundColor: slide.bgColor,
                                        }}
                                      >
                                        {slide.imageUrl && (
                                          <img
                                            src={slide.imageUrl}
                                            alt={slide.title}
                                            className="w-full h-full object-cover opacity-80"
                                          />
                                        )}
                                        <div className="absolute inset-0 p-4 flex flex-col justify-end">
                                          <h3 className="text-white font-bold text-lg leading-tight">
                                            {slide.title}
                                          </h3>
                                        </div>
                                        <div className="absolute top-2 right-2 flex space-x-1">
                                          <button
                                            onClick={() =>
                                              handleEditSlide(slide)
                                            }
                                            className="p-1 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm"
                                          >
                                            <Pencil size={14} />
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleDeleteSlide(slide.id)
                                            }
                                            className="p-1 rounded-full bg-white/80 hover:bg-white text-rose-600 shadow-sm"
                                          >
                                            <Trash2 size={14} />
                                          </button>
                                          <div
                                            {...provided.dragHandleProps}
                                            className="p-1 rounded-full bg-white/80 hover:bg-white text-gray-700 shadow-sm cursor-grab"
                                          >
                                            <MoveVertical size={14} />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="p-3 bg-white dark:bg-gray-800">
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                          {slide.content}
                                        </p>
                                      </div>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <SlidersHorizontal className="h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" />
                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                          No slides yet
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
                          Create your first slide to get started with your
                          carousel
                        </p>
                        <Button
                          variant="primary"
                          onClick={handleAddSlide}
                          leftIcon={<Plus size={16} />}
                        >
                          Add First Slide
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ),
          },
          {
            id: "calendar",
            label: "Content Calendar",
            icon: <Calendar size={16} />,
            content: (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Content Calendar</CardTitle>
                      <CardDescription>
                        Plan and schedule your social media content
                      </CardDescription>
                    </div>
                    <Button
                      variant="primary"
                      size="sm"
                      leftIcon={<Plus size={14} />}
                      onClick={() => handleCalendarAction("add")}
                    >
                      Add Post
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Title
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Platform
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Status
                            </th>
                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                          {calendarEvents.map((event) => (
                            <motion.tr
                              key={event.id}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="hover:bg-gray-50 dark:hover:bg-gray-750"
                            >
                              <td className="px-4 py-3 whitespace-nowrap text-sm">
                                {new Date(event.date).toLocaleDateString(
                                  "en-US",
                                  {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  }
                                )}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                {event.title}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm">
                                <div className="flex items-center">
                                  {event.platform === "instagram" && (
                                    <Instagram size={16} className="mr-1.5" />
                                  )}
                                  {event.platform === "twitter" && (
                                    <Twitter size={16} className="mr-1.5" />
                                  )}
                                  {event.platform === "linkedin" && (
                                    <Linkedin size={16} className="mr-1.5" />
                                  )}
                                  {event.platform === "facebook" && (
                                    <Facebook size={16} className="mr-1.5" />
                                  )}
                                  {event.platform.charAt(0).toUpperCase() +
                                    event.platform.slice(1)}
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                  ${
                                    event.status === "published"
                                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                      : event.status === "scheduled"
                                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                                  }
                                `}
                                >
                                  {event.status.charAt(0).toUpperCase() +
                                    event.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                                <div className="flex justify-end space-x-2">
                                  {event.status !== "published" && (
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() =>
                                        handleCalendarAction("publish", event)
                                      }
                                    >
                                      Publish
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleCalendarAction("delete", event)
                                    }
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ),
          },
        ]}
        defaultTab="captions"
        variant="pills"
      />

      {/* Slide Edit Modal */}
      <Modal
        isOpen={isSlideModalOpen}
        onClose={() => setIsSlideModalOpen(false)}
        title="Edit Slide"
        size="lg"
      >
        {currentSlide && (
          <div className="p-6 space-y-4">
            <Input
              label="Slide Title"
              value={currentSlide.title}
              onChange={(e) =>
                setCurrentSlide({ ...currentSlide, title: e.target.value })
              }
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slide Content
              </label>
              <textarea
                value={currentSlide.content}
                onChange={(e) =>
                  setCurrentSlide({ ...currentSlide, content: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400 min-h-[100px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Background Color
              </label>
              <div className="flex items-center space-x-2">
                <div
                  className="w-10 h-10 rounded-md cursor-pointer border border-gray-300 dark:border-gray-600"
                  style={{ backgroundColor: currentSlide.bgColor }}
                  onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
                />
                <input
                  type="text"
                  value={currentSlide.bgColor}
                  onChange={(e) =>
                    setCurrentSlide({
                      ...currentSlide,
                      bgColor: e.target.value,
                    })
                  }
                  className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-purple-400 dark:focus:ring-purple-400 w-32"
                />

                {isColorPickerOpen && (
                  <div className="absolute z-10 mt-40">
                    <div
                      className="fixed inset-0"
                      onClick={() => setIsColorPickerOpen(false)}
                    />
                    <div className="relative">
                      <HexColorPicker
                        color={tempColor}
                        onChange={(color) => {
                          setTempColor(color);
                          setCurrentSlide({ ...currentSlide, bgColor: color });
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Background Image (optional)
              </label>
              <div className="flex items-center space-x-2">
                {currentSlide.imageUrl && (
                  <div className="relative w-16 h-16 rounded-md overflow-hidden border border-gray-300 dark:border-gray-600">
                    <img
                      src={currentSlide.imageUrl}
                      alt="Background preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() =>
                        setCurrentSlide({ ...currentSlide, imageUrl: null })
                      }
                      className="absolute top-0 right-0 p-0.5 bg-white dark:bg-gray-800 rounded-bl-md"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
                <label className="cursor-pointer">
                  <span className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 dark:focus:ring-purple-400">
                    <Upload className="mr-2 h-4 w-4" />
                    {currentSlide.imageUrl ? "Change Image" : "Upload Image"}
                  </span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={(e) => {
                      // Mock image upload - in a real app, this would upload to a server
                      // Here we just set a placeholder URL
                      if (e.target.files && e.target.files[0]) {
                        const imageUrl =
                          "https://images.pexels.com/photos/5082580/pexels-photo-5082580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";
                        setCurrentSlide({ ...currentSlide, imageUrl });
                      }
                    }}
                  />
                </label>
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Recommended size: 1080x1080px (square)
              </p>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={() => setIsSlideModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveSlide}>
                Save Changes
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SocialTools;
