import {
  AdjustmentsHorizontalIcon,
  CameraIcon,
  PhotoIcon,
  SparklesIcon,
  VideoCameraIcon,
  WindowIcon,
} from "@heroicons/react/24/solid";
import { CropIcon } from "@radix-ui/react-icons";
import { FaCrop, FaEraser, FaPaintBrush, FaTools } from "react-icons/fa";
import { GiResize } from "react-icons/gi";

export const navLinks = [
  // {
  //   label: "Home",
  //   route: "/",
  //   icon: "/assets/icons/home.svg",
  //   isMegaMenu: false
  // },
  {
    label: "Image Tools",
    route: "/ai-image",
    icon: "/assets/icons/home.svg",
    isMegaMenu: true,
    description:
      "AI-powered image tools to restore, enhance, and manipulate images with ease.",
    longDescription:
      "The AI Image tools offer a powerful suite of features for restoring old or damaged photos, filling missing parts using AI-generated content, removing or recoloring objects, and seamlessly removing backgrounds. These advanced functionalities make image editing more intuitive and accessible, allowing users to transform images quickly and effortlessly.",
    subItems: [
      {
        title: "Image Restore",
        route: "/transformations/add/restore",
        icon: PhotoIcon,
        description:
          "Restore old or damaged images using AI algorithms for clarity and detail.",
        longDescription:
          "Image Restore helps users bring life back to damaged, old, or low-quality images by enhancing clarity and fixing defects through advanced AI techniques. The tool intelligently removes scratches, blemishes, and other imperfections while preserving the original essence of the image.",
        mediumDescription:
          "Using cutting-edge AI, this tool restores faded or damaged photos, improving visual clarity by fixing blemishes, scratches, and overall image quality.",
        shortDescription:
          "AI-based image restoration to fix old or damaged photos.",
        color: "green",
      },
      {
        title: "Generative Fill",
        route: "/transformations/add/fill",
        icon: SparklesIcon,
        description:
          "Fill missing parts with AI-generated content for a seamless look.",
        longDescription:
          "Generative Fill allows users to repair or enhance images by filling missing or incomplete sections with AI-generated content. This powerful tool blends new content with existing visuals, maintaining the natural look of the image without any visible patches or inconsistencies.",
        mediumDescription:
          "Effortlessly fill in missing parts of an image using AI-generated content that blends perfectly with the existing elements, providing a smooth, natural look.",
        shortDescription: "AI-powered tool to fill missing areas in an image.",
        color: "red",
      },
      {
        title: "Object Remove",
        route: "/transformations/add/remove",
        icon: WindowIcon,
        description: "Remove unwanted objects from images easily and cleanly.",
        longDescription:
          "Object Remove enables users to select and eliminate unwanted objects from images with precision. This tool uses AI to reconstruct the background and ensures the removal looks natural, leaving no trace of the removed object.",
        mediumDescription:
          "Easily remove distracting or unwanted objects from photos. AI fills in the removed area, keeping the background and overall image smooth.",
        shortDescription: "Easily remove unwanted objects from any image.",
        color: "purple",
      },
      {
        title: "Object Recolor",
        route: "/transformations/add/recolor",
        icon: AdjustmentsHorizontalIcon,
        description: "Change the colors of objects in images with AI.",
        longDescription:
          "Object Recolor offers users the ability to modify the colors of specific objects within an image while maintaining realistic shading and gradients. Perfect for creative edits or design enhancements, this tool uses AI to ensure color transitions are smooth and natural.",
        mediumDescription:
          "Change the color of objects in any image seamlessly. The AI ensures smooth transitions and shading, perfect for creative projects or design updates.",
        shortDescription: "AI-driven recoloring of objects within an image.",
        color: "brown",
      },
      {
        title: "Background Removal",
        route: "/transformations/add/removeBackground",
        icon: CameraIcon,
        description:
          "Effortlessly remove image backgrounds with a single click.",
        longDescription:
          "Background Remove leverages AI to separate the foreground subject from the background, offering a clean removal for any type of image. This tool is ideal for product photography, social media, or any scenario requiring quick background edits.",
        mediumDescription:
          "Quickly remove image backgrounds with one click. This AI-powered tool keeps the foreground intact and cleanly separates it from the background.",
        shortDescription: "AI-powered background removal for images.",
        color: "deep-orange",
      },
    ],
  },
  {
    label: "Free Tools",
    route: "/tools",
    icon: FaTools,
    isMegaMenu: true,
    description:
      "AI-driven video tools to edit and enhance videos with precision.",
    longDescription:
      "AI Video tools provide users with the ability to edit, transform, and enhance video content through AI technologies. Whether it’s object removal, background replacement, or color correction, these tools simplify video editing, making it accessible to everyone.",
    subItems: [
      {
        title: "Crop Image",
        route: "/tools/crop-image",
        icon: FaCrop,
        description:
          "Restore old or damaged images using AI algorithms for clarity and detail.",
        longDescription:
          "Image Restore helps users bring life back to damaged, old, or low-quality images by enhancing clarity and fixing defects through advanced AI techniques. The tool intelligently removes scratches, blemishes, and other imperfections while preserving the original essence of the image.",
        mediumDescription:
          "Using cutting-edge AI, this tool restores faded or damaged photos, improving visual clarity by fixing blemishes, scratches, and overall image quality.",
        shortDescription:
          "AI-based image restoration to fix old or damaged photos.",
        color: "pink",
      },
      {
        title: "Resize Image",
        route: "/tools/resize-image",
        icon: GiResize,
        description:
          "Restore old or damaged images using AI algorithms for clarity and detail.",
        longDescription:
          "Image Restore helps users bring life back to damaged, old, or low-quality images by enhancing clarity and fixing defects through advanced AI techniques. The tool intelligently removes scratches, blemishes, and other imperfections while preserving the original essence of the image.",
        mediumDescription:
          "Using cutting-edge AI, this tool restores faded or damaged photos, improving visual clarity by fixing blemishes, scratches, and overall image quality.",
        shortDescription:
          "AI-based image restoration to fix old or damaged photos.",
        color: "blue",
      },
      {
        title: "Background Removal",
        route: "/tools/background-removal",
        icon: CameraIcon,
        description:
          "Effortlessly remove image backgrounds with a single click.",
        longDescription:
          "Background Remove leverages AI to separate the foreground subject from the background, offering a clean removal for any type of image. This tool is ideal for product photography, social media, or any scenario requiring quick background edits.",
        mediumDescription:
          "Quickly remove image backgrounds with one click. This AI-powered tool keeps the foreground intact and cleanly separates it from the background.",
        shortDescription: "AI-powered background removal for images.",
        color: "deep-orange",
      },
    ],
  },
  // {
  //   label: "Pricing",
  //   route: "/pricing",
  //   icon: "/assets/icons/bag.svg",
  //   isMegaMenu: false,
  // },

  {
    label: "About Us",
    route: "/about-us",
    icon: "/assets/icons/profile.svg",
    isMegaMenu: false,
  },
];

export const aiPoweredTools = [
  {
    title: "Image Restore",
    route: "/transformations/add/restore",
    icon: PhotoIcon,
    description:
      "Restore old or damaged images using AI algorithms for clarity and detail.",
    longDescription:
      "Image Restore helps users bring life back to damaged, old, or low-quality images by enhancing clarity and fixing defects through advanced AI techniques. The tool intelligently removes scratches, blemishes, and other imperfections while preserving the original essence of the image.",
    mediumDescription:
      "Using cutting-edge AI, this tool restores faded or damaged photos, improving visual clarity by fixing blemishes, scratches, and overall image quality.",
    shortDescription:
      "AI-based image restoration to fix old or damaged photos.",
    color: "green",
  },
  {
    title: "Generative Fill",
    route: "/transformations/add/fill",
    icon: SparklesIcon,
    description:
      "Fill missing parts with AI-generated content for a seamless look.",
    longDescription:
      "Generative Fill allows users to repair or enhance images by filling missing or incomplete sections with AI-generated content. This powerful tool blends new content with existing visuals, maintaining the natural look of the image without any visible patches or inconsistencies.",
    mediumDescription:
      "Effortlessly fill in missing parts of an image using AI-generated content that blends perfectly with the existing elements, providing a smooth, natural look.",
    shortDescription: "AI-powered tool to fill missing areas in an image.",
    color: "red",
  },
  {
    title: "Object Remove",
    route: "/transformations/add/remove",
    icon: WindowIcon,
    description: "Remove unwanted objects from images easily and cleanly.",
    longDescription:
      "Object Remove enables users to select and eliminate unwanted objects from images with precision. This tool uses AI to reconstruct the background and ensures the removal looks natural, leaving no trace of the removed object.",
    mediumDescription:
      "Easily remove distracting or unwanted objects from photos. AI fills in the removed area, keeping the background and overall image smooth.",
    shortDescription: "Easily remove unwanted objects from any image.",
    color: "purple",
  },
  {
    title: "Object Recolor",
    route: "/transformations/add/recolor",
    icon: FaPaintBrush,
    description: "Change the colors of objects in images with AI.",
    longDescription:
      "Object Recolor offers users the ability to modify the colors of specific objects within an image while maintaining realistic shading and gradients. Perfect for creative edits or design enhancements, this tool uses AI to ensure color transitions are smooth and natural.",
    mediumDescription:
      "Change the color of objects in any image seamlessly. The AI ensures smooth transitions and shading, perfect for creative projects or design updates.",
    shortDescription: "AI-driven recoloring of objects within an image.",
    color: "brown",
  },
  {
    title: "Background Removal",
    route: "/transformations/add/removeBackground",
    icon: FaEraser,
    description: "Effortlessly remove image backgrounds with a single click.",
    longDescription:
      "Background Remove leverages AI to separate the foreground subject from the background, offering a clean removal for any type of image. This tool is ideal for product photography, social media, or any scenario requiring quick background edits.",
    mediumDescription:
      "Quickly remove image backgrounds with one click. This AI-powered tool keeps the foreground intact and cleanly separates it from the background.",
    shortDescription: "AI-powered background removal for images.",
    color: "deep-orange",
  },
  {
    title: "Crop Image",
    route: "/tools/crop-image",
    icon: FaCrop,
    description: "Easily crop images to your desired dimensions.",
    longDescription:
      "The Crop Image tool allows you to trim your images to specific dimensions or focus on particular areas. Whether you're preparing images for social media, presentations, or personal use, this tool gives you precise control over the section of the image you want to keep.",
    mediumDescription:
      "Trim your images to the exact dimensions you need. Perfect for removing unwanted sections or focusing on specific areas of an image.",
    shortDescription: "Crop images to your desired size.",
    color: "pink",
  },
  {
    title: "Resize Image",
    route: "/tools/resize-image",
    icon: GiResize,
    description: "Resize images while maintaining quality and aspect ratio.",
    longDescription:
      "The Resize Image tool allows you to adjust the dimensions of an image while maintaining its quality. Ideal for resizing photos for different purposes like web, print, or social media, this tool ensures that your images retain their clarity and aspect ratio no matter the size you need.",
    mediumDescription:
      "Adjust image dimensions while keeping the original quality intact. Great for resizing images for different platforms and uses.",
    shortDescription: "Resize images without losing quality.",
    color: "blue",
  },
];

export const plans = [
  {
    _id: 1,
    name: "Free",
    icon: "/assets/icons/free-plan.svg",
    price: 0,
    credits: 15,
    isAvailable: true,
    inclusions: [
      {
        label: "15 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: false,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Pro Package",
    icon: "/assets/icons/free-plan.svg",
    price: 40,
    credits: 120,
    isAvailable: false,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    icon: "/assets/icons/free-plan.svg",
    price: 199,
    credits: 2000,
    isAvailable: false,
    inclusions: [
      {
        label: "2000 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
  },
];

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: "image.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
    icon: "camera.svg",
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "filter.svg",
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const unitsOption = {
  px: {
    label: "Pixel",
  },
  in: {
    label: "Inch",
  },
  "%": {
    label: "Percentage",
  },
  cm: {
    label: "Centimeter",
  },
  mm: {
    label: "Millimeter",
  },
};

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

export const creditFee = -1;

export const teamMembers = [
  {
    name: "Tarun Kashyap",
    role: "Lead Developer",
    image: "/assets/images/user.jpg",
    linkedin: "http://linkedin.com/in/tarun-kashyap-246087202",
    gmail: "mailto:kashyapashish6665@gmail.com",
    github: "https://github.com/Tarunkashyap6665",
  },
];
